import assignVoterIndicatorClass from '../data/voter-indicator-class';
import applyDynamicStyles from '../dynamic-styles/apply-dynamic-styles';

export default ($, hoveredSlot, appState, mapConfig) => {
  const indicatedSlot = $(`.${assignVoterIndicatorClass}`);

  if (indicatedSlot === hoveredSlot) {
    return;
  }

  if (indicatedSlot !== null) {
    indicatedSlot.classList.remove(assignVoterIndicatorClass);
  }

  if (hoveredSlot !== null) {
    hoveredSlot.classList.add(assignVoterIndicatorClass);
  }

  applyDynamicStyles($, appState, mapConfig);
};
