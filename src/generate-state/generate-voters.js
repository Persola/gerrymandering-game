import shuffle from '../util/shuffle';

import assignInitialDistrictId from './assign-initial-district-id';

export default (voters, mapConfig, rootTotalVoters, rootNumDistricts, rootNumVotersPerDistrict) => {
  let totalVoters = rootTotalVoters**2;
  let numParty0Voters = Math.floor(totalVoters * mapConfig.percentParty0);
  let numParty1Voters = totalVoters - numParty0Voters;
  let voterAffiliations = [];
  for (let party0Ind = 0; party0Ind < numParty0Voters; party0Ind++) {
    voterAffiliations.push('party0');
  }
  for (let party1Ind = 0; party1Ind < numParty1Voters; party1Ind++) {
    voterAffiliations.push('party1');
  }
  voterAffiliations = shuffle(voterAffiliations);

  voters.length = 0;

  for (let mapYCoord = 0; mapYCoord < rootTotalVoters; mapYCoord++) {
    voters[mapYCoord] = [];

    for (let mapXCoord = 0; mapXCoord < rootTotalVoters; mapXCoord++) {
      voters[mapYCoord][mapXCoord] = {
        voterId: [mapYCoord, mapXCoord],
        partyAffiliation: voterAffiliations.pop(),
        districtId: assignInitialDistrictId(
          mapYCoord,
          mapXCoord,
          rootNumDistricts,
          rootNumVotersPerDistrict
        )
      };
    }
  }

  return voters;
};

