import applyDynamicStyles from '../dynamic-styles/apply-dynamic-styles';

export default ($, appState, mapConfig) => {
  appState.invalidHeadcountDistrictIds.length = 0;
  for (let distId = 0; distId < mapConfig.numDistricts; distId++) {
    const distTotal = appState.districtCounts[distId].party0 + appState.districtCounts[distId].party1;
    if (Math.abs(mapConfig.votersPerDistrict - distTotal) > 1) {
      appState.invalidHeadcountDistrictIds.push(distId);
    }
  }

  applyDynamicStyles($, appState, mapConfig);
};
