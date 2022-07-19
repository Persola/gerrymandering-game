export default (appState) => {
  return `
    .controlLine>input[class=party0] {
      background-color: ${appState.partyColors[0]}88;
    }

    .controlLine>input[class=party1] {
      background-color: ${appState.partyColors[1]}88;
    }
  `;
};
