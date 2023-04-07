// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract voting {
  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }

  struct Voter {
    bool voted; // true when voter has voted
    bool validated; //true when voter has registered and passed verification process
  }

  mapping(address => Voter) public voters;
  mapping(uint => Candidate) public candidates;

  uint public candCounter;
  uint public voterCounter;

  constructor() {
    addCandidate("Contestant 1"); //testing
    addCandidate("Contestant 2"); //testing
  }

  event votedEvent(uint indexed _candId);
  event registrationSuccess(address _voterAddr);

  modifier voterMustNotExist(address _voter) {
    require(!voters[_voter].validated,"voter already registered");
    _;
  }

  modifier voterMustExist(address _voter) {
    require(voters[_voter].validated,"voter registered in the system");
    _;
  }

  function addCandidate (string memory _name) private {
    candCounter++;
    candidates[candCounter] = Candidate(candCounter,_name,0);
  }

  function registerVoter(address addr) public voterMustNotExist(msg.sender) {
    voterCounter++;
    voters[addr] = Voter(false,true);

    emit registrationSuccess(addr);
  }

  //login
  function getVoter(address _voter) public voterMustExist(msg.sender) view returns(bool) {
    //check voter is registered before
    if (_voter == msg.sender && voters[_voter].validated) {
      return(true);
    } else {
      return(false);
    }
  }

  function vote (uint _candId) public {
    //require a registered and valid voters
    require(voters[msg.sender].validated);
    //require voters haven't voted before
    require(!voters[msg.sender].voted);
    //vote a valid candidate
    require(_candId > 0 && _candId <= candCounter);

    voters[msg.sender].voted = true;
    candidates[_candId].voteCount++;

    emit votedEvent(_candId);
  }
}
