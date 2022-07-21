import renderHouseReport from './renderers/house-report-html';

export default ($, origVoters, districtCounts) => {
  $('.origHouseReport').innerHTML = renderHouseReport(
    'State - Original Districts',
    districtCounts
  );
};
