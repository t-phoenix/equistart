// treat timelock as a treasury for crowdale -> take refrence from old test case.
// divide tokens in ower-> crowdsale -> timelock
// Goal-1
// try creating a proposal to send some tokens to another address 
// Goal-2
// try creating a proposal to send some ETH to another address 
// goal-3
// change threshold
// goal-4
// add many functions in proposals



// import { BN, expectRevert, time } from '@openzeppelin/test-helpers';
const { time,send } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { assert } = require('chai');
const myGovernor = artifacts.require("MyGovernor");
const ERC20Token = artifacts.require("ERC20Token");
const Crowdsale = artifacts.require("Crowdsale");
const Timelock = artifacts.require("TimelockController");


contract("Setting MyGovernor contract", (accounts) => {
    let instance, erc, crowdsale, propose_res, timelock, govTimelock,bountyPropID;
    it("test",async()=>{
        calldata = send.ether(accounts[0],accounts[3],"1000000");
        calldata2=calldata.encodeABI();
        console.log(calldata2);
    })
})






