import renderMap from './renderers/render-map';
import updateCurrentHouseReport from './update-current-house-report';

export default ($, mapConfig, appState) => {
  $('#mapWrapper').replaceChild(
    renderMap(
      appState.voters,
      mapConfig.rootTotalVoters()
    ),
    $('#map')
  );
  updateCurrentHouseReport($, appState.districtCounts);
};
