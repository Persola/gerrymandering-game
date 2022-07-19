import applyDynamicStyles from '../dynamic-styles/apply-dynamic-styles';

export default (appState, e) => {
  appState.partyColors[0] = $('#party0color').value;
  appState.partyColors[1] = $('#party1color').value;
  applyDynamicStyles($, appState, mapConfig);
};
