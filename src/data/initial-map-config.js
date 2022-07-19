export default {
  percentParty0: 0.5,
  numDistricts: 9,
  votersPerDistrict: 25,
  rootNumDistricts: function() {
    return this.numDistricts**(1/2)
  },
  rootNumVotersPerDistrict: function() {
    return this.votersPerDistrict**(1/2)
  },
  rootTotalVoters: function() {
    return this.rootNumDistricts() * this.rootNumVotersPerDistrict()
  },
  timerInterval: setInterval(() => null, 100) // dummy to start
};
