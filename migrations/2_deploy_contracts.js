const voting = artifacts.require("voting");
//import {voting} from 'artifacts'

module.exports = function(deployer) {
    deployer.deploy(voting);
}