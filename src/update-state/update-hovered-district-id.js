export default (appState, hoveredVoter) => {
  const thisMoveHoveredDistrictId = (
    hoveredVoter
    ? Number(hoveredVoter.className.match(/district\-(\d+)/)[1])
    : null
  );

  appState.hoveredDistrictId = thisMoveHoveredDistrictId;
};
