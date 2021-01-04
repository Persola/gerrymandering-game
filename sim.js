// configurable
NUM_DISTRICTS = 11;
// VOTERS_PER_DISTRICT = 11;
VOTERS_ROOT = 11;
// fixed
PARTIES = ['dem', 'rep'];
NO_REP = 'no_representative'
VOTE_WITH_PARTY_RATE = 0.9;

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// GLOBALS

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
  for (i = 0; i < VOTERS_ROOT; i++) {
    voters[i] = [];      

    for (j = 0; j < VOTERS_ROOT; j++) {
      const partyAffiliation = Math.random() > 0.5 ? PARTIES[0] : PARTIES[1]
      voters[i][j] = {
        voterId: [i, j],
        partyAffiliation: partyAffiliation,
        districtId: genDistrict(i, j)
      };
    }
  }
};

const genDistrict = (x, y) => {
  if (x < 3) {
    if (y < 4) {
      return 0;
    } else if (y < 8) {
      return 1;
    } else {
      return 2;
    }
  } else if (x < 6) {
    if (y < 4) {
      return 3;
    } else if (y < 8) {
      return 4;
    } else {
      return 5;  
    }
  } else if (x < 9) {
    if (y < 4) {
      return 6;
    } else if (y < 8) {
      return 7;
    } else {
      return 8;  
    }
  } else {
    if (y < 6) {
      return 9;
    } else {
      return 10;  
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
  mapDom.style['grid-template-rows'] = String(VOTERS_ROOT);
  mapDom.style['grid-template-columns'] = String(VOTERS_ROOT);

  for (voterRowData of voterData) {
    for (voterData of voterRowData) {
      mapDom.appendChild(renderVoter(voterData));
    }
  }

  return mapDom;
};

const districtCounts = (voters) => {
  const counts = {};
  for (i = 0; i < VOTERS_ROOT; i++) {
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

  for (let i = 0; i < NUM_DISTRICTS; i++) {
    const districtSelector = document.createElement('div');
    districtSelector.innerHTML = String(districtCounts[i])
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
  voterDOM.classList.add('voter', voterData.partyAffiliation, `district-${voterData.districtId}`);
  voterDOM.setAttribute('data-voter-id', `${voterData.voterId[0]}-${voterData.voterId[1]}`);
  if (voterData.lastVoted === 'dem') {
    voterDOM.classList.add('lastVotedDem');
  } else if (voterData.lastVoted === 'rep') {
    voterDOM.classList.add('lastVotedRep');
  } else {
    voterDOM.classList.add('noLastVote');
  }
  return voterDOM;
};

// RUN SIMULATION EVENTS

const runGeneral = () => {
  const voteCount = {};
  for (i = 0; i < NUM_DISTRICTS; i++) {
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

  for (i = 0; i < NUM_DISTRICTS; i++) {
    if (voteCount[i]['dem'] === voteCount[i]['rep']) {throw 'tie!'};
    if (voteCount[i]['dem'] > voteCount[i]['rep']) {
      representatives[i] = 'dem';
    } else {
      representatives[i] = 'rep';    
    }
  }

  render();
};

// const clearReps = () => {
//   perDistrict((districtData) => {
//     districtData.representative = NO_REP;
//   });
//   render();
// };

// USER ACTIONS

document.body.onclick = function(e) {   //when the document body is clicked
  if (e.target.className && e.target.className.indexOf('voter') != -1) {
    const idMatch = e.target.getAttribute('data-voter-id').match(/(\d+)\-(\d+)/);
    const voterId = [Number(idMatch[1]), Number(idMatch[2])]
    if (typeof selectedDistrictId === 'number') {
      assignVoterToDistrict(voterId, selectedDistrictId);      
    }
  }

  if (e.target.className && e.target.className.indexOf('districtSelector') != -1) {
    selectedDistrictId = Number(e.target.getAttribute('data-district-id'))
  }

  render();
}

const assignVoterToDistrict = (voterId, districtId) => {
  voters[voterId[0]][voterId[1]].districtId = districtId;
};

// KICKOFF

window.onload = (e) => {
  generate();
  render();
};
