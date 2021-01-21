const PARTIES = ['dem', 'rep'];
// const NO_REP = 'no_representative'
// const VOTE_WITH_PARTY_RATE = 1.0;
const DIST_ID_TO_COLOR = {
  0: '00af91',
  1: 'cc7351',
  2: 'f58634',
  3: 'ffcc29',
  4: '14019f',
  5: 'af0069',
  6: 'fe9bd8',
  7: 'f6c065',
  8: '11698e',
  9: '708108',
  10: '663f3f',
  11: '8b5e83',
  12: 'eb596e',
  13: '9dad7f',
  14: 'e27802',
  15: 'ec4646',
  16: 'd6b0b1',
  17: '51c2d5',
  18: '007965',
  19: '4d375d',
  20: 'f1aa9b',
  21: '557174',
  22: '96bb7c',
  23: '007981',
  24: 'f8dc81'
};

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// GLOBALS

let percentDem = 0.5;
let rootNumDistricts = 4;
let rootVotersPerDistrict = 3;
let numDistricts = rootNumDistricts**2;
let rootTotalVoters = rootNumDistricts * rootVotersPerDistrict;  
const voters = [];
const representatives = {};
let selectedDistrictId = null;

voters.perVoter = (lambda) => {
  for (voterRow of voters) {
    for (voter of voterRow) {
      lambda(voter);
    }
  }
};

// DATA GENERATION/ALTERATION

const generate = () => {
  percentDem = Number($('#percentDem').value);
  rootNumDistricts = Number($('#rootNumDistConfig').value);
  rootVotersPerDistrict = Number($('#rootVotersPerDist').value);

  // derived constants here because they are configurable
  numDistricts = rootNumDistricts**2;
  rootTotalVoters = rootNumDistricts * rootVotersPerDistrict;
  if (numDistricts > Object.keys(DIST_ID_TO_COLOR).length) {
    throw('I need more colors (add to DIST_ID_TO_COLOR)');
  }

  if (percentDem === undefined) {
    percentDem = 0.5;
  }
  
  generateVoters();
  applyDynamicStyles();
};

const generateVoters = () => {
  let totalVoters = rootTotalVoters**2;
  let numDemVoters = Math.floor(totalVoters * percentDem);
  let numRepVoters = totalVoters - numDemVoters;
  let voterAffiliations = [];
  for (let demInd = 0; demInd < numDemVoters; demInd++) {
    voterAffiliations.push(PARTIES[0]);
  }
  for (let repInd = 0; repInd < numRepVoters; repInd++) {
    voterAffiliations.push(PARTIES[1]);
  }
  voterAffiliations = shuffle(voterAffiliations);

  voters.length = 0;
  for (let i = 0; i < rootTotalVoters; i++) {
    voters[i] = [];

    for (let j = 0; j < rootTotalVoters; j++) {
      voters[i][j] = {
        voterId: [i, j],
        partyAffiliation: voterAffiliations.pop(),
        districtId: assignDistrictId(i, j)
      };
    }
  }
};

// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const assignDistrictId = (x, y) => {
  for (let xDistCoord = 0; xDistCoord < rootNumDistricts; xDistCoord++) {
    for (let yDistCoord = 0; yDistCoord < rootNumDistricts; yDistCoord++) {
      if (
        (x >= rootVotersPerDistrict * xDistCoord) &&
        (x < rootVotersPerDistrict * (xDistCoord + 1)) &&
        (y >= rootVotersPerDistrict * yDistCoord) &&
        (y < rootVotersPerDistrict * (yDistCoord + 1))
      ) {
        return (xDistCoord * rootNumDistricts) + yDistCoord;
      }
    }
  }
};

// RENDER

const render = () => {
  $('#sim').innerHTML = '';
  $('#sim').appendChild(renderMap(voters));
  $('#sim').appendChild(
    renderDistrictSelectorPanel(districtCounts(voters))
  );
};

const renderMap = (voterData) => {
  const mapDom = document.createElement('div');
  mapDom.id = 'map';
  mapDom.style['grid-template-rows'] = '30px '.repeat(rootTotalVoters);
  mapDom.style['grid-template-columns'] = '30px '.repeat(rootTotalVoters);

  for (voterRowData of voterData) {
    for (voterData of voterRowData) {
      mapDom.appendChild(renderVoter(voterData));
    }
  }

  return mapDom;
};

const districtCounts = (voters) => {
  const counts = {};
  for (let i = 0; i < numDistricts; i++) {
    counts[i] = 0;
  }
  voters.perVoter((voter) => {
    counts[voter.districtId] += 1;
  });

  return counts;
};

