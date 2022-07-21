import setCursor from '../dynamic-styles/set-cursor';
import applyDynamicStyles from '../dynamic-styles/apply-dynamic-styles';
import voterIsAssignable from '../map-logic/voter-is-assignable';
import renderDistrictReport from '../render/render-district-report';
import renderAssignableIndicator from '../render/render-assignable-indicator';
import updateHoveredDistrictId from '../update-state/update-hovered-district-id';
import updateState from '../update-state/update-state';
import extractVoterId from '../util/extract-voter-id';
import targetHasClass from '../util/target-has-class';

export default ($, appState, mapConfig) => {
  return (e) => {
    if (targetHasClass('voterAffiliation', e)) {
      updateHoveredDistrictId(appState, e.target.parentNode)
      updateState(appState, { hoveringOnSlot: false });

      const hoveredSlot = voterIsAssignable(
        extractVoterId(e.target.parentElement.getAttribute('data-voter-id')),
        appState.selectedDistrictId,
        Number(e.target.parentElement.getAttribute('data-district-id')),
        appState,
        mapConfig
      )
      ? e.target.parentNode
      : null;
      renderAssignableIndicator($, hoveredSlot);
      renderDistrictReport(appState, $);
      applyDynamicStyles($, appState, mapConfig);
    } else if (targetHasClass('voterSlot', e)) {
      updateHoveredDistrictId(appState, e.target)
      updateState(appState, { hoveringOnSlot: true });
      renderDistrictReport(appState, $);
      renderAssignableIndicator($, null);
    } else {
      updateHoveredDistrictId(appState, null)
      updateState(appState, { hoveringOnSlot: false });
      renderDistrictReport(appState, $);
      renderAssignableIndicator($, null);
    }

    setCursor($, appState);
  };
};

