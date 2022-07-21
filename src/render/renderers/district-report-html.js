import winnerDeclarationHtml from './winner-declaration-html';

export default (distId, districtCounts) => {
  const districtCount = districtCounts[distId];
  return `
    <div class="districtTitle district-${distId}">DISTRICT</div>
    ${winnerDeclarationHtml(districtCount)}
    <div class="partyControlReport">
      <div class="partyDistrictCount party0">
        ${districtCount.party0}
      </div>
      voters
    </div>
    <div class="partyControlReport">
      <div class="partyDistrictCount">
        ${districtCount.party0 + districtCount.party1}
      </div>
      total
    </div>
    <div class="partyControlReport">
      <div class="partyDistrictCount party1">
        ${districtCount.party1}
      </div>
      voters
    </div>
  `
};
