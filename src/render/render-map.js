import mapDomNode from './renderers/map-dom-node';

export default ($, mapConfig, appState) => {
  $('#mapWrapper').replaceChild(
    mapDomNode(
      appState.voters,
      mapConfig.rootTotalVoters()
    ),
    $('#map')
  );
};
