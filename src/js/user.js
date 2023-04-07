/*const prompts = require('prompts');
const chalk = require('chalk');
const tools = require('./tools');
const Web3 = require('web3');*/
import prompts from "prompts";
import chalk from 'chalk'
import tools from './tools.cjs'
import Web3 from 'web3'

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const questions = [{
  type: 'select',
  name: 'value',
  message: 'What do you want to do?',
  choices: [{
    title: 'Sign a code',
    value: 1
  }]
}, {
  type: prev => prev == 1 ? 'text' : null,
  name: 'message',
  message: 'Okay, what message do you want to sign?',
  validate: message => message == '' ? 'Put your code' : true
}];

(async () => {
  const response = await prompts(questions);

  // sign message
  if (response["value"] == 1) {
    let message = response["message"];

    //let messageHash = tools.hashPayload(message);
    let messageHash = web3.utils.keccak256(web3.eth.abi.encodeParameters(["int"],[message]));
    console.log(messageHash);
    let signature = tools.signPayload(messageHash,tools.getUserPrivateKey());
    
    console.log('Here is the signature of your message:');
    console.log(chalk.black.bgYellow(signature));
  }
})();