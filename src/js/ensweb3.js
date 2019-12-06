const Web3 = require("web3")
var provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/9aWsXOvBnB8RM5Md8Ruj');
var web3 = new Web3(provider);
var ens = web3.eth.ens;
ens.getAddress('vote.fiap-mba-blockchain-2019.eth').then((address) => {
    console.log("vote.fiap-mba-blockchain-2019.eth", address);
});