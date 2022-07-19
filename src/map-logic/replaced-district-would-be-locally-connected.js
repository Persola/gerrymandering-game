import detectNeighborsOfDistrict from './detect-neighbors-of-district';
import countGaps from './count-gaps';

export default (clickedVoterId, replacedDistrictId, appState, mapConfig) => {
  /*
    Allow or disallow removal of voters from districts such that across many
    removals the replaced district will never be broken into separate pieces.
  */
  const replacedDistrictNeighbors = detectNeighborsOfDistrict(
    clickedVoterId,
    replacedDistrictId,
    appState.voters,
    mapConfig.rootTotalVoters()
  );
  const gaps = countGaps(replacedDistrictNeighbors);
  return gaps < 2; // multiple gaps severs a district
};
