const Migrations = artifacts.require("Migrations");
//import {Migrations} from 'artifacts'

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
