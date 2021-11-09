// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

//Check openzeppelin for learning more about input variables like Name, Token Amount, etc. 
//https://docs.openzeppelin.com/contracts/4.x/wizard

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "./EquistartProject.sol";

contract EquistartFactory {
    address[] public deployedProjects;
    
    function createProject(string memory name, string memory symbol, string memory description, uint totalSupply) public {
        address newProject = address(new EquistartProject(name, symbol, description, totalSupply, msg.sender));
        deployedProjects.push(newProject);
    }
    
    function getDeployedProjects () public view returns (address[] memory){
        return deployedProjects;
    }
}

