const {expect,assert} = require('chai');
const ERC20Token = artifacts.require("ERC20Token");
contract("ERC20Token", function(accounts){
    var token;
    before(async()=>{
        token = await ERC20Token.deployed()
    });
    it("transfer",async()=>{
        const res=await token.transfer(accounts[1],10,{from:accounts[0]});
        // console.log(res.logs);
        assert.notEqual(res.tx,0x00,"transaction made");
        assert.equal(res.logs.length,1,"1 event emmited")
        assert.equal(res.logs[0].event,"Transfer","event done")
        assert.equal(res.logs[0].args.from,accounts[0],"event account[0]")
        assert.equal(res.logs[0].args.to,accounts[1],"event account[1]")
        assert.equal(res.logs[0].args.value,10,"event value")
    })
    it("approve",async()=>{
        const res=await token.approve(accounts[1],10,{from:accounts[0]});
        // console.log(res);
        assert.notEqual(res.tx,0x00,"transaction made");
        assert.equal(res.logs.length,1,"1 event emmited")
        assert.equal(res.logs[0].event,"Approval","event done")
        assert.equal(res.logs[0].args.owner,accounts[0],"event account[0]")
        assert.equal(res.logs[0].args.spender,accounts[1],"event account[1]")
        assert.equal(res.logs[0].args.value,10,"event value")
    })
    it("transferFrom",async()=>{
        const res=await token.approve(accounts[1],10,{from:accounts[0]});
        // console.log(res.logs);
        assert.notEqual(res.tx,0x00,"transaction made");
        assert.equal(res.logs.length,1,"1 event emmited")
        assert.equal(res.logs[0].event,"Approval","event done")
        assert.equal(res.logs[0].args.owner,accounts[0],"event account[0]")
        assert.equal(res.logs[0].args.spender,accounts[1],"event account[1]")
        assert.equal(res.logs[0].args.value,10,"event value")
    })
    it("increaseAllowance",async()=>{
        const res=await token.increaseAllowance(accounts[1],10,{from:accounts[0]});
        // console.log(res.logs);
        assert.notEqual(res.tx,0x00,"transaction made");
        assert.equal(res.logs.length,1,"1 event emmited")
        assert.equal(res.logs[0].event,"Approval","event done")
        assert.equal(res.logs[0].args.owner,accounts[0],"event account[0]")
        assert.equal(res.logs[0].args.spender,accounts[1],"event account[1]")
        assert.equal(res.logs[0].args.value,20,"event value")
    })
    it("decreaseAllowance",async()=>{
        const res=await token.decreaseAllowance(accounts[1],10,{from:accounts[0]});
        // console.log(res.logs);
        assert.notEqual(res.tx,0x00,"transaction made");
        assert.equal(res.logs.length,1,"1 event emmited")
        assert.equal(res.logs[0].event,"Approval","event done")
        assert.equal(res.logs[0].args.owner,accounts[0],"event account[0]")
        assert.equal(res.logs[0].args.spender,accounts[1],"event account[1]")
        assert.equal(res.logs[0].args.value,10,"event value")
    })

    // ERC20 done
})
