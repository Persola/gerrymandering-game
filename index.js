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

// INITIALIZE STATE

const mapConfig = {
  percentParty0: 0.5,
  numDistricts: Number($('#numDist').value),
  votersPerDistrict: Number($('#votersPerDist').value)
};

let appState = {
  selectedDistrictId: null,
  hoveredDistrictId: null,
  invalidHeadcountDistrictIds: [],
  buttonHighlighted: false,
  partyColors: []
};
appState.partyColors[0] = $('#party0color').value;
appState.partyColors[1] = $('#party1color').value;

const voters = [];

// PURE FUNCTIONS OF STATE

let rootNumDistricts = () => { return mapConfig.numDistricts**(1/2) };
let rootNumVotersPerDistrict = () => { return mapConfig.votersPerDistrict**(1/2) };
let rootTotalVoters = () => { return rootNumDistricts() * rootNumVotersPerDistrict() };

// 

const districtCounts = (voters) => {
  const counts = {};
  for (let distId = 0; distId < mapConfig.numDistricts; distId++) {
    counts[distId] = {};
    counts[distId].party0 = 0;
    counts[distId].party1 = 0;
  }
  perVoter(voters, (voter) => {
    counts[voter.districtId][voter.partyAffiliation] += 1;
  });

  return counts;
};

const overallCount = (distCounts) => {
  const count = {
    party0: 0,
    party1: 0,
    tied: 0
  };

  for (dCount of Object.values(distCounts)) {
    if (dCount.party0 > dCount.party1) {
      count.party0 ++;
    } else if (dCount.party0 < dCount.party1) {
      count.party1 ++;
    } else { // tie
      count.tied ++;
    }
  }

  return count;
};

// ?

const perVoter = (voters, lambda) => {
  for (voterRow of voters) {
    for (voter of voterRow) {
      lambda(voter);
    }
  }
};

// STATE MANAGEMENT

const updateMapConfigFromInputs = () => {
  if (mapConfig.percentParty0 === undefined) {
    mapConfig.percentParty0 = 0.5;
  }

  mapConfig.percentParty0 = Number($('#percentParty0').value);
  mapConfig.numDistricts = Number($('#numDist').value);
  mapConfig.votersPerDistrict = Number($('#votersPerDist').value);  
};

const assignVoterToDistrict = (voterId, districtId) => {
  voters[voterId[0]][voterId[1]].districtId = districtId;
  checkDistrictSizes();
  render();
};

const selectDistrict = (districtId) => {
  appState.selectedDistrictId = districtId;
  setCursor(DIST_ID_TO_COLOR[districtId]);
};

const deselectDistrict = () => {
  appState.selectedDistrictId = null;
  setCursor(null);
};

const checkDistrictSizes = () => {
  appState.invalidHeadcountDistrictIds.length = 0;
  const counts = districtCounts(voters);
  for (let distId = 0; distId < mapConfig.numDistricts; distId++) {
    const distCount = counts[distId];
    const distTotal = distCount.party0 + distCount.party1;
    if (Math.abs(mapConfig.votersPerDistrict - distTotal) > 1) {
      appState.invalidHeadcountDistrictIds.push(distId);
    }
  }
  applyDynamicStyles();
};

const updatePartyColors = (e) => {
  appState.partyColors[0] = $('#party0color').value;
  appState.partyColors[1] = $('#party1color').value;
  applyDynamicStyles();
};

const highlightButton = () => {
  appState.buttonHighlighted = true;
  applyDynamicStyles();
};

const unhighlightButton = () => {
  appState.buttonHighlighted = false;
  applyDynamicStyles();
};

// gen voters, map

const generate = () => {
  updateMapConfigFromInputs();
  if (mapConfig.numDistricts > Object.keys(DIST_ID_TO_COLOR).length) {
    throw('I need more colors (add to DIST_ID_TO_COLOR)');
  }

  generateVoters();
  checkDistrictSizes();
  applyDynamicStyles();
  render();
  clearDistrictReport();
};

