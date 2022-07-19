import DIST_ID_TO_COLOR from '../data/dist-id-to-color';

import cursorStyle from './style-renderers/cursor-style';

export default ($, appState) => {
  const emptyColor = 'ffffff';
  const mainColor = (
    appState.selectedDistrictId === null
    ? emptyColor
    : DIST_ID_TO_COLOR[appState.selectedDistrictId]
  );
  const secondColor = (
    appState.hoveringOnSlot && (appState.selectedDistrictId !== appState.hoveredDistrictId)
    ? DIST_ID_TO_COLOR[appState.hoveredDistrictId]
    : null
  );

  $('body').style.cursor = cursorStyle(mainColor, secondColor);
};
