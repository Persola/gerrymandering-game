export default (centerVoterCoords, districtId, voters, rootTotalVoters) => {
  const coordsAreWithinDistrict = (coords) => {
    if (
      coords[0] < 0 ||
      coords[1] < 0 ||
      coords[0] >= (rootTotalVoters) ||
      coords[1] >= (rootTotalVoters)
    ) {
      return false; // out of bounds, not a voter
    }
  
    return voters[coords[0]][coords[1]].districtId === districtId;
  };

  return {
    down:      coordsAreWithinDistrict([centerVoterCoords[0] + 1, centerVoterCoords[1]    ]),
    downRight: coordsAreWithinDistrict([centerVoterCoords[0] + 1, centerVoterCoords[1] + 1]),
    right:     coordsAreWithinDistrict([centerVoterCoords[0]    , centerVoterCoords[1] + 1]),
    upRight:   coordsAreWithinDistrict([centerVoterCoords[0] - 1, centerVoterCoords[1] + 1]),
    up:        coordsAreWithinDistrict([centerVoterCoords[0] - 1, centerVoterCoords[1]    ]),
    upLeft:    coordsAreWithinDistrict([centerVoterCoords[0] - 1, centerVoterCoords[1] - 1]),
    left:      coordsAreWithinDistrict([centerVoterCoords[0]    , centerVoterCoords[1] - 1]),
    downLeft:  coordsAreWithinDistrict([centerVoterCoords[0] + 1, centerVoterCoords[1] - 1])
  };
};
