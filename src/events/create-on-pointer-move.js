import setCursor from '../dynamic-styles/set-cursor';
import voterIsAssignable from '../map-logic/voter-is-assignable';
import updateDistrictReport from '../render/update-district-report';
import clearDistrictReport from '../render/clear-district-report';
import extractVoterId from '../util/extract-voter-id';
import targetHasClass from '../util/target-has-class';

import updateAssignVoterIndicator from './update-assign-voter-indicator';

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

