import {MyGovernorABI, myGovernorFactoryABI} from '../../ABIs/GovernorABI';
import {ERC20TokenABI} from '../../ABIs/TokenABI';
import {TimelockABI, timelockBYTE_CODE} from '../../ABIs/TimelockABI';
// import { projectContractBytecode } from "../bytecode";
import Web3 from 'web3';
import {newKitFromWeb3} from '@celo/contractkit';

const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
const kit = newKitFromWeb3(web3);

export async function createNewProposal(
  connector,
  governorAddr,
  tokenAddr,
  receiversAddr,
  grantAmount,
  description,
) {
  try {
    console.log('YEAH AT LEAST WE STARTED');
    let govContract = new kit.connection.web3.eth.Contract(
      MyGovernorABI,
      governorAddr,
    );
    let tokenContract = new kit.connection.web3.eth.Contract(
      ERC20TokenABI,
      tokenAddr,
    );
    // console.log('TOKEN:', tokenContract);
    let sendingAmt = web3.utils.toWei(grantAmount.toString(), 'ether');
    let transferCallData = tokenContract.methods
      .transfer(receiversAddr, sendingAmt)
      .encodeABI();
    console.log('CALLDATA:', transferCallData);
    let proposal = govContract.methods.propose(
      [tokenAddr],
      [0],
      [transferCallData],
      description,
    );
    console.log('PROPSAL DATA', proposal);
    const txObj = {
      from: connector.accounts[0],
      to: governorAddr,
      data: proposal.encodeABI(),
    };
    const txn = await connector.sendTransaction(txObj);
    console.log('Transaction:', txn);
    return txn;
  } catch (error) {
    console.log('ERROR WHILE CREATING PROPOSAL:', error);
  }
}

export async function getAllProposalList(governorAddr) {
  // event -> ProposalCreated
  // for every event --> returnValues.proposalId

  let govContract = new kit.connection.web3.eth.Contract(
    MyGovernorABI,
    governorAddr,
  );
  //   let proposal = await govContract.events.ProposalCreated({fromBlock: 0}, function(error, event){ console.log("HERE--->",error); });
  let proposal = await govContract.getPastEvents({fromBlock: 0});
  console.log('Getting proposalCREATED Events:', proposal.length);
  let proposalList = [];
  for (let index = 0; index < proposal.length; index++) {
    let currentObj = proposal[index];
    // console.log("Current Obj:", currentObj);
    if (currentObj.event == 'ProposalCreated') {
      console.log('TRUE');
      proposalList.push(currentObj);
    }
  }
  console.log('PROPOSAL LIST:', proposalList);
  return proposalList;
}

export async function getProposalState(governorAddr, proposalId) {
  try {
    let govContract = new kit.connection.web3.eth.Contract(
      MyGovernorABI,
      governorAddr,
    );
    let proposalState = await govContract.methods.state(proposalId).call();
    console.log('Proposal State: ', proposalState);
    return proposalState;
  } catch (error) {
    console.log('Error while fetching Proposal State:', error);
  }
}

export async function castVote(connector, governorAddr, proposalId, vote) {
  // 0 = Against, 1 = For, 2 = Abstain,
  try {
    let govContract = new kit.connection.web3.eth.Contract(
      MyGovernorABI,
      governorAddr,
    );
    let castVote = govContract.methods.castVote(proposalId, vote);
    console.log('P', castVote);
    const txObj = {
      from: connector.accounts[0],
      to: governorAddr,
      data: castVote.encodeABI(),
    };
    const txn = await connector.sendTransaction(txObj);
    console.log('Voting Trx:', txn);
    return txn;
  } catch (error) {
    console.log('Error while fetching Proposal State:', error);
  }
}

export async function getVoteList(governorAddr, proposalId) {
  let govContract = new kit.connection.web3.eth.Contract(
    MyGovernorABI,
    governorAddr,
  );

  let allEvents = await govContract.getPastEvents({fromBlock: 0});
  console.log('Getting voteCast Events:', allEvents.length);
  let votedList = [];
  for (let index = 0; index < allEvents.length; index++) {
    let currentObj = allEvents[index];
    // console.log("Current Obj:", currentObj);
    if (
      (currentObj.event == 'VoteCast' ||
        currentObj.event == 'castVoteWithParams') &&
      currentObj.returnValues.proposalId == proposalId
    ) {
      console.log('TRUE');
      votedList.push(currentObj);
    }
    // } elseif (currentObj.event == 'castVoteWithParams' && currentObj.returnValues.proposalId == proposalId) {
    //   console.log('TRUE');
    //   votedList.push(currentObj);
    // }
  }
  console.log('PROPOSAL LIST:', votedList);
  return votedList;
}

export async function queueProposal(
  connector,
  governorAddr,
  targets,
  values,
  calldatas,
  description,
) {
  try {
    let govContract = new kit.connection.web3.eth.Contract(
      MyGovernorABI,
      governorAddr,
    );
    let descriptionHash = web3.utils.keccak256(description);
    let queueProp = govContract.methods.propose(
      targets,
      values,
      calldatas,
      descriptionHash,
    );
    console.log('QUEUE DATA', queueProp);
    const txObj = {
      from: connector.accounts[0],
      to: governorAddr,
      data: queueProp.encodeABI(),
    };
    const txn = await connector.sendTransaction(txObj);
    console.log('Transaction:', txn);
    return txn;
  } catch (error) {
    console.log('Error while Queuing proposal');
  }
}

export async function executeProposal(
  connector,
  governorAddr,
  targets,
  values,
  calldatas,
  description,
) {
  try {
    let govContract = new kit.connection.web3.eth.Contract(
      MyGovernorABI,
      governorAddr,
    );
    let descriptionHash = web3.utils.keccak256(description);
    let executeProp = govContract.methods.execute(
      targets,
      values,
      calldatas,
      descriptionHash,
    );
    console.log('Execute DATA', executeProp);
    const txObj = {
      from: connector.accounts[0],
      to: governorAddr,
      data: executeProp.encodeABI(),
    };
    const txn = await connector.sendTransaction(txObj);
    console.log('Transaction:', txn);
    return txn;
  } catch (error) {
    console.log('Error while Executing proposal');
  }
}


//TODO: proposalVotes(proposalId): return for, against, abstain votes. --> Show final count on main screen
//DONE: castVote(proposalId, support{uint8}):
//TODO: castVoteWithParams
