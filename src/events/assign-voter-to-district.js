import countVoters from '../count-logic/count-voters';
import checkDistrictSizes from '../map-logic/check-district-sizes';
import render from '../render/render';

const clickFoley = new Audio('./click.mp3');

export default (voterId, districtId, appState, mapConfig, $) => {
  clickFoley.play();
  appState.voters[voterId[0]][voterId[1]].districtId = districtId;
  countVoters(true, appState, mapConfig);
  checkDistrictSizes($, appState, mapConfig);
  render($, mapConfig, appState);
};
