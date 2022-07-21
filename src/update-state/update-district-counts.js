import countFromVoters from '../count-logic/count-from-voters';

export default (appState, mapConfig) => {
  appState.districtCounts = countFromVoters(appState.voters, mapConfig.numDistricts);
};
