import countFromVoters from './count-from-voters';
import playCrunchIfConvertedDistrict from './play-crunch-if-converted-district';

export default (voterAssignment, appState, mapConfig) => {
  const newCount = countFromVoters(appState.voters, mapConfig.numDistricts);
  if (voterAssignment) {
    playCrunchIfConvertedDistrict(appState.districtCounts, newCount);
  }
  appState.districtCounts = newCount;
};
