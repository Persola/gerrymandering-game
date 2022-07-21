import DIST_ID_TO_COLOR from '../data/dist-id-to-color';
import assignableClassName from '../data/assignable-class';

import districtStyles from './style-renderers/district-styles';
import partySplitInputBackgroundStyles from './style-renderers/party-split-input-bg-styles';
import buttonStyle from './style-renderers/button-style';

export default ($, appState, mapConfig) => {
  let styleText = '';
  for (let distId = 0; distId < mapConfig.numDistricts; distId++) {
    styleText += districtStyles(
      distId,
      appState.invalidHeadcountDistrictIds.includes(distId)
    );
  }
  styleText += `\n.party0 { background-color: ${appState.partyColors[0]}; }`;
  styleText += `\n.party1 { background-color: ${appState.partyColors[1]}; }`;
  styleText += partySplitInputBackgroundStyles(appState.partyColors);
  styleText += buttonStyle(appState.buttonHighlighted);
  styleText += `
    .${assignableClassName} {
      background-image: none;
      background-color: #${DIST_ID_TO_COLOR[appState.selectedDistrictId]};
    }
  `;

  const oldStyleEl = $('.dynamicStyleEl');
  let newStyleEl = document.createElement('style');
  newStyleEl.classList.add('dynamicStyleEl');
  newStyleEl.innerHTML = styleText;
  oldStyleEl.parentElement.replaceChild(newStyleEl, oldStyleEl);
};
