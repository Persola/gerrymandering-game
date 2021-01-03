// configurable
NUM_DISTRICTS = 10;
VOTERS_PER_DISTRICT = 11;
// fixed
PARTIES = ['dem', 'rep'];
NO_REP = 'no_representative'
VOTE_WITH_PARTY_RATE = 0.9;

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const districts = {}

// DATA GENERATION/ALTERATION

const generate = () => {
  for (i = 1; i <= NUM_DISTRICTS; i++) {
    districts[i] = {
      id: i,
      representative: NO_REP,
      voters: []
    };
  }
  for (district of Object.values(districts)) {
    for (j = 1; j <= VOTERS_PER_DISTRICT; j++) {
      const partyAffiliation = Math.random() > 0.5 ? PARTIES[0] : PARTIES[1]
      district.voters.push({id: j, partyAffiliation: partyAffiliation});
    }
  }
};

// RENDER

const render = () => {
  $('#sim').innerHTML = '';
  for (districtData of Object.values(districts)) {
    $('#sim').appendChild(renderDistrict(districtData));    
  }
};

const renderDistrict = (districtData) => {
  const districtDOM = document.createElement('div');
  districtDOM.setAttribute('class', 'district');
  districtDOM.appendChild(renderRepresentative(districtData.representative));
  for (voterData of districtData.voters) {
    districtDOM.appendChild(renderVoter(voterData));
  }
  return districtDOM;
};

const renderRepresentative = (repData) => {
  if(PARTIES.indexOf(repData) === -1 && repData !== NO_REP) {
    throw('bad rep')
  }

  const repDOM = document.createElement('div');
  repDOM.setAttribute('class', 'representative');
  repDOM.classList.add(repData);
  return repDOM;
};

const renderVoter = (voterData) => {
  if(PARTIES.indexOf(voterData.partyAffiliation) === -1) { throw('bad affiliation') }

  const voterDOM = document.createElement('div');
  voterDOM.setAttribute('class', 'voter');
  voterDOM.classList.add(voterData.partyAffiliation);
  if (voterData.lastVoted === 'dem') {
    voterDOM.classList.add('lastVotedDem');    
  } else if (voterData.lastVoted === 'rep') {
    voterDOM.classList.add('lastVotedRep');    
  } else {
    voterDOM.classList.add('noLastVote');   
  }
  return voterDOM;
};

// RUN SIMULATION EVENTS

const perDistrict = (lambda) => {
  for (districtData of Object.values(districts)) {
    lambda(districtData);
  }
};

const perVoter = (districtData, lambda) => {
  for (voterData of districtData.voters) {
    lambda(voterData);
  }
};

const runGeneral = () => {
  perDistrict((districtData) => {
    const districtVotes = {'dem': 0, 'rep': 0};
    perVoter(districtData, (voterData) => {
      const isDem = voterData.partyAffiliation === 'dem';
      const votesWithParty = Math.random() < VOTE_WITH_PARTY_RATE;
      if (isDem === votesWithParty) {
        districtVotes['dem'] ++;
        voterData.lastVoted = 'dem';
      } else {
        districtVotes['rep'] ++;
        voterData.lastVoted = 'rep';
      }
    })

    if (districtVotes['dem'] === districtVotes['rep']) {throw 'tie!'};
    if (districtVotes['dem'] > districtVotes['rep']) {
      districtData.representative = 'dem';
    } else {
      districtData.representative = 'rep';    
    }
  });
  
  render();
};

const clearReps = () => {
  perDistrict((districtData) => {
    districtData.representative = NO_REP;
  });
  render();
};

// KICKOFF

window.onload = (e) => {
  generate();
  render();
};
