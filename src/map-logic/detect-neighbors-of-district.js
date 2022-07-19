import coordsWithinDistrict from './coords-within-district';

export default (centerVoterCoords, districtId, voters, rootTotalVoters) => {
  return {
    down:      coordsWithinDistrict([centerVoterCoords[0] + 1, centerVoterCoords[1]    ], districtId, voters, rootTotalVoters),
    downRight: coordsWithinDistrict([centerVoterCoords[0] + 1, centerVoterCoords[1] + 1], districtId, voters, rootTotalVoters),
    right:     coordsWithinDistrict([centerVoterCoords[0]    , centerVoterCoords[1] + 1], districtId, voters, rootTotalVoters),
    upRight:   coordsWithinDistrict([centerVoterCoords[0] - 1, centerVoterCoords[1] + 1], districtId, voters, rootTotalVoters),
    up:        coordsWithinDistrict([centerVoterCoords[0] - 1, centerVoterCoords[1]    ], districtId, voters, rootTotalVoters),
    upLeft:    coordsWithinDistrict([centerVoterCoords[0] - 1, centerVoterCoords[1] - 1], districtId, voters, rootTotalVoters),
    left:      coordsWithinDistrict([centerVoterCoords[0]    , centerVoterCoords[1] - 1], districtId, voters, rootTotalVoters),
    downLeft:  coordsWithinDistrict([centerVoterCoords[0] + 1, centerVoterCoords[1] - 1], districtId, voters, rootTotalVoters)
  };
};
