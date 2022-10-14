const {assert} = require("chai");
const myGovernor = artifacts.require("MyGovernor");
const ERC20Token = artifacts.require("ERC20Token");
const Crowdsale = artifacts.require("Crowdsale");
contract("testing MyGovernor contract",(accounts)=>{
    let instance,erc,crowdsale,propose_res;
    it("creating instance of MyGovernor,ERC20Token,CrowdSale contracts",async()=>{
        instance =await myGovernor.deployed();
        erc= await ERC20Token.deployed()
        crowdsale= await Crowdsale.deployed()
        await erc.transfer(crowdsale.address,(await erc.totalSupply()).toString());//transfering all the tokens to crowdsale contract
    })
    it("Account 1,2,3,4 buy 1,2,3,4 tokens and delegates themselfs ",async()=>{
        for (let i = 1; i < 5; i++) {
            await crowdsale.buyTokens(accounts[i],{from:accounts[i],value:web3.utils.toWei(`${i}`, 'ether')})
            await erc.delegate(accounts[i],{from:accounts[i]})
            assert.equal(await erc.getVotes(accounts[i]),web3.utils.toWei(`${i}`, 'ether'),`Not all TokenHolders got delegated- issue:${i}`)
        }
    })
    it("Creating a proposal using propose function",async()=>{
        propose_res=await instance.propose(["0x313aEB130dB7879212Ce6b19c5d3B3b173b53D52"],[1],[Buffer.from('hello','hex')],"discription",{from:accounts[1]})
        //dummy transaction 
        await instance.propose(["0x9CEE7AefA7Eda217F7880B6aA04625f5683f07a6"],[10],[Buffer.from('helllo','hex')],"discption",{from:accounts[1]})
        assert.notEqual((propose_res.logs[0].args.proposalId).toString(),'0','proposal created')
    })
    it("sending a vote to a proposal using casteVote",async()=>{
        const castVote_res= await instance.castVote((propose_res.logs[0].args.proposalId).toString(),1);
        assert.equal((castVote_res.logs[0].args.support).toString(),1,"voted")
    })
})



//Deployments should be in 'before' not in 'it' functions
//Also tests should be clubbed and to run different flows beforeEach function can be used to deploy afresh

//No mention on timelock and ERC20 token when deploying Governor?
//DId the Governor contract even deployed correctly
//Timelock contract has 3 Access controls:
//Proposer: Governor Instance should be granted this role
//Executor: anyone (address(0)), or Governor instance (incase it's time sensitive)
//Admin: initially granted automatically to deployer and timelock itself. Deployer must renounce

//Openzeppelin Ref: https://docs.openzeppelin.com/contracts/4.x/governance#timelock

//Timelock contructor:
//Proposer, Executor (Representation):  ["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db"]  --> Address[]
//Check using hasRole function: role: {TIMELOCK_ADMIN_ROLE, PROPOSER_ROLE, EXECUTOR_ROLE}, address --> returns bool

//Deploy governor contract with timelock and ERC20.

//Add Governor as proposer in timelock contract.
//Transfer funds to Governor timelock (both our ERC20 and ETH).
//Follow proposal Lifecycle:
//Can create multiple bunch of test cases, considering diiferent flow for different proposals.
//Example1: proposal to grant ERC20 token to a team/individual for some Marketing work (how the team address will divide funds?)
//Example2: proposal to create a new crowdsale to raise more funds.
//Refer doc: https://docs.openzeppelin.com/contracts/4.x/governance#proposal_lifecycle



