const tokenFactory = artifacts.require("TokenFactory");
const ERC20Token = artifacts.require("ERC20Token");
module.exports = function (deployer) {
  deployer.deploy(tokenFactory);
  deployer.deploy(ERC20Token,"Yakshesh","YAKSH",100,"0x55be5FB979fe19184c0Ccd92679876416a84BBcE")
};
