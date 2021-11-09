// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract EquistartProject {
    address public manager;
    string public projectTitle;
    string public projectSymbol;
    string public projectDescription;
    uint public tokenSupply;
    
    constructor(string memory title, string memory symbol, string memory description, uint totalSupply, address creator) {
        manager = creator;
        projectTitle = title;
        projectSymbol = symbol;
        projectDescription = description;
        tokenSupply = totalSupply;
        
    }
    
    //TODO:
    
    
    
}