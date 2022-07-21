import applyDynamicStyles from '../dynamic-styles/apply-dynamic-styles';
import targetHasClass from '../util/target-has-class';
import updatePartyColors from '../update-state/update-party-colors';
import updateState from '../update-state/update-state';

const sigDigs = 8;
const factor = 10**sigDigs;

const oneMinus = (firstValue) => {
  return (
    factor
    - factor * firstValue
  ) / factor;
};

export default ($, appState, mapConfig) => {
  return (e) => {
    if (targetHasClass('partyColorPicker', e)) {
      updatePartyColors($, appState, mapConfig, e);
    } else if (e.target.id === 'percentParty0') {
      updateState(appState, {buttonHighlighted: true});
      $('#percentParty1').value = oneMinus(Number($('#percentParty0').value));
    } else if (e.target.id === 'percentParty1') {
      updateState(appState, {buttonHighlighted: true});
      $('#percentParty0').value = oneMinus(Number($('#percentParty1').value));
    } else if (['numDist', 'votersPerDist'].includes(e.target.id)) {
      updateState(appState, {buttonHighlighted: true});
    }

    applyDynamicStyles($, appState, mapConfig);
  }
};
