const tokenFactory = artifacts.require("TokenFactory");
const ERC20Token = artifacts.require("ERC20Token");
const crowdsale = artifacts.require("Crowdsale");
const crowdsaleFactory = artifacts.require("CrowdsaleFactory");
const timelockController=artifacts.require("TimelockController");
const mygo=artifacts.require("MyGovernor");
const proposers= ["0xE7dD7322a076D4f80f4B3f67216ce1ac8dd3624f"];
const executors= ["0x9ea7223751CCeB92eF6b62c0187517120Da7a79E"];
const owner="0x9ea7223751CCeB92eF6b62c0187517120Da7a79E"


module.exports =  (deployer)=> {
  deployer.deploy(tokenFactory);
  deployer.deploy(ERC20Token,"Yakshesh","YAKSH",100,owner).then(()=>{
    console.log("ERC 20 TOken Contract address:", ERC20Token.address);
    return deployer.deploy(crowdsale,1,owner,ERC20Token.address)
  })
  deployer.deploy(crowdsaleFactory);
  deployer.deploy(timelockController,5,proposers,executors).then(()=>{
     return deployer.deploy(mygo,ERC20Token.address,timelockController.address);
   })
};
