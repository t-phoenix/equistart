const tokenFactory = artifacts.require("TokenFactory");
const ERC20Token = artifacts.require("ERC20Token");
const crowdsale = artifacts.require("Crowdsale");
const crowdsaleFactory = artifacts.require("CrowdsaleFactory");
module.exports = function (deployer) {
  deployer.deploy(tokenFactory);
  deployer.deploy(ERC20Token,"Yakshesh","YAKSH",10,"0x55be5FB979fe19184c0Ccd92679876416a84BBcE").then(()=>{
    return deployer.deploy(crowdsale,1,"0x55be5FB979fe19184c0Ccd92679876416a84BBcE",ERC20Token.address)
  })
  deployer.deploy(crowdsaleFactory);
};
