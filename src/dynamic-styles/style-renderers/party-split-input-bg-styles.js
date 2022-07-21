export default (partyColors) => {
  return `
    .controlLine>input[class=party0] {
      background-color: ${partyColors[0]}88;
    }

    .controlLine>input[class=party1] {
      background-color: ${partyColors[1]}88;
    }
  `;
};
