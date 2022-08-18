const {assert} = require('chai');
const ERC20Token = artifacts.require("ERC20Token");
contract("ERC20Token testing", function(accounts){
    var token;
    before(async()=>{
        token = await ERC20Token.deployed()
    });
    it("transfer function testing",async()=>{
        const res=await token.transfer(accounts[1],10,{from:accounts[0]});
        assert.equal(res.logs[0].event,"Transfer","Transfered event ")
        assert.equal(res.logs[0].args.from,accounts[0],"event account[0]")
        assert.equal(res.logs[0].args.to,accounts[1],"event account[1]")
        assert.equal(res.logs[0].args.value,10,"event value")
    })
    it("approve function testing",async()=>{
        const res=await token.approve(accounts[1],10,{from:accounts[0]});
        assert.equal(res.logs[0].event,"Approval","Approval event called")
        assert.equal(res.logs[0].args.owner,accounts[0],"event account[0]")
        assert.equal(res.logs[0].args.spender,accounts[1],"event account[1]")
        assert.equal(res.logs[0].args.value,10,"event value")
    })
    it("transferFrom function testing",async()=>{
        const res=await token.approve(accounts[1],10,{from:accounts[0]});
        assert.equal(res.logs[0].event,"Approval","Approval event called")
        assert.equal(res.logs[0].args.owner,accounts[0],"event account[0]")
        assert.equal(res.logs[0].args.spender,accounts[1],"event account[1]")
        assert.equal(res.logs[0].args.value,10,"event value")
    })
    it("increaseAllowance function testing",async()=>{
        const res=await token.increaseAllowance(accounts[1],10,{from:accounts[0]});
        assert.equal(res.logs[0].event,"Approval","Approval event called")
        assert.equal(res.logs[0].args.owner,accounts[0],"event account[0]")
        assert.equal(res.logs[0].args.spender,accounts[1],"event account[1]")
        assert.equal(res.logs[0].args.value,20,"event value")
    })
    it("decreaseAllowance function testing",async()=>{
        const res=await token.decreaseAllowance(accounts[1],10,{from:accounts[0]});
        assert.equal(res.logs[0].event,"Approval","Approval event called")
        assert.equal(res.logs[0].args.owner,accounts[0],"event account[0]")
        assert.equal(res.logs[0].args.spender,accounts[1],"event account[1]")
        assert.equal(res.logs[0].args.value,10,"event value")
    })

    // ERC20 done
})
