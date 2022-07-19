import resultFromDistrictCount from './result-from-district-count';

const crunchFoley = new Audio('./crunch.m4a');

export default (oldCount, newCount) => {
  let districtChanged = false;

  for (const distId of Object.keys(newCount)) {
    if (
      resultFromDistrictCount(oldCount[distId])
      !== resultFromDistrictCount(newCount[distId])
    ) {
      districtChanged = true;
    }
  }

  if (districtChanged) { crunchFoley.play(); };
};
