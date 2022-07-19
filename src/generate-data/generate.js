import countVoters from '../count-logic/count-voters';
import DIST_ID_TO_COLOR from '../data/dist-id-to-color';
import setCursor from '../dynamic-styles/set-cursor';
import applyDynamicStyles from '../dynamic-styles/apply-dynamic-styles';
import restartTimer from '../events/restart-timer';
import checkDistrictSizes from '../map-logic/check-district-sizes';
import render from '../render/render';
import clearDistrictReport from '../render/clear-district-report';
import updateOrigHouseReport from '../render/update-orig-house-report';

import generateVoters from './generate-voters';

const updateMapConfigFromInputs = ($, mapConfig) => {
  if (mapConfig.percentParty0 === undefined) {
    mapConfig.percentParty0 = 0.5;
  }

  mapConfig.percentParty0 = Number($('#percentParty0').value);
  mapConfig.numDistricts = Number($('#numDist').value);
  mapConfig.votersPerDistrict = Number($('#votersPerDist').value);  
};

const setOrigVoters = (appState) => {
  appState.origVoters.length = 0;

  appState.voters.forEach(voterCol => {
    const col = [];

    voterCol.forEach(voter => {
      col.push(Object.assign({}, voter));
    });

    appState.origVoters.push(col);
  });
};

export default ($, mapConfig, appState) => {
  updateMapConfigFromInputs($, mapConfig);
  if (mapConfig.numDistricts > Object.keys(DIST_ID_TO_COLOR).length) {
    throw('I need more colors (add to DIST_ID_TO_COLOR)');
  }

  generateVoters(
    appState.voters,
    mapConfig,
    mapConfig.rootTotalVoters(),
    mapConfig.rootNumDistricts(),
    mapConfig.rootNumVotersPerDistrict()
  );
  countVoters(false, appState, mapConfig);
  setOrigVoters(appState);
  updateOrigHouseReport($, appState.origVoters, appState.districtCounts);
  checkDistrictSizes($, appState, mapConfig);
  applyDynamicStyles($, appState, mapConfig);
  render($, mapConfig, appState);
  setCursor($, appState);
  clearDistrictReport(appState, $);
  restartTimer($, mapConfig);
};
