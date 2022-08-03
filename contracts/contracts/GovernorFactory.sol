// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts@4.7.1/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "./MyGovernor.sol";

contract GovernorFactory is Ownable {

    function createTimelock(address[] calldata proposers, address[] calldata executors) public returns(address) {
        return address(new TimelockController(3600, proposers, executors));
    }

    function createGovernor(IVotes _token, TimelockController _timelock) public returns(address){
        return address(new MyGovernor(_token, _timelock));
    }
}