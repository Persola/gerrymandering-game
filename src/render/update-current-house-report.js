import renderHouseReport from './renderers/render-house-report';

export default ($, districtCounts) => {
  $('.currentHouseReport').innerHTML = renderHouseReport(
    'Gerrymandered Districts',
    districtCounts
  );
};
