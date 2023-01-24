// treat timelock as a treasury for crowdale -> take refrence from old test case.
// divide tokens in ower-> crowdsale -> timelock
// Goal-1
// try creating a proposal to send some tokens to another address  DONE
// Goal-2
// try creating a proposal to send some ETH to another address ---
// goal-3
// change threshold and quorum DONE
// goal-4
// add many functions in proposals ---



// import { BN, expectRevert, time } from '@openzeppelin/test-helpers';
const { time } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { assert } = require('chai');
const myGovernor = artifacts.require("MyGovernor");
const ERC20Token = artifacts.require("ERC20Token");
const Crowdsale = artifacts.require("Crowdsale");
const Timelock = artifacts.require("TimelockController");


contract("Setting MyGovernor contract", (accounts) => {
    let instance, erc, crowdsale, propose_res, timelock, govTimelock,bountyPropID;


    it("creating instance of MyGovernor,ERC20Token,CrowdSale,timelock contracts", async () => {
        instance = await myGovernor.deployed();
        erc = await ERC20Token.deployed()
        crowdsale = await Crowdsale.deployed();
        timelock = await Timelock.deployed();
        govTimelock = await instance.timelock()
        console.log("GOVERNOR Timelock", govTimelock)
        assert.equal(govTimelock, timelock.address, "Timelock Address does NOT matches ")
    })
    it("should transfer tokens to crowdsale", async () => {
        let supply = await erc.totalSupply()
        let decimals = await erc.decimals()

        amount = 50
        newSupply = web3.utils.toWei(amount.toString(), 'ether')

        console.log("ToTal Token Suppli is ", newSupply, "old supply:", supply.toString());

        await erc.transfer(crowdsale.address, newSupply.toString());
        crowdsaleBal = await erc.balanceOf(crowdsale.address);
        account0Bal = await erc.balanceOf(accounts[0]);
        console.log("Balance for Crowdsale: ", crowdsaleBal.toString());
        console.log("Balance of Account0:", account0Bal.toString());

        await erc.transfer(timelock.address, "25");

    })

    it("Account 1,2,3,4 buy 1,2,3,4 tokens and delegates themselfs ", async () => {
        for (let i = 1; i < 5; i++) {
            await crowdsale.buyTokens(accounts[i], { from: accounts[i], value: web3.utils.toWei(`${i}`, 'ether') })
            await erc.delegate(accounts[i], { from: accounts[i] })
            const votes = await erc.getVotes(accounts[i])
            // console.log("Votes for account ", i, " = votes");
            console.log("Votes for account ", i, " is ", votes.toString(), " votes");
            // assert.equal(await erc.getVotes(accounts[i]),web3.utils.toWei(`${i}`, 'ether'),`Not all TokenHolders got delegated- issue:${i}`)
        }
    })
    //TODO: Change timelock proposer to Governor contract.
    it("should change the timelock proposer", async () => {

        proposerRole = await timelock.PROPOSER_ROLE();
        govPrevProp = await timelock.hasRole(proposerRole, instance.address);
        grantRole = await timelock.grantRole(proposerRole, instance.address);
        // console.log("Granting Proposer Role:", grantRole.logs[0].event);
        // executorRole = await timelock.EXECUTOR_ROLE();
        // console.log("EXECUTOR Role:", executorRole);
        govNewProp = await timelock.hasRole(proposerRole, instance.address);
        console.log("Now does governor have proposal Role:", govNewProp);
        assert(govNewProp, true, "Govnor DOES NOT HAVE proposer role in Timelock")
    })
    //DONE: Send token collected to Timelock and check balance
    it("should send tokens to Timelock Contract", async () => {

        Acc0Bal = await erc.balanceOf(accounts[0]);
        console.log("Balance Account 0:", Acc0Bal.toString());
        await erc.transfer(timelock.address, 10, { from: accounts[0] });
        timelockBal = await erc.balanceOf(timelock.address);
        console.log("Balance Of Timelock:", timelockBal.toString(), " tokens");
    })
    it("Grant access to myGoverner to transfer ", async () => {
        // EXECUTOR_ROLE
        Executor = await timelock.EXECUTOR_ROLE();
        await timelock.grantRole(Executor, instance.address);   
        console.log("ExecutorRole assigned",await timelock.hasRole(Executor, instance.address));
    })

    // Tokens transfer to account 5 proposals
    it("should create a proposal to fund 2 Token back to erc contract", async () => {
        calldata = erc.contract.methods.transfer(accounts[5], 2).encodeABI();
        console.log("CallData",calldata);
        // calldata = erc.interface.encodeFunctionData("transfer", [accounts[5],2]); for ethers and hardhat 
        bountyProposal = await instance.propose([erc.address], [0], [calldata], "Grant 2 Token to team account5 for his latest bug bounty. ", { from: accounts[2] });
        bountyPropID = (await bountyProposal.logs[0].args.proposalId).toString();
        console.log("Bounty Proposal ID:", bountyPropID)
        // dummy transaction
        await instance.propose([accounts[9]], [0], [calldata], "Gra ", { from: accounts[4] });
    })
    it("cast vote and check DEADLINE SNAPSHORT and Votes status",async()=>{
        // Cast vote
        await instance.castVote(bountyPropID, 1, { from: accounts[1] });
        await instance.castVote(bountyPropID, 1, { from: accounts[2] });
        await instance.castVote(bountyPropID, 1, { from: accounts[3] });
        await instance.castVote(bountyPropID, 1, { from: accounts[4] });

        check = await instance.proposalDeadline(bountyPropID);
        console.log("DEADLINE", check.toString());
        checkSnap = await instance.proposalSnapshot(bountyPropID);
        console.log("SNAPSHORT", checkSnap.toString());
        quorum = await instance.quorum(checkSnap);
        console.log("quorum", quorum.toString());

        // Votes status
        proposalVotes = await instance.proposalVotes(bountyPropID);
        console.log("proposalVotes AGAINST", proposalVotes[0].toString());
        console.log("proposalVotes FOR", proposalVotes[1].toString());
        console.log("proposalVotes NEUTRAL", proposalVotes[2].toString());
    })

    it("Queue proposal and change time", async () => {
        descriptionHash = web3.utils.keccak256("Grant 2 Token to team account5 for his latest bug bounty. ");
        calldata = erc.contract.methods.transfer(accounts[5], 2).encodeABI();
        // Queue
        bountyQueue = await instance.queue([erc.address], [0], [calldata], descriptionHash, { from: accounts[2] });
        bountyQueue = (await bountyProposal.logs[0].args.proposalId).toString();
        console.log("bounty Queue:", bountyQueue);

        state = await instance.state(bountyPropID);
        console.log("state after queue", state.toString());
        // set time
        await time.increase(time.duration.seconds(10)); 
    })
    it("Execute proposal", async () => {
        descriptionHash = web3.utils.keccak256("Grant 2 Token to team account5 for his latest bug bounty. ");
        calldata = erc.contract.methods.transfer(accounts[5], 2).encodeABI();

        // Check balance before Execution
        balBefore= await erc.balanceOf(accounts[5])
        console.log("Bal of account 5 before Execution",balBefore.toString());
        
        // Execution
        bountyExecute = await instance.execute([erc.address], [0], [calldata], descriptionHash, { from: accounts[2] });
        bountyExecuteID = (await bountyProposal.logs[0].args.proposalId).toString();
        console.log("Bounty Execute:", bountyExecuteID);
        
        balAfter= await erc.balanceOf(accounts[5])
        console.log("Bal of account 5 after Execution",balAfter.toString());
        state = await instance.state(bountyPropID);

        console.log("state after execution", state.toString());

    })
})






