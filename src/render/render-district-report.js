import districtReportHtml from './renderers/district-report-html';

export default (appState, $) => {
  $('.districtReport').innerHTML = districtReportHtml(
    appState.hoveredDistrictId,
    appState.districtCounts
  );
};
