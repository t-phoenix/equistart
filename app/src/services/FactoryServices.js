import { Factory_ABI, Project_ABI } from "../ABI";
import {projectContractBytecode} from "../bytecode";
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';


const contractAddress = "0x0f9Dd41f1c1b1b72808f791A83518dDF0c1aC17f";
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = newKitFromWeb3(web3);
const FactoryContract = new kit.connection.web3.eth.Contract(Factory_ABI, contractAddress);
//console.log("Inside Factory Service:", FactoryContract);


export async function getProjectList(){
    const projectList = await FactoryContract.methods.getAllDeployedProjects().call();
    //console.log("Project List inside Services:", projectList);
    return projectList
}

export async function installProject(connector, name, symbol, initialSupply){
    console.log("starting...", connector);
    const txo = await FactoryContract.methods.createProject(name, symbol, initialSupply);
    const data = txo.encodeABI();
    console.log("data :", data);

    // const tx = await kit.connection.sendTransactionObject({from: connector.accounts[0], data: data})
    // console.log("Transaction: ", tx);

    const signed = await connector.sendTransaction( { from: connector.accounts[0], data: data});
    console.log("signature:", signed);

    // const trcxn = await kit.connection.sendSignedTransaction(signed.rawTransaction);
    // console.log("Transaction:", trcxn);

    // const tx = await kit.connection.sendTransactionObject(txo, {from: 0xe2c7618d0f07578cad8de5c05d5cbc3382b04fcd});
    // const tx2 = await connector.signTransaction(tx);
    // console.log(tx2);
    // const hash = await tx.getHash();
    // console.log("Txn Hash: ", hash);
    // const receipt = await tx.waitReceipt();
    // console.log("Receipt:", receipt);
    // return {hash,receipt};
}

export async function getProposalList(address){
    let contract = new kit.connection.web3.eth.Contract(Project_ABI, address);
    let proposalList = await contract.methods.getAllProposals().call();
    return proposalList;
}