const generateVoters = () => {
  let totalVoters = rootTotalVoters()**2;
  let numParty0Voters = Math.floor(totalVoters * mapConfig.percentParty0);
  let numParty1Voters = totalVoters - numParty0Voters;
  let voterAffiliations = [];
  for (let party0Ind = 0; party0Ind < numParty0Voters; party0Ind++) {
    voterAffiliations.push('party0');
  }
  for (let party1Ind = 0; party1Ind < numParty1Voters; party1Ind++) {
    voterAffiliations.push('party1');
  }
  voterAffiliations = shuffle(voterAffiliations);

  voters.length = 0;
  for (let mapYCoord = 0; mapYCoord < rootTotalVoters(); mapYCoord++) {
    voters[mapYCoord] = [];

    for (let mapXCoord = 0; mapXCoord < rootTotalVoters(); mapXCoord++) {
      voters[mapYCoord][mapXCoord] = {
        voterId: [mapYCoord, mapXCoord],
        partyAffiliation: voterAffiliations.pop(),
        districtId: assignInitialDistrictId(mapYCoord, mapXCoord)
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

const assignInitialDistrictId = (x, y) => {
  // assigns voters to their initial districts
  for (let xDistCoord = 0; xDistCoord < rootNumDistricts(); xDistCoord++) {
    for (let yDistCoord = 0; yDistCoord < rootNumDistricts(); yDistCoord++) {
      if (
        (x >= rootNumVotersPerDistrict() * xDistCoord) &&
        (x < rootNumVotersPerDistrict() * (xDistCoord + 1)) &&
        (y >= rootNumVotersPerDistrict() * yDistCoord) &&
        (y < rootNumVotersPerDistrict() * (yDistCoord + 1))
      ) {
        return (xDistCoord * rootNumDistricts()) + yDistCoord;
      }
    }
  }
  TypeError('voter coords have no corresponding district!?');
};

// EVENTS

const targetHasClass = (className, evnt) => {
  return (
    evnt.target.className &&
    evnt.target.className.split(' ').includes(className)
  )
};

document.body.onpointermove = (e) => {
  if (targetHasClass('voterAffiliation', e)) {
    updateDistrictReport(e.target.parentNode);
  } else if (targetHasClass('voter', e)) { // hovering a voter = hovering the district
    updateDistrictReport(e.target);
  } else {
    clearDistrictReport();
  }
};

document.body.onclick = (e) => {
  if (targetHasClass('voterAffiliation', e)) {
    const idMatch = e.target.parentElement.getAttribute('data-voter-id').match(/(\d+)\-(\d+)/);
    const voterId = [Number(idMatch[1]), Number(idMatch[2])]
    if (typeof appState.selectedDistrictId === 'number') {
      assignVoterToDistrict(voterId, appState.selectedDistrictId);      
    }
  } else if (targetHasClass('voter', e)) {
    selectDistrict(Number(e.target.getAttribute('data-district-id')));
  } else if (targetHasClass('regenerateButton', e)) {
    deselectDistrict();
    unhighlightButton();
  } else {
    deselectDistrict();
  }

  render();
}

document.body.onchange = (e) => {
  const sigDigs = 8;
  const factor = 10**sigDigs;
  if (e.target.id === 'title') {
    if (! /\S/.test($('#title').value)) {
      $('#title').value = 'GERRYMANDERING';
    }
  } else if (targetHasClass('partyColorPicker', e)) {
    updatePartyColors();
  } else if (e.target.id === 'percentParty0') {
    highlightButton();
    $('#percentParty1').value = (
      factor
      - factor * Number($('#percentParty0').value)
    ) / factor;
  } else if (e.target.id === 'percentParty1') {
    highlightButton();
    $('#percentParty0').value = (
      factor
      - factor * Number($('#percentParty1').value)
    ) / factor;
  } else if (['numDist', 'votersPerDist'].includes(e.target.id)) {
    highlightButton();
  }
}

// RENDER

const render = () => {
  $('#mapWrapper').replaceChild(renderMap(voters), $('#map'));
  updateHouseReport();
};

const renderMap = (voterData) => {
  const mapDom = document.createElement('div');
  mapDom.id = 'map';
  mapDom.style['grid-template-rows'] = '60px '.repeat(rootTotalVoters());
  mapDom.style['grid-template-columns'] = '60px '.repeat(rootTotalVoters());

  for (voterRowData of voterData) {
    for (voterData of voterRowData) {
      mapDom.appendChild(renderVoter(voterData));
    }
  }

  return mapDom;
};

const renderVoter = (voterData) => {
  const voterDOM = document.createElement('div');
  voterDOM.classList.add('voter', `district-${voterData.districtId}`);
  voterDOM.setAttribute('data-voter-id', `${voterData.voterId[0]}-${voterData.voterId[1]}`);
  voterDOM.setAttribute('data-district-id', voterData.districtId);
  const voterAffilEl = document.createElement('div');
  voterAffilEl.classList.add('voterAffiliation', voterData.partyAffiliation);
  voterDOM.appendChild(voterAffilEl);
  return voterDOM;
};

const updateHouseReport = () => {
  $('.houseReport').innerHTML = renderHouseReport();
};

const renderHouseReport = () => {
  const distCounts = districtCounts(voters);
  const results = overallCount(distCounts);
  return `
    <div class="houseTitle">HOUSE</div>
    ${winnerDeclaration(results)}
    <div class="partyControlReport">
      <div class="partyDistrictCount party0">
        ${results.party0}
      </div>
      districts
    </div>
    <div class="partyControlReport">
      <div class="partyDistrictCount party1">
        ${results.party1}
        </div>
        districts
    </div>
    <div class="tiedReport">
      <div class="bigCount">
        ${results.tied}
      </div>
      districts tied
    </div>
  `
};

const winnerDeclaration = (results) => {
  if (results.party0 > results.party1) {
    return `
      <div class="winnerDeclaration winnerDeclarationLeft">
        VICTOR
      </div>
    `;
  } else if (results.party0 < results.party1) {
    return `
      <div class="winnerDeclaration winnerDeclarationRight">
        VICTOR
      </div>
    `;
  } else {
    return `
      <div class="winnerDeclaration winnerDeclarationTie">
        tie!
      </div>
    `;
  }
};

const districtReport = (distId) => {
  const districtCount = districtCounts(voters)[distId];
  return `
    <div class="districtTitle district-${distId}">DISTRICT</div>
    ${winnerDeclaration(districtCount)}
    <div class="partyControlReport">
      <div class="partyDistrictCount party0">
        ${districtCount.party0}
      </div>
      voters
    </div>
    <div class="partyControlReport">
      <div class="partyDistrictCount party1">
        ${districtCount.party1}
      </div>
      voters
    </div>
  `
};

const updateDistrictReport = (voter) => {
  const thisMoveHoveredDistrictId = Number(voter.className.match(/district\-(\d+)/)[1]);
  if (appState.hoveredDistrictId !== thisMoveHoveredDistrictId) {
    $('.districtReport').innerHTML = districtReport(thisMoveHoveredDistrictId);
    appState.hoveredDistrictId = thisMoveHoveredDistrictId;
  }
};

const clearDistrictReport = () => {
  appState.hoveredDistrictId = null;
  $('.districtReport').innerHTML = `
    <div class="hoverHeadsUp">
      Hover over a district
      <br />
      to see its vote count
    </div>
  `;
};

// DYNAMIC STYLING

const districtStyles = (districtId, invalidHeadcount) => {
  if (invalidHeadcount) {
    return `
      .district-${districtId} {
        background-image: repeating-linear-gradient(
          -45deg,
          #${DIST_ID_TO_COLOR[districtId]},
          #${DIST_ID_TO_COLOR[districtId]} 10.675px,
          #f00 10.675px,
          #f00 21.25px
        );
      }
    `;    
  } else {
    return `
      .district-${districtId} {
        background-color: #${DIST_ID_TO_COLOR[districtId]};
      }
    `;
  }
};

const partySplitInputBackgroundStyles = () => {
    return `
      .controlLine>input[class=party0] {
        background-color: ${appState.partyColors[0]}88;
      }

      .controlLine>input[class=party1] {
        background-color: ${appState.partyColors[1]}88;
      }
    `;
};

const buttonStyle = (highlight) => {
  if (highlight) {
    return `
      .regenerateButton {
      	background-color: #f0c911;
        border: 2px solid #e54;
      	color: #b32;
      }
      .regenerateButton:hover {
      	background-color: #f4d415;
        border: 2px solid #e54;
        color: #c43;
      }
    `;
  } else {
    return `
      .regenerateButton {
      	background-color: #ddd;
      	border: 2px solid #555;
      	color: #555;
      }
      .regenerateButton:hover {
      	background-color: #eee;
        border: 2px solid #666;
        color: #666;
      }
    `;
  }
};

const applyDynamicStyles = () => {
  let styleText = '';
  for (let distId = 0; distId < mapConfig.numDistricts; distId++) {
    styleText += districtStyles(
      distId,
      appState.invalidHeadcountDistrictIds.includes(distId)
    );
  }
  styleText += `\n.party0 { background-color: ${appState.partyColors[0]}; }`;
  styleText += `\n.party1 { background-color: ${appState.partyColors[1]}; }`;
  styleText += partySplitInputBackgroundStyles();
  styleText += buttonStyle(appState.buttonHighlighted);

  const oldStyleEl = $('.dynamicStyleEl');
  let newStyleEl = document.createElement('style');
  newStyleEl.classList.add('dynamicStyleEl');
  newStyleEl.innerHTML = styleText;
  oldStyleEl.parentElement.replaceChild(newStyleEl, oldStyleEl);
};

const setCursor = (color) => {
  if (! color) {
    $('body').style.cursor = 'default';
  } else {
    $('body').style.cursor = `url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20height='36'%20width='24'%3E%20%20%3Cpolygon%20points='3,3%2021,25%203,33'%20fill='%23${color}'%20stroke='black'%20stroke-width='2'/%3E%3C/svg%3E") 0 0, default`;
  }
};

// INITIALIZATION

window.onload = (e) => {
  generate();
};
