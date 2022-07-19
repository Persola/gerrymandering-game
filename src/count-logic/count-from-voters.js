import perVoter from './per-voter';

export default (voters, numDistricts) => {
  const counts = {};
  for (let distId = 0; distId < numDistricts; distId++) {
    counts[distId] = {};
    counts[distId].party0 = 0;
    counts[distId].party1 = 0;
  }
  perVoter(voters, (voter) => {
    counts[voter.districtId][voter.partyAffiliation] += 1;
  });

  return counts;
};
