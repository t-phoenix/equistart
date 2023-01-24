
const { time } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { assert ,expect,chai} = require('chai');
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
    it("Proposal that should change the quorum from 10 to 5", async () => {
        calldata = instance.contract.methods.updateQuorumNumerator(5).encodeABI();
        console.log("CallData",calldata);
        // calldata = erc.interface.encodeFunctionData("transfer", [accounts[5],2]); for ethers and hardhat 
        bountyProposal = await instance.propose([instance.address], [0], [calldata], "Grant 2 Token to team account5 for his latest bug bounty. ", { from: accounts[2] });
        bountyPropID = (await bountyProposal.logs[0].args.proposalId).toString();
        console.log("Bounty Proposal ID:", bountyPropID)
        // dummy transaction
        await instance.propose([accounts[9]], [0], [calldata], "Gra ", { from: accounts[4] });
    })
    it("cast vote for quorum change",async()=>{
        // Cast vote
        await instance.castVote(bountyPropID, 1, { from: accounts[1] });
        await instance.castVote(bountyPropID, 1, { from: accounts[2] });
        await instance.castVote(bountyPropID, 1, { from: accounts[3] });
        await instance.castVote(bountyPropID, 1, { from: accounts[4] });
    })

    it("Queue proposal and change time", async () => {
        descriptionHash = web3.utils.keccak256("Grant 2 Token to team account5 for his latest bug bounty. ");
        calldata = instance.contract.methods.updateQuorumNumerator(5).encodeABI();
        // Queue
        bountyQueue = await instance.queue([instance.address], [0], [calldata], descriptionHash, { from: accounts[2] });
        bountyQueue = (await bountyProposal.logs[0].args.proposalId).toString();
        console.log("bounty Queue:", bountyQueue);
        // set time
        await time.increase(time.duration.seconds(10)); 
    })
    it("Execute proposal", async () => {
        descriptionHash = web3.utils.keccak256("Grant 2 Token to team account5 for his latest bug bounty. ");
        calldata = instance.contract.methods.updateQuorumNumerator(5).encodeABI();
        preQuorum=await instance.quorumNumerator();
        console.log("Quorum is now before proposal-",preQuorum.toString());

        
        // Execution
        bountyExecute = await instance.execute([instance.address], [0], [calldata], descriptionHash, { from: accounts[2] });
        bountyExecuteID = (await bountyProposal.logs[0].args.proposalId).toString();
        console.log("Bounty Execute:", bountyExecuteID);
        postQuorum=await instance.quorumNumerator();
        console.log("Quorum is now after proposal-",postQuorum.toString());
        assert(postQuorum,5,"Quorum not changed");
    })
    // Change voting from 4 to 2
    it("Change votingPeriod from 4 to 2 ", async () => {
        prevVotingPeriod=await instance.votingPeriod();
        assert(prevVotingPeriod,4,"Voting not 4");   
        await instance.setVotingPeriod(2);
        afterVotingPeriod=await instance.votingPeriod();
        assert(afterVotingPeriod,2,"Voting not changed to 2");   
    })
    // Change threshold from 1e18 to 2e18
    it("Change threshold from 1e18 to 2e18 ", async () => {
        prevThreshold=await instance.proposalThreshold();
        assert(prevThreshold,1000000000000000000n,"Threshold not 1e18");
        await instance.setProposalThreshold(2000000000000000000n);
        afterThreshold=await instance.proposalThreshold();
        assert(afterThreshold,2000000000000000000n,"Threshold not changed to 2e18");
    })
})






