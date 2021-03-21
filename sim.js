const DIST_ID_TO_COLOR = {
  0: '00af91',
  1: 'cc7351',
  2: 'fa963d',
  3: 'ffcc29',
  4: '8040b0',
  5: 'd860b0',
  6: 'fa9bd0',
  7: '966060',
  8: '11698e',
  9: '608040',
  10: 'f6c065',
  11: '8b6ea3',
  12: 'eb596e',
  13: '9dad7f',
  14: 'e27802',
  15: '51a2b5',
  16: 'd6b0b1',
  17: 'ec4646',
  18: '007965',
  19: '4d375d',
  20: 'f1aa9b',
  21: '557174',
  22: '96cb7c',
  23: '007981',
  24: 'f8dc81'
};

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// GLOBALS

let percentParty0 = 0.5;
let numDistricts = Number($('#numDist').value);
let rootNumDistricts = numDistricts**(1/2);
let votersPerDistrict = Number($('#votersPerDist').value);
let rootNumVotersPerDistrict = votersPerDistrict**(1/2);
let rootTotalVoters = rootNumDistricts * rootNumVotersPerDistrict;  
const voters = [];
const representatives = {};
let selectedDistrictId = null;
let hoveredDistrictId = null;
let modifierKeyDown = false;
const partyColors = {};
partyColors[0] = $('#party0color').value;
partyColors[1] = $('#party1color').value;

voters.perVoter = (lambda) => {
  for (voterRow of voters) {
    for (voter of voterRow) {
      lambda(voter);
    }
  }
};

// INITIALIZATION/RESET FROM CONFIG

const generate = () => {
  percentParty0 = Number($('#percentParty0').value);
  numDistricts = Number($('#numDist').value);
  votersPerDistrict = Number($('#votersPerDist').value);

  rootNumDistricts = numDistricts**(1/2);
  rootNumVotersPerDistrict = votersPerDistrict**(1/2);
  rootTotalVoters = rootNumDistricts * rootNumVotersPerDistrict;
  if (numDistricts > Object.keys(DIST_ID_TO_COLOR).length) {
    throw('I need more colors (add to DIST_ID_TO_COLOR)');
  }

  if (percentParty0 === undefined) {
    percentParty0 = 0.5;
  }
  
  generateVoters();
  applyDynamicStyles();
  render();
};

const generateVoters = () => {
  let totalVoters = rootTotalVoters**2;
  let numParty0Voters = Math.floor(totalVoters * percentParty0);
  let numParty1Voters = totalVoters - numParty0Voters;
  let voterAffiliations = [];
  for (let party0Ind = 0; party0Ind < numParty0Voters; party0Ind++) {
    voterAffiliations.push(0);
  }
  for (let party1Ind = 0; party1Ind < numParty1Voters; party1Ind++) {
    voterAffiliations.push(1);
  }
  voterAffiliations = shuffle(voterAffiliations);

  voters.length = 0;
  for (let mapYCoord = 0; mapYCoord < rootTotalVoters; mapYCoord++) {
    voters[mapYCoord] = [];

    for (let mapXCoord = 0; mapXCoord < rootTotalVoters; mapXCoord++) {
      voters[mapYCoord][mapXCoord] = {
        voterId: [mapYCoord, mapXCoord],
        partyAffiliation: voterAffiliations.pop(),
        districtId: assignDistrictId(mapYCoord, mapXCoord)
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
        (x >= rootNumVotersPerDistrict * xDistCoord) &&
        (x < rootNumVotersPerDistrict * (xDistCoord + 1)) &&
        (y >= rootNumVotersPerDistrict * yDistCoord) &&
        (y < rootNumVotersPerDistrict * (yDistCoord + 1))
      ) {
        return (xDistCoord * rootNumDistricts) + yDistCoord;
      }
    }
  }
  TypeError('voter coords have no corresponding district!?');
};

// RENDER

