const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKeyRopsten = ["86a87f6555775946810f72818625a1ff5802aa205700adb257dd047353b7e18e"];
const provider = new HDWalletProvider(privateKeyRopsten, 'https://ropsten.infura.io/9aWsXOvBnB8RM5Md8Ruj')

const Web3 = require("web3")
var web3 = new Web3(provider);
var ens = web3.eth.ens;
ens.getAddress('vote.fiap-mba-blockchain-2019.eth').then((address) => {
    console.log("vote.fiap-mba-blockchain-2019.eth", address);
});
