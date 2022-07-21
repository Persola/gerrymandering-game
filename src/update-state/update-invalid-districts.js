import invalidHeadcountDistrictIds from '../map-logic/invalid-headcount-district-ids';

export default (appState, mapConfig) => {
  appState.invalidHeadcountDistrictIds = invalidHeadcountDistrictIds(
    mapConfig.numDistricts,
    mapConfig.votersPerDistrict,
    appState.districtCounts
  );
};
