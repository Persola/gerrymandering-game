export default (numDistricts, votersPerDistrict, districtCounts) => {
  const invalidHeadcountDistrictIds = [];

  for (let distId = 0; distId < numDistricts; distId++) {
    const distTotal = districtCounts[distId].party0 + districtCounts[distId].party1;

    if (Math.abs(votersPerDistrict - distTotal) > 1) {
      invalidHeadcountDistrictIds.push(distId);
    }
  }

  return invalidHeadcountDistrictIds;
};
