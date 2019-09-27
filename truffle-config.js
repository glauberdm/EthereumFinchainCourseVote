const HDWalletProvider = require("truffle-hdwallet-provider-privkey");

const privateKeyRopsten = ["86a87f6555775946810f72818625a1ff5802aa205700adb257dd047353b7e18e"];
const providerRopsten = new HDWalletProvider(privateKeyRopsten, 'https://ropsten.infura.io/9aWsXOvBnB8RM5Md8Ruj')


// const providerRopsten = new HDWalletProvider(privateKeyRopsten, 'https://ropsten.infura.io/v3/c02b48e1b12e4511bfb0378b694a9262')

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      network_id: 3, // official id of the ropsten network
      gasPrice: 10000000000, //(wei = 4 gwei) Default is 100000000000 (100 Shannon/gwei)
      gas: 4600000, //Default is 4712388
      provider: providerRopsten
    }
  },
  compilers: {
    solc: {
      // version: "/Users/glauber/.nvm/versions/node/v12.10.0/lib/node_modules/solc",   // Any published image name
      version: "0.4.20",
      docker: true
    }
  }
};