export default (x, y, rootNumDistricts, rootNumVotersPerDistrict) => {
  // assigns voters to their initial districts
  for (let xDistCoord = 0; xDistCoord < rootNumDistricts; xDistCoord++) {
    for (let yDistCoord = 0; yDistCoord < rootNumDistricts; yDistCoord++) {
      if (
        (x >= rootNumVotersPerDistrict * xDistCoord) &&
        (x < rootNumVotersPerDistrict * (xDistCoord + 1)) &&
        (y >= rootNumVotersPerDistrict * yDistCoord) &&
        (y < rootNumVotersPerDistrict * (yDistCoord + 1))
      ) {
        return (xDistCoord * rootNumDistricts) + yDistCoord;
      }
    }
  }
  TypeError('voter coords have no corresponding district!?');
};
