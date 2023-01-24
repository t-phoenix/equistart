
const { time } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { assert ,expect,chai} = require('chai');
const myGovernor = artifacts.require("MyGovernor");
const ERC20Token = artifacts.require("ERC20Token");
const Crowdsale = artifacts.require("Crowdsale");
const Timelock = artifacts.require("TimelockController");


contract("Setting MyGovernor contract", (accounts) => {
    let instance, erc, crowdsale, propose_res, timelock, govTimelock,bountyPropID,bountyPropID_2;


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
    it("change Owner from account[0] to governance",async()=>{
        prevOwner =await erc.owner();
        console.log("prev owner",prevOwner);
        await erc.transferOwnership(timelock.address,{from:accounts[0]})
        newOwner =await erc.owner();
        console.log("newOwner",newOwner);
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
    it("Should send 10 ETH to timelock Contract", async()=>{
        // timelockAddr = await instance.timelock()
        // console.log("Timelock Address:", timelockAddr);
        transferFunds = await timelock.send(10, {from:accounts[0]});
        timelockBalance = await web3.eth.getBalance(timelock.address)
        console.log("Timelock ETH balance:", timelockBalance);

        assert.equal(timelockBalance, 10, "Balance not 10 ETH");

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
    it("Proposal that should mint 10e18 tokens", async () => {
        calldata = erc.contract.methods.mint(web3.utils.toWei("10", 'ether')).encodeABI();
        calldata2 = erc.contract.methods.mintFor(accounts[0],web3.utils.toWei("10", 'ether')).encodeABI();
        calldata3 = erc.contract.methods.burn(web3.utils.toWei("5", 'ether')).encodeABI();

        console.log("CallData",calldata);
        // calldata = erc.interface.encodeFunctionData("transfer", [accounts[5],2]); for ethers and hardhat 
        bountyProposal = await instance.propose([erc.address,erc.address], [0,0], [calldata,calldata3], "mint 10 tokens", { from: accounts[4] });
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
        descriptionHash = web3.utils.keccak256("mint 10 tokens");
        calldata = erc.contract.methods.mint(web3.utils.toWei("10", 'ether')).encodeABI();
        calldata2 = erc.contract.methods.mintFor(accounts[0],web3.utils.toWei("10", 'ether')).encodeABI();    
        calldata3 = erc.contract.methods.burn(web3.utils.toWei("5", 'ether')).encodeABI();
    
        // Queue
        await instance.queue([erc.address,erc.address], [0,0], [calldata,calldata3], descriptionHash, { from: accounts[4] });
        // set time
        await time.increase(time.duration.seconds(10)); 
    })
    it("Execute proposal", async () => {
        descriptionHash = web3.utils.keccak256("mint 10 tokens");
        calldata = erc.contract.methods.mint(web3.utils.toWei("10", 'ether')).encodeABI();
        calldata2 = erc.contract.methods.mintFor(accounts[0],web3.utils.toWei("10", 'ether')).encodeABI();     
        calldata3 = erc.contract.methods.burn(web3.utils.toWei("5", 'ether')).encodeABI();
        // Execution
        bountyExecute = await instance.execute([erc.address,erc.address], [0,0], [calldata,calldata3], descriptionHash, { from: accounts[4] });
        bountyExecuteID = (await bountyProposal.logs[0].args.proposalId).toString();
        console.log("Bounty Execute:", bountyExecuteID);

        console.log("afterBal of account 0",(await erc.balanceOf(accounts[0])).toString());
        console.log("afterBal of timelock",(await erc.balanceOf(timelock.address)).toString());
        console.log("total suppy",(await erc.totalSupply()).toString());
        assert.equal((await erc.balanceOf(accounts[0])).toString(),49999999999999999965n,"token failed to mint account0")
        assert.equal((await erc.balanceOf(timelock.address)).toString(),5000000000000000035n,"token failed to mint timelock")
        assert.equal((await erc.totalSupply()).toString(),105000000000000000000n,"failed to increase totalsuppy")
    })

})





