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
        await erc.transfer(crowdsale.address,(await erc.totalSupply()).toString());//transfering the tokens to crowdsale contract
    })
    it("Account 1,2,3,4 buy 100k,200k,300k,400k tokens and delegates themselfs ",async()=>{
        for (let i = 1; i < 5; i++) {
            await crowdsale.buyTokens(accounts[i],{from:accounts[i],value:web3.utils.toWei(`${i}`, 'ether')})
            await erc.delegate(accounts[i],{from:accounts[i]})
            assert.equal(await erc.getVotes(accounts[i]),web3.utils.toWei((i*1).toString(), 'ether'),`Not all TokenHolders got delegated- issue:${i}`)
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