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
    let transferCallData = tokenContract.methods
      .transfer(receiversAddr, grantAmount)
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


//TODO: proposalVotes(proposalId): return for, against, abstain votes.
//TODO: castVote(proposalId, support{uint8}): 