const renderDistrictSelectorPanel = (districtCounts) => {
  const districtSelectorPanel = document.createElement('div');
  districtSelectorPanel.id = 'districtSelectorPanel';

  for (let i = 0; i < numDistricts; i++) {
    const districtSelector = document.createElement('div');
    districtSelector.innerHTML = String(districtCounts[i]);
    districtSelector.classList.add('districtSelector');
    districtSelector.classList.add(representatives[i]);
    districtSelector.setAttribute('data-district-id', i);
    districtSelectorPanel.appendChild(districtSelector);
  }

  return districtSelectorPanel;
};

// const renderRepresentative = (repData) => {
//   if(PARTIES.indexOf(repData) === -1 && repData !== NO_REP) {
//     throw('bad rep')
//   }
// 
//   const repDOM = document.createElement('div');
//   repDOM.setAttribute('class', 'representative');
//   repDOM.classList.add(repData);
//   return repDOM;
// };

const renderVoter = (voterData) => {
  if(PARTIES.indexOf(voterData.partyAffiliation) === -1) { throw('bad affiliation') }

  const voterDOM = document.createElement('div');
  voterDOM.classList.add('voter', `district-${voterData.districtId}`);
  voterDOM.setAttribute('data-voter-id', `${voterData.voterId[0]}-${voterData.voterId[1]}`);
  const voterAffilEl = document.createElement('div');
  voterAffilEl.classList.add('voterAffiliation', voterData.partyAffiliation);
  voterDOM.appendChild(voterAffilEl);
  // if (voterData.lastVoted === 'dem') {
  //   voterDOM.classList.add('lastVotedDem');
  // } else if (voterData.lastVoted === 'rep') {
  //   voterDOM.classList.add('lastVotedRep');
  // } else {
  //   voterDOM.classList.add('noLastVote');
  // }
  return voterDOM;
};

// RUN SIMULATION EVENTS

const runGeneral = () => {
  const voteCount = {};
  for (let i = 0; i < numDistricts; i++) {
    voteCount[i] = {'dem': 0, 'rep': 0};
  }
  voters.perVoter((voter) => {
    const isDem = voter.partyAffiliation === 'dem';
    const votesWithParty = Math.random() < VOTE_WITH_PARTY_RATE;
    if (isDem === votesWithParty) {
      voteCount[voter.districtId]['dem'] ++;
      voter.lastVoted = 'dem';
    } else {
      voteCount[voter.districtId]['rep'] ++;
      voter.lastVoted = 'rep';
    }
  });

  for (let i = 0; i < numDistricts; i++) {
    if (voteCount[i]['dem'] === voteCount[i]['rep']) {
      $('#sim').innerHTML = 'error; see console';
      throw('tie!');
    };
    if (voteCount[i]['dem'] > voteCount[i]['rep']) {
      representatives[i] = 'dem';
    } else {
      representatives[i] = 'rep';    
    }
  }

  render();
};

const regenerate = () => { generate(); };

// const clearReps = () => {
//   perDistrict((districtData) => {
//     districtData.representative = NO_REP;
//   });
//   render();
// };

// USER ACTIONS

document.body.onclick = function(e) {   //when the document body is clicked
  if (e.target.className && e.target.className.indexOf('voterAffiliation') != -1) {
    onVoterClick(e.target.parentElement);
  } else if (e.target.className && e.target.className.indexOf('voter ') != -1) {
    onVoterClick(e.target);
  }

  if (e.target.className && e.target.className.indexOf('districtSelector') != -1) {
    selectedDistrictId = Number(e.target.getAttribute('data-district-id'))
  }

  render();
}

const onVoterClick = (target) => {
  const idMatch = target.getAttribute('data-voter-id').match(/(\d+)\-(\d+)/);
  const voterId = [Number(idMatch[1]), Number(idMatch[2])]
  if (typeof selectedDistrictId === 'number') {
    assignVoterToDistrict(voterId, selectedDistrictId);      
  }
};

const assignVoterToDistrict = (voterId, districtId) => {
  voters[voterId[0]][voterId[1]].districtId = districtId;
};

// STYLING

const dsStyle = (districtId) => {
  return `
    .districtSelector[data-district-id="${districtId}"] { border: 5px solid #${DIST_ID_TO_COLOR[districtId]}; }
    .district-${districtId} { background-color: #${DIST_ID_TO_COLOR[districtId]}; }
  `
};

const applyDynamicStyles = () => {
  let styleText = '';
  for (let distId = 0; distId < numDistricts; distId++) {
    styleText += dsStyle(distId);
  }
  for (let distId = 0; distId < numDistricts; distId++) {
    styleText += dsStyle(distId);
  }
  let styleEl = document.createElement('style');
  styleEl.innerHTML = styleText;
  $('script').parentNode.insertBefore(styleEl, $('script'));
};

// KICKOFF

window.onload = (e) => {
  generate();
};
