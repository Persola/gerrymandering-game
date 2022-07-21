import overallCount from '../../count-logic/overall-count';

import winnerDeclaration from './winner-declaration-html';

export default (title, districtCounts) => {
  const results = overallCount(districtCounts);
  return `
    <div class="houseTitle">${title}</div>
    ${winnerDeclaration(results)}
    <div class="partyControlReport">
      <div class="partyDistrictCount party0">
        ${results.party0}
      </div>
      districts
    </div>
    <div class="partyControlReport">
      <div class="partyDistrictCount">
        ${results.tied}
      </div>
      tied
    </div>
    <div class="partyControlReport">
      <div class="partyDistrictCount party1">
        ${results.party1}
        </div>
        districts
    </div>
  `
};
