export default (highlight) => {
  if (highlight) {
    return `
      .regenerateButton {
      	background-color: #f0c911;
        border: 2px solid #e54;
      	color: #b32;
      }
      .regenerateButton:hover {
      	background-color: #f4d415;
        border: 2px solid #e54;
        color: #c43;
      }
    `;
  } else {
    return `
      .regenerateButton {
      	background-color: #ee8;
      	border: 2px solid #995;
      	color: #b32;
      }
      .regenerateButton:hover {
      	background-color: #ff9;
        border: 2px solid #aa6;
        color: #c43;
      }
    `;
  }
};
