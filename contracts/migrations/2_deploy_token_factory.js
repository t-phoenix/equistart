const tokenFactory = artifacts.require("TokenFactory");

module.exports = function (deployer) {
  deployer.deploy(tokenFactory);
};
