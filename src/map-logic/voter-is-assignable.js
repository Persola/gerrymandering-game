import selectedDistrictWouldBeLocallyConnected from './selected-district-would-be-locally-connected';
import replacedDistrictWouldBeLocallyConnected from './replaced-district-would-be-locally-connected';

export default (voterId, selectedDistrictId, voterOldDistrictId, appState, mapConfig) => {
  if (voterOldDistrictId === selectedDistrictId) {
    return false;
  }

  return (
    typeof selectedDistrictId === 'number' // a district is selected
    && selectedDistrictWouldBeLocallyConnected(voterId, selectedDistrictId, appState, mapConfig)
    && replacedDistrictWouldBeLocallyConnected(voterId, voterOldDistrictId, appState, mapConfig)
  )
};
