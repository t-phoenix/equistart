# Approach for MyGovernor 
### Deploy all the contract first.
## First test Case
1. Import MyGovernnor,ERC20Token and CrowdSale contract in the file.
2. Get instance of all the contracts 
3. Now,transfer all the token from ERC20Token contract to CrowdSale contract.
## Second test Case
1. Buy tokens from crowdsale contract to a perticular account.
2. After buying the contract, then DELAGTE the account which will make the account elegible to vote.
A test Case to check if the delegation is done perfectly
## Third test Case
Creating a proposal using propose function
1. Calling "propose" function from MyGovernor contract to make a proposal to which Token Holders can vote to.
2. Creating a dummy transaction to increase the block number 
3. Checking if the propsal is created.
## Fourth test Case
sending a vote to a proposal using casteVote
1. Calling "castVotes" function for proposal 1.
2. printing "logs" part of the transaction.