const render = () => {
  $('#sim').innerHTML = '';
  $('#sim').appendChild(renderMap(voters));
};

const renderMap = (voterData) => {
  const mapDom = document.createElement('div');
  mapDom.id = 'map';
  mapDom.style['grid-template-rows'] = '60px '.repeat(rootTotalVoters);
  mapDom.style['grid-template-columns'] = '60px '.repeat(rootTotalVoters);

  for (voterRowData of voterData) {
    for (voterData of voterRowData) {
      mapDom.appendChild(renderVoter(voterData));
    }
  }

  return mapDom;
};

const districtCounts = (voters) => {
  const counts = {};
  for (let distId = 0; distId < numDistricts; distId++) {
    counts[distId] = {};
    counts[distId][0] = 0;
    counts[distId][1] = 0;
  }
  voters.perVoter((voter) => {
    counts[voter.districtId][voter.partyAffiliation] += 1;
  });

  return counts;
};

const renderVoter = (voterData) => {
  const voterDOM = document.createElement('div');
  voterDOM.classList.add('voter', `district-${voterData.districtId}`);
  voterDOM.setAttribute('data-voter-id', `${voterData.voterId[0]}-${voterData.voterId[1]}`);
  voterDOM.setAttribute('data-district-id', voterData.districtId);
  const voterAffilEl = document.createElement('div');
  voterAffilEl.classList.add('voterAffiliation', `party${voterData.partyAffiliation}`);
  voterDOM.appendChild(voterAffilEl);
  return voterDOM;
};

const districtPopUp = (distId) => {
  const districtCount = districtCounts(voters)[distId];
  const isTie = districtCount[0] === districtCount[1];
  const party0Wins = districtCount[0] > districtCount[1];
  const party1Wins = districtCount[0] < districtCount[1];
  const distPopUpEl = document.createElement('div');
  distPopUpEl.classList.add('districtPopUp');
  distPopUpEl.innerHTML = `
    <div class="districtTitle district-${distId}">district</div>
    ${partyCount(0, districtCount[0], party0Wins, isTie)}
    ${partyCount(1, districtCount[1], party1Wins, isTie)}
  `;
  return distPopUpEl;
};

const partyCount = (partyInd, count, win, tie) => {
  let declaration;
  if (tie) {
    declaration = 'tie!';
  } else if (win) {
    declaration = 'winner';
  } else { // loses
    declaration = '';
  }
  const declarationColor = tie ? '#bb9' : partyColors[partyInd];
  return `
    <div class="partyCount">
      <div class="partyColorDot" style="background-color: ${partyColors[partyInd]}"></div>
      <div class="countBox">${count}</div>
      <div class="declaration" style="color: ${declarationColor}">${declaration}</div>
    </div>
  `;
};

// USER ACTIONS

$('#title').onchange = (e) => {
  if (! /\S/.test($('#title').value)) {
    $('#title').value = 'GERRYMANDERING';
  }
};

