import DIST_ID_TO_COLOR from '../data/dist-id-to-color';
import setCursor from '../dynamic-styles/set-cursor';
import applyDynamicStyles from '../dynamic-styles/apply-dynamic-styles';
import restartTimer from './restart-timer';
import updateInvalidDistricts from '../update-state/update-invalid-districts';
import updateOrigVoters from '../update-state/update-orig-voters';
import updateMapConfigFromInputs from '../update-state/update-map-config-from-inputs';
import renderMap from '../render/render-map';
import renderDistrictReport from '../render/render-district-report';
import renderCurrentHouseReport from '../render/render-current-house-report';
import renderOrigHouseReport from '../render/render-orig-house-report';

import generateVoters from '../generate-state/generate-voters';
import updateDistrictCounts from '../update-state/update-district-counts';

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
  updateOrigVoters(appState);
  updateDistrictCounts(appState, mapConfig);
  updateInvalidDistricts(appState, mapConfig);

  renderOrigHouseReport($, appState.origVoters, appState.districtCounts);
  renderCurrentHouseReport($, appState.districtCounts);
  renderDistrictReport(appState, $);

  applyDynamicStyles($, appState, mapConfig);
  renderMap($, mapConfig, appState);
  setCursor($, appState);

  restartTimer($, mapConfig);
};
