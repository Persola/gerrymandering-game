const DIST_ID_TO_COLOR = {
  0: '00af91',
  1: 'cc7351',
  2: 'fa963d',
  3: '8040b0',
  4: 'd860b0',
  5: 'e0b020',
  6: '504090',
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

const assignVoterIndicatorClass = 'assignVoterIndicator';

// INITIALIZE STATE

const mapConfig = {
  percentParty0: 0.5,
  numDistricts: Number($('#numDist').value),
  votersPerDistrict: Number($('#votersPerDist').value)
};

let appState = {
  partyColors: [],
  selectedDistrictId: null,
  hoveredDistrictId: null,
  hoveringOnSlot: false,
  invalidHeadcountDistrictIds: [],
  buttonHighlighted: false
};
appState.partyColors[0] = $('#party0color').value;
appState.partyColors[1] = $('#party1color').value;

// dummy interval to start
let timerInterval = setInterval(() => null, 100);

// Double nested array of voter data (see generateVoters)
const voters = [];
const origVoters = [];
let districtCounts = {};

// PURE FUNCTIONS OF STATE

let rootNumDistricts = () => { return mapConfig.numDistricts**(1/2) };
let rootNumVotersPerDistrict = () => { return mapConfig.votersPerDistrict**(1/2) };
let rootTotalVoters = () => { return rootNumDistricts() * rootNumVotersPerDistrict() };

// LOAD SOUND

const clickFoley = new Audio('./click.mp3');
const crunchFoley = new Audio('./crunch.m4a');

const resultFromDistrictCount = (districtCount) => {
  if (districtCount.party0 > districtCount.party1) {
    return 'party0';
  }

  if (districtCount.party0 < districtCount.party1) {
    return 'party1';
  }

  if (districtCount.party0 !== districtCount.party1) {
    throw error("what's up with this district count?");
  }

  return 'tie';
};

const playCrunchIfConvertedDistrict = (oldCount, newCount) => {
  let districtChanged = false;

  for (distId of Object.keys(newCount)) {
    if (
      resultFromDistrictCount(oldCount[distId])
      !== resultFromDistrictCount(newCount[distId])
    ) {
      districtChanged = true;
    }
  }

  if (districtChanged) { crunchFoley.play(); };
};

const countVoters = (voterAssignment) => {
  const newCount = countFromVoters(voters);
  if (voterAssignment) {
    playCrunchIfConvertedDistrict(districtCounts, newCount);
  }
  districtCounts = newCount;
};

const countFromVoters = (voters) => {
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

const restartTimer = () => {
  const startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    updateTimer(startTime);
  }, 1)
};

const updateTimer = (startTime) => {
  const totalMilliseconds = Date.now() - startTime;
  const seconds = Math.floor(totalMilliseconds/1000) % 60;
  const minutes = Math.floor(totalMilliseconds/(1000 * 60));
  const secondsString = String(seconds).padStart(2, 0);
  const minutesString = String(minutes).padStart(2, 0);
  $('#timer').innerText = `${minutesString}:${secondsString}`;
};

const updateMapConfigFromInputs = () => {
  if (mapConfig.percentParty0 === undefined) {
    mapConfig.percentParty0 = 0.5;
  }

  mapConfig.percentParty0 = Number($('#percentParty0').value);
  mapConfig.numDistricts = Number($('#numDist').value);
  mapConfig.votersPerDistrict = Number($('#votersPerDist').value);  
};

const assignVoterToDistrict = (voterId, districtId) => {
  clickFoley.play();
  voters[voterId[0]][voterId[1]].districtId = districtId;
  countVoters(true);
  checkDistrictSizes();
  render();
};

const selectDistrict = (districtId) => {
  appState.selectedDistrictId = districtId;
  setCursor();
};

const deselectDistrict = () => {
  appState.selectedDistrictId = null;
  setCursor();
};

