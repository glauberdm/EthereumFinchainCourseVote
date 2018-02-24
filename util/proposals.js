var ColorDecision = artifacts.require("./ColorDecision.sol");

module.exports = function (callback) {

    console.log('############# Ethereum-Course - truffle exec - ColorDecision #############\n')

    ColorDecision.deployed().then((instance) => {
        instance.proposalsLength().then((proposalsLength) => {
            console.log('PROPOSALS LENGTH ', proposalsLength.toString())
            for (let proposalIndex = 0; proposalIndex < proposalsLength; proposalIndex++) {
                instance.proposals(proposalIndex).then((proposal) => {
                    let color = proposal[0]
                    let votes = proposal[1]
                    console.log('COLOR:', web3.toAscii(color), 'VOTES:', votes.toString())
                })
            }
        })
    })
}