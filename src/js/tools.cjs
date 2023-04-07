const EthCrypto = require('eth-crypto');
const fs = require('fs');
const Web3 = require('web3');

//path
const dir = "/home/lizz/Projects/GIT/voting-system/"
const userPath = dir + 'src/assets/user.json';
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
    /**
     * Hash the payload.
     * @param {string} payload  the payload to be hashed.
     */
    /*hashPayload: function (payload) {
        return EthCrypto.hash.keccak256(payload);
        //var hash = web3.utils.keccak256(web3.eth.abi.encodeParameters(payload));
        //return hash;
    },*/
    /**
     * Encrypt the payload with destination public key.
     * @param {string} payloadHash      Hash of payload to be signed.
     * @param {hex} sourcePrivateKey    Key used to sign.
     */
    signPayload: function (payloadHash, sourcePrivateKey) {
        return EthCrypto.sign(sourcePrivateKey, payloadHash);
    },
    /**
     * Recover the ethereum address from given signature.
     * @param {string} signature    the signature.
     * @param {string} hash         the hash pf the payload tied to the signature.
     */
    recoverAddress: function (signature, hash) {
        return EthCrypto.recover(signature, hash);
    },

//-------------------GET---------------------------------------//
    /**
     * Get user private key from ganache configuration.
     */
    getUserPrivateKey: function () {
        let obj = self.readFile(userPath);
        return obj.privateKey;
    },
    /**
     * Get user public key from ganache configuration.
     */
    getUserPublicKey: function () {
        let obj = self.readFile(userPath);
        return EthCrypto.publicKeyByPrivateKey(obj.privateKey);
    },
    /**
     * Get user address from ganache configuration.
     */
    getUserAddress: function() {
        let obj = self.readFile(userPath);
        return web3.utils.toChecksumAddress(obj.address);
    },
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