const checkDistrictSizes = () => {
  appState.invalidHeadcountDistrictIds.length = 0;
  for (let distId = 0; distId < mapConfig.numDistricts; distId++) {
    const distTotal = districtCounts[distId].party0 + districtCounts[distId].party1;
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
  countVoters(false);
  setOrigVoters();
  updateOrigHouseReport();
  checkDistrictSizes();
  applyDynamicStyles();
  render();
  clearDistrictReport();
  restartTimer();
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

const setOrigVoters = () => {
  origVoters.length = 0;

  voters.forEach(voterCol => {
    const col = [];

    voterCol.forEach(voter => {
      col.push(Object.assign({}, voter));
    });

    origVoters.push(col);
  });
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
    updateAssignVoterIndicator(
      voterIsAssignable(
        extractVoterId(e.target.parentElement.getAttribute('data-voter-id')),
        appState.selectedDistrictId,
        Number(e.target.parentElement.getAttribute('data-district-id'))
      )
      ? e.target.parentNode
      : null
    );
    appState.hoveringOnSlot = false;
  } else if (targetHasClass('voterSlot', e)) {
    updateDistrictReport(e.target);
    updateAssignVoterIndicator(null);
    appState.hoveringOnSlot = true;
  } else {
    clearDistrictReport();
    updateAssignVoterIndicator(null);
    appState.hoveringOnSlot = false;
  }

  setCursor();
};

const updateAssignVoterIndicator = (hoveredSlot) => {
  const indicatedSlot = $(`.${assignVoterIndicatorClass}`);

  if (indicatedSlot === hoveredSlot) {
    return;
  }

  if (indicatedSlot !== null) {
    indicatedSlot.classList.remove(assignVoterIndicatorClass);
  }

  if (hoveredSlot !== null) {
    hoveredSlot.classList.add(assignVoterIndicatorClass);
  }

  applyDynamicStyles();
};

document.body.onclick = (e) => {
  if (targetHasClass('voterAffiliation', e)) {
    const clickedVoterId = extractVoterId(e.target.parentElement.getAttribute('data-voter-id'));
    const replacedDistrictId = Number(e.target.parentElement.getAttribute('data-district-id'));
    if (voterIsAssignable(clickedVoterId, appState.selectedDistrictId, replacedDistrictId)) {
      assignVoterToDistrict(clickedVoterId, appState.selectedDistrictId);
    }
  } else if (targetHasClass('voterSlot', e)) {
    selectDistrict(Number(e.target.getAttribute('data-district-id')));
  } else if (targetHasClass('regenerateButton', e)) {
    deselectDistrict();
    generate();
    unhighlightButton();
  } else {
    deselectDistrict();
  }

  render();
}

const extractVoterId = idString => {
  const match = idString.match(/(\d+)\-(\d+)/);
  return [Number(match[1]), Number(match[2])]
};

const voterIsAssignable = (voterId, selectedDistrictId, voterOldDistrictId) => {
  if (voterOldDistrictId === selectedDistrictId) {
    return false;
  }

  return (
    typeof selectedDistrictId === 'number' // a district is selected
    && selectedDistrictWouldBeLocallyConnected(voterId, selectedDistrictId)
    && replacedDistrictWouldBeLocallyConnected(voterId, voterOldDistrictId)
  )
};

const selectedDistrictWouldBeLocallyConnected = (clickedVoterId, selectedDistrictId) => {
  /*
    Allow or disallow assignment of individual voters to districts such that
    across many assignments (1) districts never contain holes (voters of other
    districts inside them) and (2) districts are never broken into unconnected
    pieces.
  */
  const selectedDistrictNeighbors = detectNeighborsOfDistrict(clickedVoterId, selectedDistrictId);

  if ([
    selectedDistrictNeighbors.down,
    selectedDistrictNeighbors.right,
    selectedDistrictNeighbors.up,
    selectedDistrictNeighbors.left
  ].filter(Boolean).length === 0) {
    /*
      Clicked voter has no directly adjacent neighbors belonging to the selected
      district, so it would be isolated
    */
    return false;
  }

  const gaps = countGaps(selectedDistrictNeighbors);
  return gaps < 2; // multiple gaps creates a hole
};

const replacedDistrictWouldBeLocallyConnected = (clickedVoterId, replacedDistrictId) => {
  /*
    Allow or disallow removal of voters from districts such that across many
    removals the replaced district will never be broken into separate pieces.
  */
  const replacedDistrictNeighbors = detectNeighborsOfDistrict(clickedVoterId, replacedDistrictId);
  const gaps = countGaps(replacedDistrictNeighbors);
  return gaps < 2; // multiple gaps severs a district
};

const detectNeighborsOfDistrict = (centerVoterCoords, districtId) => {
  return {
    down:      coordsWithinDistrict([centerVoterCoords[0] + 1, centerVoterCoords[1]    ], districtId),
    downRight: coordsWithinDistrict([centerVoterCoords[0] + 1, centerVoterCoords[1] + 1], districtId),
    right:     coordsWithinDistrict([centerVoterCoords[0]    , centerVoterCoords[1] + 1], districtId),
    upRight:   coordsWithinDistrict([centerVoterCoords[0] - 1, centerVoterCoords[1] + 1], districtId),
    up:        coordsWithinDistrict([centerVoterCoords[0] - 1, centerVoterCoords[1]    ], districtId),
    upLeft:    coordsWithinDistrict([centerVoterCoords[0] - 1, centerVoterCoords[1] - 1], districtId),
    left:      coordsWithinDistrict([centerVoterCoords[0]    , centerVoterCoords[1] - 1], districtId),
    downLeft:  coordsWithinDistrict([centerVoterCoords[0] + 1, centerVoterCoords[1] - 1], districtId)
  };
};

const coordsWithinDistrict = (coords, districtId) => {
  if (
    coords[0] < 0 ||
    coords[1] < 0 ||
    coords[0] >= (rootTotalVoters()) ||
    coords[1] >= (rootTotalVoters())
  ) {
    return false; // out of bounds, not a voter
  }

  return voters[coords[0]][coords[1]].districtId === districtId;
};

const countGaps = (neighborsOfDistrict) => {
  /*
    Only cells in the four basic directions count as adjacent. Diagonals are
    only referenced in order to do this.
  */
  const directions = [
    'downRight',
    'right',
    'upRight',
    'up',
    'upLeft',
    'left',
    'downLeft',
    'down',
  ];

  let inSelectedDistrict = neighborsOfDistrict.down;
  let gaps = 0;

  for (directionInd in directions) {
    const direction = directions[directionInd];

    if (inSelectedDistrict) {
      if (!neighborsOfDistrict[direction]) {
        inSelectedDistrict = false;
        gaps ++;
      }
    } else {
      if (
        neighborsOfDistrict[direction] &&
        ['down', 'right', 'up', 'left'].includes(direction)
      ) {
        inSelectedDistrict = true;
      }
    }
  }

  return gaps;
};

document.body.onchange = (e) => {
  const sigDigs = 8;
  const factor = 10**sigDigs;
  if (targetHasClass('partyColorPicker', e)) {
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
  updateCurrentHouseReport();
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
  const classList = ['voterSlot', `district-${voterData.districtId}`];
  const sameDistrictNeighbors = detectNeighborsOfDistrict(voterData.voterId, voterData.districtId);
  if (!sameDistrictNeighbors.down) { classList.push('district-border-bottom') }
  if (!sameDistrictNeighbors.right) { classList.push('district-border-right') }
  if (!sameDistrictNeighbors.up) { classList.push('district-border-top') }
  if (!sameDistrictNeighbors.left) { classList.push('district-border-left') }
  voterDOM.classList.add(...classList);
  voterDOM.setAttribute('data-voter-id', `${voterData.voterId[0]}-${voterData.voterId[1]}`);
  voterDOM.setAttribute('data-district-id', voterData.districtId);
  const voterAffilEl = document.createElement('div');
  voterAffilEl.classList.add('voterAffiliation', voterData.partyAffiliation);
  voterDOM.appendChild(voterAffilEl);
  return voterDOM;
};

const updateCurrentHouseReport = () => {
  $('.currentHouseReport').innerHTML = renderHouseReport(voters, 'Gerrymandered Districts');
};

const updateOrigHouseReport = () => {
  $('.origHouseReport').innerHTML = renderHouseReport(origVoters, 'State - Original Districts');
};

const renderHouseReport = (votersForReport, title) => {
  const results = overallCount(districtCounts);
  return `
    <div class="houseTitle">${title}</div>
    ${winnerDeclaration(results)}
    <div class="partyControlReport">
      <div class="partyDistrictCount party0">
        ${results.party0}
      </div>
      districts
    </div>
    <div class="partyControlReport">
      <div class="partyDistrictCount">
        ${results.tied}
      </div>
      tied
    </div>
    <div class="partyControlReport">
      <div class="partyDistrictCount party1">
        ${results.party1}
        </div>
        districts
    </div>
  `
};

const winnerDeclaration = (results) => {
  if (results.party0 > results.party1) {
    return `
      <div class="winnerDeclaration winnerDeclarationLeft">
        MAJORITY
      </div>
    `;
  } else if (results.party0 < results.party1) {
    return `
      <div class="winnerDeclaration winnerDeclarationRight">
        MAJORITY
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
  const districtCount = districtCounts[distId];
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
      <div class="partyDistrictCount">
        ${districtCount.party0 + districtCount.party1}
      </div>
      total
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
          #${DIST_ID_TO_COLOR[districtId]} 18.675px,
          #f00 18.675px,
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
      	background-color: #ee8;
      	border: 2px solid #995;
      	color: #b32;
      }
      .regenerateButton:hover {
      	background-color: #ff9;
        border: 2px solid #aa6;
        color: #c43;
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
  styleText += `
    .${assignVoterIndicatorClass} {
      background-image: none;
      background-color: #${DIST_ID_TO_COLOR[appState.selectedDistrictId]};
    }
  `;

  const oldStyleEl = $('.dynamicStyleEl');
  let newStyleEl = document.createElement('style');
  newStyleEl.classList.add('dynamicStyleEl');
  newStyleEl.innerHTML = styleText;
  oldStyleEl.parentElement.replaceChild(newStyleEl, oldStyleEl);
};

const setCursor = () => {
  const emptyColor = 'ffffff';
  const mainColor = (
    appState.selectedDistrictId === null
    ? emptyColor
    : DIST_ID_TO_COLOR[appState.selectedDistrictId]
  );
  const secondColor = (
    appState.hoveringOnSlot && (appState.selectedDistrictId !== appState.hoveredDistrictId)
    ? DIST_ID_TO_COLOR[appState.hoveredDistrictId]
    : null
  );

  $('body').style.cursor = cursorStyle(mainColor, secondColor);
};

const cursorStyle = (color, innerColor) => {
  const first = (
    `url(`
      + `"data:image/svg+xml,%3C`
        + `svg%20xmlns='http://www.w3.org/2000/svg'%20`
        + `height='54'%20`
        + `width='36'`
      + `%3E`
      + `%3C`
        + `polygon%20`
        + `points='1,0%2026,32%201,44'%20`
        + `fill='%23${color}'%20`
        + `stroke='black'%20`
        + `stroke-width='2'/`
      + `%3E`
  )
  const optional = (
      `%3C`
        + `polygon%20`
        + `points='1,30%2018,22%2026,32%201,44'%20`
        + `fill='%23${innerColor}'%20`
        + `stroke='black'%20`
        + `stroke-width='2'/`
      + `%3E`
  )
  const last = `%3C/svg%3E") 0 0, default`;

  if (innerColor !== null) {
    return first + optional + last;
  } else {
    return first + last;
  }
};

// INITIALIZATION

window.onload = (e) => {
  generate();
  setCursor(null);
  restartTimer();
};
