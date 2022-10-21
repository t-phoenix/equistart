const tokenFactory = artifacts.require("TokenFactory");
const ERC20Token = artifacts.require("ERC20Token");
const crowdsale = artifacts.require("Crowdsale");
const crowdsaleFactory = artifacts.require("CrowdsaleFactory");
const timelockController=artifacts.require("TimelockController");
const mygo=artifacts.require("MyGovernor");
const proposers= ["0x5924a98CEE7f4a9360Dfc848eFf55CAC2591Ca2A"];
const executors= ["0x451d77133Ce919aBAbd4E303B223E82ea5185154"];
const owner="0x35539baD7929a07772EE0cb101e7778143A21FE9"


module.exports =  (deployer)=> {
  deployer.deploy(tokenFactory);
  deployer.deploy(ERC20Token,"Yakshesh","YAKSH",100,owner).then(()=>{
    return deployer.deploy(crowdsale,1,owner,ERC20Token.address)
  })
  deployer.deploy(crowdsaleFactory);
  deployer.deploy(timelockController,11,proposers,executors).then(()=>{
     return deployer.deploy(mygo,ERC20Token.address,timelockController.address);
   })
};
