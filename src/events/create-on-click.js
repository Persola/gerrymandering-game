import applyDynamicStyles from '../dynamic-styles/apply-dynamic-styles';
import setCursor from '../dynamic-styles/set-cursor';
import generate from '../events/generate';
import extractVoterId from '../util/extract-voter-id';
import renderMap from '../render/render-map';
import updateCurrentHouseReport from '../render/update-current-house-report';

import targetHasClass from '../util/target-has-class';
import voterIsAssignable from '../map-logic/voter-is-assignable';
import assignVoterToDistrict from './assign-voter-to-district';

const selectDistrict = ($, appState, districtId) => {
  appState.selectedDistrictId = districtId;
  setCursor($, appState);
};

const deselectDistrict = ($, appState) => {
  appState.selectedDistrictId = null;
  setCursor($, appState);
};

const unhighlightButton = ($, appState, mapConfig) => {
  appState.buttonHighlighted = false;
};

export default ($, appState, mapConfig) => {
  return (e) => {
    if (targetHasClass('voterAffiliation', e)) {
      const clickedVoterId = extractVoterId(e.target.parentElement.getAttribute('data-voter-id'));
      const replacedDistrictId = Number(e.target.parentElement.getAttribute('data-district-id'));
      if (voterIsAssignable(clickedVoterId, appState.selectedDistrictId, replacedDistrictId, appState, mapConfig)) {
        assignVoterToDistrict(clickedVoterId, appState.selectedDistrictId, appState, mapConfig, $);
      }
    } else if (targetHasClass('voterSlot', e)) {
      selectDistrict($, appState, Number(e.target.getAttribute('data-district-id')));
    } else if (targetHasClass('regenerateButton', e)) {
      deselectDistrict($, appState);
      generate($, mapConfig, appState);
      unhighlightButton($, appState, mapConfig);
    } else {
      deselectDistrict($, appState);
    }
  
    applyDynamicStyles($, appState, mapConfig);
    renderMap($, mapConfig, appState);
    updateCurrentHouseReport($, appState.districtCounts);
  };
};
