export default (districtCount) => {
  if (districtCount.party0 > districtCount.party1) {
    return 'party0';
  }

  if (districtCount.party0 < districtCount.party1) {
    return 'party1';
  }

  if (districtCount.party0 !== districtCount.party1) {
    throw error("what's up with this district count?");
  }

  return 'tie';
};
