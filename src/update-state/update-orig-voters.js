export default (appState) => {
  appState.origVoters.length = 0;

  appState.voters.forEach(voterCol => {
    const col = [];

    voterCol.forEach(voter => {
      col.push(Object.assign({}, voter));
    });

    appState.origVoters.push(col);
  });
};
