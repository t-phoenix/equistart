const tokenFactory = artifacts.require("TokenFactory");
const ERC20Token = artifacts.require("ERC20Token");
const crowdsale = artifacts.require("Crowdsale");
const crowdsaleFactory = artifacts.require("CrowdsaleFactory");
const timelockController=artifacts.require("TimelockController");
const mygo=artifacts.require("MyGovernor");
const proposers= ["0x55be5FB979fe19184c0Ccd92679876416a84BBcE"];
const executors= ["0x313aEB130dB7879212Ce6b19c5d3B3b173b53D52"];
module.exports =  (deployer)=> {
  deployer.deploy(tokenFactory);
  deployer.deploy(ERC20Token,"Yakshesh","YAKSH",1000,"0x55be5FB979fe19184c0Ccd92679876416a84BBcE").then(()=>{
    return deployer.deploy(crowdsale,1,"0x55be5FB979fe19184c0Ccd92679876416a84BBcE",ERC20Token.address)
  })
  deployer.deploy(crowdsaleFactory);
  deployer.deploy(timelockController,11,proposers,executors).then(()=>{
     return deployer.deploy(mygo,ERC20Token.address,timelockController.address);
   })
  // console.log(ERC20Token);
};
