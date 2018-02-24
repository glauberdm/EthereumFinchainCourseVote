var ColorDecision = artifacts.require("./ColorDecision.sol");

module.exports = function (deployer) {
    var colors = ['red', 'green', 'blue']
    deployer.deploy(ColorDecision, colors);
};