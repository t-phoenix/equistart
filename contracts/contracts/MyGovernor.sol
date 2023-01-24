// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
import "@openzeppelin/contracts/governance/utils/Votes.sol";

contract MyGovernor is Governor, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction, GovernorTimelockControl,Ownable {
    constructor(IVotes _token, TimelockController _timelock)
        Governor("MyGovernor")
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(10)
        GovernorTimelockControl(_timelock)
    {}
    function votingDelay() public pure override returns (uint256) {
        return 1; // 1 block
    }


    // function proposalThreshold() public pure override returns (uint256) {
    //     return 100e18;
    // }
    uint private DEFAULT_proposalThreshold=1e18;
    uint private DEFAULT_votingPeriod=4;
    // TODO 100 eth is not required for our project
    // user token balalnce should be equal or greater than proposalThreshold 
    // to propose  
    function proposalThreshold() public view override returns (uint256) {
        return DEFAULT_proposalThreshold;
    }
    function setProposalThreshold(uint value) public onlyOwner{
        DEFAULT_proposalThreshold=value;
    }
    function votingPeriod() public view override returns (uint256) {
        // return 300; // 5min approx 45818 //1Week
        return DEFAULT_votingPeriod;
    }
    function setVotingPeriod(uint value) public onlyOwner{
        DEFAULT_votingPeriod=value;
    }
    // function updateQuorumNumerator(uint256 newQuorumNumerator) external override(GovernorVotesQuorumFraction) onlyGovernance {
    //     // _updateQuorumNumerator(newQuorumNumerator);
    //     super.updateQuorumNumerator(newQuorumNumerator);
    // }
    // The following functions are overrides required by Solidity.

    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function state(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    function propose(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, string memory description)
        public
        override(Governor, IGovernor)
        returns (uint256)
    {
        return super.propose(targets, values, calldatas, description);
    }

    function _execute(uint256 proposalId, address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
        internal
        override(Governor, GovernorTimelockControl)
    {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
        internal
        override(Governor, GovernorTimelockControl)
        returns (uint256)
    {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}


