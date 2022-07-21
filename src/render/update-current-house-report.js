import renderHouseReport from './renderers/house-report-html';

export default ($, districtCounts) => {
  $('.currentHouseReport').innerHTML = renderHouseReport(
    'Gerrymandered Districts',
    districtCounts
  );
};
