export default (distCounts) => {
  const count = {
    party0: 0,
    party1: 0,
    tied: 0
  };

  for (const dCount of Object.values(distCounts)) {
    if (dCount.party0 > dCount.party1) {
      count.party0 ++;
    } else if (dCount.party0 < dCount.party1) {
      count.party1 ++;
    } else { // tie
      count.tied ++;
    }
  }

  return count;
};
