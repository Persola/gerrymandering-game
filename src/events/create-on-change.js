import applyDynamicStyles from '../dynamic-styles/apply-dynamic-styles';
import targetHasClass from '../util/target-has-class';

const updatePartyColors = ($, appState, mapConfig, e) => {
  appState.partyColors[0] = $('#party0color').value;
  appState.partyColors[1] = $('#party1color').value;
  applyDynamicStyles($, appState, mapConfig);
};

const sigDigs = 8;
const factor = 10**sigDigs;

const oneMinus = (firstValue) => {
  return (
    factor
    - factor * firstValue
  ) / factor;
};

const highlightButton = ($, appState, mapConfig) => {
  appState.buttonHighlighted = true;
  applyDynamicStyles($, appState, mapConfig);
};

export default ($, appState, mapConfig) => {
  return (e) => {
    if (targetHasClass('partyColorPicker', e)) {
      updatePartyColors($, appState, mapConfig, e);
    } else if (e.target.id === 'percentParty0') {
      highlightButton($, appState, mapConfig);
      $('#percentParty1').value = oneMinus(Number($('#percentParty0').value));
    } else if (e.target.id === 'percentParty1') {
      highlightButton($, appState, mapConfig);
      $('#percentParty0').value = oneMinus(Number($('#percentParty1').value));
    } else if (['numDist', 'votersPerDist'].includes(e.target.id)) {
      highlightButton($, appState, mapConfig);
    }
  }
};
