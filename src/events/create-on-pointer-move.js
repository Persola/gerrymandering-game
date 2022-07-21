import assignableClassName from '../data/assignable-class';
import setCursor from '../dynamic-styles/set-cursor';
import applyDynamicStyles from '../dynamic-styles/apply-dynamic-styles';
import voterIsAssignable from '../map-logic/voter-is-assignable';
import updateDistrictReport from '../render/update-district-report';
import clearDistrictReport from '../render/clear-district-report';
import extractVoterId from '../util/extract-voter-id';
import targetHasClass from '../util/target-has-class';

const updateAssignVoterIndicator = ($, hoveredSlot, appState, mapConfig) => {
  const indicatedSlot = $(`.${assignableClassName}`);

  if (indicatedSlot === hoveredSlot) {
    return;
  }

  if (indicatedSlot !== null) {
    indicatedSlot.classList.remove(assignableClassName);
  }

  if (hoveredSlot !== null) {
    hoveredSlot.classList.add(assignableClassName);
  }
};

export default ($, appState, mapConfig) => {
  return (e) => {
    if (targetHasClass('voterAffiliation', e)) {
      updateDistrictReport(appState, e.target.parentNode, $);
      updateAssignVoterIndicator(
        $,
        voterIsAssignable(
          extractVoterId(e.target.parentElement.getAttribute('data-voter-id')),
          appState.selectedDistrictId,
          Number(e.target.parentElement.getAttribute('data-district-id')),
          appState,
          mapConfig
        )
        ? e.target.parentNode
        : null,
        appState,
        mapConfig
      );
      appState.hoveringOnSlot = false;
      applyDynamicStyles($, appState, mapConfig);
    } else if (targetHasClass('voterSlot', e)) {
      updateDistrictReport(appState, e.target, $);
      updateAssignVoterIndicator($, null, appState, mapConfig);
      appState.hoveringOnSlot = true;
    } else {
      clearDistrictReport(appState, $);
      updateAssignVoterIndicator($, null, appState, mapConfig);
      appState.hoveringOnSlot = false;
    }

    setCursor($, appState);
  };
};

