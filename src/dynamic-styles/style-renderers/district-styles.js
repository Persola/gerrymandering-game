import DIST_ID_TO_COLOR from '../../data/dist-id-to-color';

export default (districtId, invalidHeadcount) => {
  if (invalidHeadcount) {
    return `
      .district-${districtId} {
        background-image: repeating-linear-gradient(
          -45deg,
          #${DIST_ID_TO_COLOR[districtId]},
          #${DIST_ID_TO_COLOR[districtId]} 18.675px,
          #f00 18.675px,
          #f00 21.25px
        );
      }
    `;    
  } else {
    return `
      .district-${districtId} {
        background-color: #${DIST_ID_TO_COLOR[districtId]};
      }
    `;
  }
};
