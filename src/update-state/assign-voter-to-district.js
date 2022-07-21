import countFromVoters from '../count-logic/count-from-voters';
import playCrunchIfConvertedDistrict from '../count-logic/play-crunch-if-converted-district';
import updateInvalidDistricts from './update-invalid-districts';

const clickFoley = new Audio('./click.mp3');

export default (voterId, districtId, appState, mapConfig, $) => {
  clickFoley.play();
  appState.voters[voterId[0]][voterId[1]].districtId = districtId;

  const newCount = countFromVoters(appState.voters, mapConfig.numDistricts);
  playCrunchIfConvertedDistrict(appState.districtCounts, newCount);
  appState.districtCounts = newCount;

  updateInvalidDistricts(appState, mapConfig);
};
