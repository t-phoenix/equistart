const {assert} = require("chai");
const myGovernor = artifacts.require("MyGovernor");
const ERC20Token = artifacts.require("ERC20Token");
const Crowdsale = artifacts.require("Crowdsale");
const Timelock = artifacts.require("TimelockController");
contract("testing MyGovernor contract",(accounts)=>{
    let instance,erc,crowdsale,propose_res;
    it("creating instance of MyGovernor,ERC20Token,CrowdSale,timelock contracts",async()=>{
        instance =await myGovernor.deployed();
        erc= await ERC20Token.deployed()
        crowdsale= await Crowdsale.deployed();
        timelock = await Timelock.deployed();
        // console.log("CROWDSALE INSTANCE:", timelock.address);
        await erc.transfer(crowdsale.address,(await erc.totalSupply()).toString());//transfering all the tokens to crowdsale contract
    })
    it("Account 1,2,3,4 buy 1,2,3,4 tokens and delegates themselfs ",async()=>{
        for (let i = 1; i < 5; i++) {
            await crowdsale.buyTokens(accounts[i],{from:accounts[i],value:web3.utils.toWei(`${i}`, 'ether')})
            await erc.delegate(accounts[i],{from:accounts[i]})
            assert.equal(await erc.getVotes(accounts[i]),web3.utils.toWei(`${i}`, 'ether'),`Not all TokenHolders got delegated- issue:${i}`)
        }
    })
    //DONE: Send ETH collected to Timelock and check balance
    it("Should send 10 ETH to timelock Contract", async()=>{
        // timelockAddr = await instance.timelock()
        // console.log("Timelock Address:", timelockAddr);
        transferFunds = await timelock.send(10, {from:accounts[0]});
        timelockBalance = await web3.eth.getBalance(timelockAddr)
        // console.log("TImelock ETH balance:", timelockBalance);
        assert.equal(timelockBalance, 10, "Balance not 10 ETH");
    })
    //TODO: Create a real proposal transfering funds to some address
    
    it("Creating a proposal using propose function",async()=>{
        const target = [erc.address]
        propose_res=await instance.propose(["0x313aEB130dB7879212Ce6b19c5d3B3b173b53D52"],[1],[Buffer.from('hello','hex')],"discription",{from:accounts[1]})
        //dummy transaction 
        await instance.propose(["0x9CEE7AefA7Eda217F7880B6aA04625f5683f07a6"],[10],[Buffer.from('helllo','hex')],"discption",{from:accounts[1]})
        // console.log("PROPOSAL LOG ", propose_res.logs, "Proposal ID:",propose_res.logs[0].args.proposalId.toString())
        assert.notEqual((propose_res.logs[0].args.proposalId).toString(),'0','proposal created')
    })

    it("sending a vote to a proposal using casteVote",async()=>{
        const castVote_res= await instance.castVote((propose_res.logs[0].args.proposalId).toString(),1);
        // console.log("VOTE RESULT:", castVote_res)
        assert.equal((castVote_res.logs[0].args.support).toString(),1,"voted")
    })
    it("send multiple votes", async()=>{
        const castVote2 = await instance.castVote((propose_res.logs[0].args.proposalId).toString(), 0, {from:accounts[2]});
        const castVote3 = await instance.castVote((propose_res.logs[0].args.proposalId).toString(), 2, {from:accounts[3]});
        const castVote4 = await instance.castVote((propose_res.logs[0].args.proposalId).toString(), 0, {from:accounts[4]});
        const proposalVotes = await instance.proposalVotes((propose_res.logs[0].args.proposalId).toString());
        console.log("PROPOSAL VOTES: ", proposalVotes.againstVotes.toString());
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



