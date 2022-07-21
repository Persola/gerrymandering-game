import applyDynamicStyles from '../dynamic-styles/apply-dynamic-styles';
import setCursor from '../dynamic-styles/set-cursor';
import generate from '../events/generate';
import extractVoterId from '../util/extract-voter-id';
import renderMap from '../render/render-map';
import renderCurrentHouseReport from '../render/render-current-house-report';
import updateState from '../update-state/update-state';

import targetHasClass from '../util/target-has-class';
import voterIsAssignable from '../map-logic/voter-is-assignable';
import assignVoterToDistrict from '../update-state/assign-voter-to-district';

export default ($, appState, mapConfig) => {
  return (e) => {
    if (targetHasClass('voterAffiliation', e)) {
      const clickedVoterId = extractVoterId(e.target.parentElement.getAttribute('data-voter-id'));
      const replacedDistrictId = Number(e.target.parentElement.getAttribute('data-district-id'));
      if (voterIsAssignable(clickedVoterId, appState.selectedDistrictId, replacedDistrictId, appState, mapConfig)) {
        assignVoterToDistrict(clickedVoterId, appState.selectedDistrictId, appState, mapConfig, $);
      }
    } else if (targetHasClass('voterSlot', e)) {
      updateState(appState, {
        selectedDistrictId: Number(e.target.getAttribute('data-district-id'))
      });
      setCursor($, appState);
    } else if (targetHasClass('regenerateButton', e)) {
      updateState(appState, { selectedDistrictId: null });
      setCursor($, appState);
      generate($, mapConfig, appState);
      updateState(appState, { buttonHighlighted: false });
    } else {
      updateState(appState, { selectedDistrictId: null });
      setCursor($, appState);
    }
  
    applyDynamicStyles($, appState, mapConfig);
    renderMap($, mapConfig, appState);
    renderCurrentHouseReport($, appState.districtCounts);
  };
};
