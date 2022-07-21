import districtReportHtml from './renderers/district-report-html';

export default (appState, voter, $) => {
  const thisMoveHoveredDistrictId = Number(voter.className.match(/district\-(\d+)/)[1]);
  if (appState.hoveredDistrictId !== thisMoveHoveredDistrictId) {
    $('.districtReport').innerHTML = districtReportHtml(thisMoveHoveredDistrictId, appState.districtCounts);
    appState.hoveredDistrictId = thisMoveHoveredDistrictId;
  }
};
