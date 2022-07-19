export default (coords, districtId, voters, rootTotalVoters) => {
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
