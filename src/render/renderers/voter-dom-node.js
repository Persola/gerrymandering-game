import detectNeighborsOfDistrict from '../../map-logic/detect-neighbors-of-district';

export default (voter, voters, rootTotalVoters) => {
  const voterDOM = document.createElement('div');
  const classList = ['voterSlot', `district-${voter.districtId}`];
  const sameDistrictNeighbors = detectNeighborsOfDistrict(
    voter.voterId,
    voter.districtId,
    voters,
    rootTotalVoters
  );
  if (!sameDistrictNeighbors.down) { classList.push('district-border-bottom') }
  if (!sameDistrictNeighbors.right) { classList.push('district-border-right') }
  if (!sameDistrictNeighbors.up) { classList.push('district-border-top') }
  if (!sameDistrictNeighbors.left) { classList.push('district-border-left') }
  voterDOM.classList.add(...classList);
  voterDOM.setAttribute('data-voter-id', `${voter.voterId[0]}-${voter.voterId[1]}`);
  voterDOM.setAttribute('data-district-id', voter.districtId);
  const voterAffilEl = document.createElement('div');
  voterAffilEl.classList.add('voterAffiliation', voter.partyAffiliation);
  voterDOM.appendChild(voterAffilEl);
  return voterDOM;
};
