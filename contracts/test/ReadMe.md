# A brief description to run these test cases.
###  pre-learned technologies required
1. JavaScripts
2. Solidity 


### Technology and FrameWork used and links to install these technologies in your system
1. [Truffle](https://trufflesuite.com/docs/truffle/getting-started/installation/) 
2. [Ganache](https://trufflesuite.com/ganache/)
3. [Chai](https://www.chaijs.com/guide/installation/)
4. [Mocha](https://mochajs.org/#installation)
5. [Web3.js](https://web3js.readthedocs.io/en/v1.8.0/getting-started.html#adding-web3)
6. [openzepplin](https://docs.openzeppelin.com/contracts/4.x/)



#### Ganache- A Local BlockChainn used to test the files.
#### Truffle- It provides a development environment to test our smart contracts with the help of EVM compatibility.
#### Chai- A javaScript frame Work which helps us to check whether our contract is giving the same output as the required , required output can be custom codded.
#### Mocha- A generic JavaScript testing framework.
#### Web3.js - A javascript framework helps us to communicate between Smart Contract and our frontend.And many more functionality.

## Contract we will be dealing with-
1. ERC20Token.sol- This is used to create custom tokens.
2. CrowdSale.sol- This is used to distribute all the tokens.
3. CrowdSaleFactory.sol- It is used to create custom CrowdSale.
4. MyGovernor.sol- It is used to vote on proposals and many more functions.
5. GovernorFactory-


### Creating a basic environment-
1. Go to the direactory in which you want ur project 
2. create a **new blank folder** in that directory
3. open terminal for that project.
4. type `truffle init` and press *enter*
 *It will create a basic environment and demo contract with all the nessesary folders*



### Fork the project into ur git repo-
1. [Fork_from](https://github.com/t-phoenix/equistart)

### Start local blockchain in ur laptop.
1. open **Ganache**
2. select **QUICKSTART ETHEREUM** option. 
*This will start a local blockchain in ur lap*

**After doing these steps**



### To check if all the proccess is done perfectly.
1. open **Terminal** of project folder directory
2. type `cd contracts` and press **Enter**
3. type `truffle migrate --reset` and press **Enter** *this will deploy all the contract in your local blockchain*
**IF THE MIGRATION IS SUCCESSFULL THEN YOU HAVE DONE EVERYTHING RIGHT.**


---
=======================================================================================================================================================

NOTES: TO EDIT THIS README
1. Remove all the below content, and place it in a seperate test/notes.txt file.
2. Instead add commands to run these test files seperately and all together.
3. Mention if any configuration is needed in truffle.config
4. Mention if any configuration is needed in any of the test.js file.
5. Place a link to refer test/notes.txt file if any test case behave otherwise.
---
=======================================================================================================================================================



### Clone the project from git-
1. Go to the direactory in which you want ur project 
2. create a **new blank folder** in that directory
3. open terminal for the folder.
4. type `LINK OF YOUR CLONED REPO` and press this will make a clone of the project into ur system.


### Understanding the *2_deploy_token_factory.js*.
1. Create an instance of all the contract artifacts as- `const NAME= artifacts.require("CONTRACT_NAME");`
*artifacts are automaticly created at the time of compiling and are stored in build folder*
2. Now, `module.exports = (deployer)=> {...}` *this is the function our truffle will understand what to deploy.*
3. So, inside that function deploy the contracts like `deployer.deploy(**NAME_OF_FILE**)`.
**IMPORTENT THINGS TO REMEMBER**
- Some contract are deployed inside *then* function, it is because some contracts require some fields of another contract. For eg. In crowdSale contract there is a contructor which which requires the deployed address of ERC20Token. 
- These are some deployed.deploy command with multiple parameters given, this is because the first parameter is the solidity file and rest of the parameters are the constructor called in the Smart Contract.
- All the parameters which are given **Should be in the same order as called in Smart Contract**, or it will give an error.
- If there is any contract which uses its existence in another contract as a parameter, that contract **should be called before the parameter contract.**

## Brief on how test cases are written-
1. Create the instance of the contracts required.
2. Testing is done inside `contract("Crowdsale Test file",(accounts)=>{...}`
*here **accounts** holds all the wallet addresses which will be used later *
3. Set the contract instance to some variable 
4. Each *it* function is a seprate test.
5. *assert* is used to check the functions output with the expected output
   - *expected output is hard codded*


## Understanding the test Cases-
### 1. Crowdsale.test.js
*In this contract we transfer the tokens form ERC20Token address to CrowdSale address and testing some functions*
1. Create the instance of the contracts **ERC20Token and CrowdSale**
2. Here *token* is used for instance of *ERC20Token* and *instance* is used for *Crowdsale*
3. Inside first **it** function i.e. *transfer token to crowdsale contract*     
    - I have transfered all token from ERC20Token to CrowdSale contract because **CrowdSale** distributes these tokens only 
   -  After *transfering* function we have used *assert* to check is the transfer is successfull.
4. In 2nd *it* i.e. *Try buying tokens from crowdsale* 
    - we have used *sendTransaction* to send some eth.
    - *assert* is used to check if the transaction was success and amount of token is transfered is right or not.
    *NOTE- **sendTransaction** is not a function in the SmartContract but it is a buildIn funtion to call **recieve()** funtion which is there in contract*
=======
### 2. CrowdSaleFactory.test.js
*In this contract user can create custom crowdsale*
1. Create the instance of the contracts **ERC20Token and CrowdSaleFactory**
2. Here *erc* is used for instance of *ERC20Token* and *instance* is used for *CrowdsaleFactory*
3. Inside first **it** intialising is done.
4. Inside second **it** i.e. *creating a crowdsale using createCrowdSale function* 
    - *createCrowdSale* function is called and a custom crowdsale is made
    - *assert* is used to check if the project is created or not
5. Inside third **it** i.e. *getting all created project by using getAllDeployedProjects function*
    - *getAllDeployedProjects* function is called and all the projects should be returned
    - *assert* is used to check if the all the projects is there or not
    *NOTE- In getAllDeployedProjects funtion we have *.call()* function, so *.call()* is used to display the funtion's return data and not make a transaction*

=======
### 3. ERC20Token.test.js
*This is the contract which created the custom ERC20 tokens*
1. Creating the instance of *ERC20Token*
2. Here *token* is used for *ERC20Token*
3. Inside first **it** i.e. *transfering token(s) from owner to account1 using Transfer function*
    - *transfer* function is used to transfer 10 tokens to account1
    - *assert* is used to check is the transfer is success or not.
4. Inside second **it** i.e. *approving account1 from account0 of 10 tokens using approve function* 
  *apporove funtions is used to allow a specific account to transfer some tokens from a parent account*
    - *approve* function is used to transfer 10 tokens to account1
    - *assert* is used to check is the transfer is success or not.
5. Inside third **it** i.e. *transfering from account1 to account2 using transferFrom function*
    *transferFrom funtion is used to transfer tokens from an account1 using another account which we approve*
    - 5 token transfered to account 2 from account1 using account0 using transferFrom function
    -  *assert* is used to check is the transfer is success or not.
    -  *assert* is used to check if the total allowance is decreased or not.
6. Inside fourth **it** i.e. *increasing Allowance of account1 by 10 tokens using increaseAllowance function*
   *increaseAllowance function is used to increase the amount of allowed token transfer from an account*
   - Increased allowance to + 10 tokens using *increaseAllowance* function
   - *assert* is used to check is the total allowance is now 15.
    *alloance is 15 because in above **it** 5 tokens have been transfered so allowance decreases after it*
7. Inside fourth **it** i.e. *decrease Allowance of account1 by 10 tokens using decreaseAllowance function*
   *decreaseAllowance function is used to decrease the amount of allowed token transfer from an account*
   - Increased allowance to - 5 tokens using *decreaseAllowance* function.
   - *assert* is used to check is the total allowance is now 10.



### 4. TokenFactory.test.js
*This contract is used to create custom ERC20 tokens*
1. Creating the instance of *TokenFactory*
2. Here *instance* is used for *TokenFactory*
3. Inside first **it** i.e. *createProject*
    *createProject is used to create a custom project i.e. ERC20 token*
   - created a project with custom name, symbol, amount, account1(owner).
   - used *assert* to check if the transaction is made or not.
4. Inside second **it** i.e. *getProjectById*
    *getProjectById function is used to get the project by using project id(given at the time of creation of project)*
    - getProjectById function returns the data for project id '0'.
    - used *assert* to check if the returned value is same as expected.


### 5. MyGovernor.test.js
*This function is used to vote and create proposals and many more*
1. Creating the instance of *ERC20Token,MyGovernor and Crowdsale*.
2. Here *myGovernor* is used for *MyGovernor*
3. Inside first **it** only initialisation of contracts is done.
4. Inside second **it** i.e. *Account 1,2,3,4 buy 100k,200k,300k,400k tokens and delegates themselfs*
   - account 1,2,3,4 buy, delegate and then check if the transfer was success or not.
  *delegate function is used to approve an account to vote*

5. Inside third **it** i.e. *Creating a proposal using propose function*
    *propose function is used to make proposals*
   - proposal created using *proposal* function using random values.
   - checking if the the created proposal id is not *0* using *assert*
  *NOTE- In proposal funtion, one parameter is given as `Buffer.from('helllo','hex')` this is because in contract **byte** values are passed in hex form*
6. Inside fourth **it** i.e. *sending a vote to a proposal using casteVote*
   *casteVote function is used to give vote on any proposal using proposal id*
   - *castVote* function is used to vote for proposal id:1
   - cheching if the voting is success or not and only 1 vote is givin using *assert*
  *NOTE- more than 1 support can be given*

##### NOTE- In MyGovernor.sol file proposalThreshold() should be changed to 1e18 from 100e18 because while testing ganache dont give 400eth so with changing it to 1e18 we can check the function is success or not.
