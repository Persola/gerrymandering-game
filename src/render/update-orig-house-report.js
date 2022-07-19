import renderHouseReport from './renderers/render-house-report';

export default ($, origVoters, districtCounts) => {
  $('.origHouseReport').innerHTML = renderHouseReport(
    'State - Original Districts',
    districtCounts
  );
};
