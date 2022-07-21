import renderVoter from './voter-dom-node';

export default (voters, rootTotalVoters) => {
  const mapDom = document.createElement('div');
  mapDom.id = 'map';
  mapDom.style['grid-template-rows'] = '60px '.repeat(rootTotalVoters);
  mapDom.style['grid-template-columns'] = '60px '.repeat(rootTotalVoters);

  for (const voterRow of voters) {
    for (const voter of voterRow) {
      mapDom.appendChild(renderVoter(voter, voters, rootTotalVoters));
    }
  }

  return mapDom;
};
