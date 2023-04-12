const EthCrypto = require('eth-crypto');
const fs = require('fs');
const Web3 = require('web3');

//path
const dir = "/home/lizz/Projects/GIT/voting-system/"
const contractPath = dir + 'src/assets/voting-contract.json';
const contractABIPath = dir + 'build/contracts/voting.json';

//web3
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

var self = module.exports = {
    /**
     * Read JSON file and return the contents of the file in object.
     * Also convert the address of Ethereum (if any) to checksum format.
     * @param {string} path     path to the JSON file.
     */
    readFile: function (path) {
        let data = fs.readFileSync(path, 'utf8');
        return JSON.parse(data);
    },
    /**
     * Construct a web3 object of the smart contract.
     * @param {string} abi       the ABI of the contract.
     * @param {string} address   the address of the deployed contract.
     */
    constructSmartContract: function (abi, address) {
        return new web3.eth.Contract(abi, address);
    },

//-------------------GET---------------------------------------//
    /**
     * Get contract address from ganache after 'truffle deploy'.
     */
    getContractAddress: function () {
        let obj = self.readFile(contractPath);
        return web3.utils.toChecksumAddress(obj.address);
    },
    /**
     * Parsing the local contract ABI from truffle.
     * in live network, the ABI can be queried from etherscan.io
     */
    getContractABI: function () {
        let obj = self.readFile(contractABIPath);
        return obj.abi;
    }
}
