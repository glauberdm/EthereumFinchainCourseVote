const Web3 = require("web3")
const ENS = require('ethereum-ens')
const provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/9aWsXOvBnB8RM5Md8Ruj')
const ens = new ENS(provider)
ens.resolver('vote.fiap-mba-blockchain-2019.eth').addr().then(function(addr) {
    console.log("vote.fiap-mba-blockchain-2019.eth", addr);
});