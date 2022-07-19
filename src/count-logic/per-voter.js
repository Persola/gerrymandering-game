export default (voters, lambda) => {
  for (const voterRow of voters) {
    for (const voter of voterRow) {
      lambda(voter);
    }
  }
};
