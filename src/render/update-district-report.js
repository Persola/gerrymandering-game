import districtReport from './renderers/district-report';

export default (appState, voter, $) => {
  const thisMoveHoveredDistrictId = Number(voter.className.match(/district\-(\d+)/)[1]);
  if (appState.hoveredDistrictId !== thisMoveHoveredDistrictId) {
    $('.districtReport').innerHTML = districtReport(thisMoveHoveredDistrictId, appState.districtCounts);
    appState.hoveredDistrictId = thisMoveHoveredDistrictId;
  }
};
