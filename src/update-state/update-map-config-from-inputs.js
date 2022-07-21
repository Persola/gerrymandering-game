export default ($, mapConfig) => {
  if (mapConfig.percentParty0 === undefined) {
    mapConfig.percentParty0 = 0.5;
  }

  mapConfig.percentParty0 = Number($('#percentParty0').value);
  mapConfig.numDistricts = Number($('#numDist').value);
  mapConfig.votersPerDistrict = Number($('#votersPerDist').value);  
};
