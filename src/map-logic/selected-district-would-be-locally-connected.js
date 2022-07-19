import detectNeighborsOfDistrict from './detect-neighbors-of-district';
import countGaps from './count-gaps';

export default (clickedVoterId, selectedDistrictId, appState, mapConfig) => {
  /*
    Allow or disallow assignment of individual voters to districts such that
    across many assignments (1) districts never contain holes (voters of other
    districts inside them) and (2) districts are never broken into unconnected
    pieces.
  */
  const selectedDistrictNeighbors = detectNeighborsOfDistrict(
    clickedVoterId,
    selectedDistrictId,
    appState.voters,
    mapConfig.rootTotalVoters()
  );

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