document.addEventListener('keydown', (e) => {
  if (['AltLeft', 'AltRight'].includes(e.code)) {
    console.log('modifierKeyDown true');
    modifierKeyDown = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (['AltLeft', 'AltRight'].includes(e.code)) {
    console.log('modifierKeyDown false');
    modifierKeyDown = false;
  }
});

document.body.onpointermove = (e) => {
  if (targetHasClass(/voterAffiliation/, e)) {
    updateDistrictPopUp(e.target.parentNode);
  } else if (targetHasClass(/voter\W/, e)) { // hovering a voter = hovering the district
    updateDistrictPopUp(e.target);
  } else {
    if (hoveredDistrictId !== null) {
      removeAllDistrictPopUps();
    }
  }
};

const updateDistrictPopUp = (voter) => {
  const thisMoveHoveredDistrictId = Number(voter.className.match(/district\-(\d+)/)[1]);
  if (hoveredDistrictId !== thisMoveHoveredDistrictId) {
    removeAllDistrictPopUps();
    voter.appendChild(districtPopUp(thisMoveHoveredDistrictId));
    hoveredDistrictId = thisMoveHoveredDistrictId;
  }
};

const removeAllDistrictPopUps = () => {
  for (dpu of $$('.districtPopUp')) {
    dpu.remove();
  }
  hoveredDistrictId = null;
};

document.body.onclick = (e) => {
  if (targetHasClass('voterAffiliation', e)) {
    onVoterClick(e.target.parentElement);
  } else if (targetHasClass('voter', e)) {
    onVoterClick(e.target);
  } else {
    selectedDistrictId = null;
    setCursor(null);
  }

  render();
}

const targetHasClass = (className, evnt) => {
  return (
    evnt.target.className &&
    evnt.target.className.match(className) !== null
  )
};

const onVoterClick = (voter) => {
  if (modifierKeyDown) { // select paint color (district)
    selectedDistrictId = Number(voter.getAttribute('data-district-id'))
    setCursor(DIST_ID_TO_COLOR[selectedDistrictId]);
  } else { // paint
    const idMatch = voter.getAttribute('data-voter-id').match(/(\d+)\-(\d+)/);
    const voterId = [Number(idMatch[1]), Number(idMatch[2])]
    if (typeof selectedDistrictId === 'number') {
      assignVoterToDistrict(voterId, selectedDistrictId);      
    }
  }
};

const assignVoterToDistrict = (voterId, districtId) => {
  voters[voterId[0]][voterId[1]].districtId = districtId;
};

const updatePartyColors = (e) => {
  partyColors[0] = $('#party0color').value;
  partyColors[1] = $('#party1color').value;
  applyDynamicStyles();
};

const partyColorPickers = $$('.partyColorPicker');
for (pickerInd in partyColorPickers) {
  partyColorPickers[pickerInd].onchange = updatePartyColors;
}

document.body.onchange = (e) => {
  const sigDigs = 8;
  const factor = 10**sigDigs;
  if (e.target.id === 'percentParty0') {
    $('#percentParty1').value = (
      factor
      - factor * Number($('#percentParty0').value)
    ) / factor;
  } else if (e.target.id === 'percentParty1') {
    $('#percentParty0').value = (
      factor
      - factor * Number($('#percentParty1').value)
    ) / factor;
  }
}
// DYNAMIC STYLING

const dsStyle = (districtId) => {
  return `
    .district-${districtId} { background-color: #${DIST_ID_TO_COLOR[districtId]}; }
  `;
};

const partySplitInputBackgroundStyles = () => {
    return `
      .controlLine>input[class=party0] {
        background-color: ${partyColors[0]}88;
      }

      .controlLine>input[class=party1] {
        background-color: ${partyColors[1]}88;
      }
    `;
};

const applyDynamicStyles = () => {
  const oldStyleEl = $('.dynamicStyleEl');
  let styleText = '';
  for (let distId = 0; distId < numDistricts; distId++) {
    styleText += dsStyle(distId);
  }
  styleText += `\n.party0 { background-color: ${partyColors[0]}; }`;
  styleText += `\n.party1 { background-color: ${partyColors[1]}; }`;
  styleText += partySplitInputBackgroundStyles();
  let newStyleEl = document.createElement('style');
  newStyleEl.classList.add('dynamicStyleEl');
  newStyleEl.innerHTML = styleText;
  oldStyleEl.parentElement.replaceChild(newStyleEl, oldStyleEl);
};

const setCursor = (color) => {
  if (! color) {
    $('body').style.cursor = 'default';
  } else {
    $('body').style.cursor = `url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24'%20width='16'%3E%20%20%3Cpolygon%20points='2,2%2014,17%202,22'%20fill='%23${color}'%20stroke='black'%20stroke-width='1.5'/%3E%3C/svg%3E") 0 0, default`;
  }
};

// KICKOFF

window.onload = (e) => {
  generate();
};
