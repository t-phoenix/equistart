// import { Factory_ABI, Project_ABI } from "../ABI";
import {CrowdsaleFactoryABI} from '../../ABIs/CrowdsaleABI';
// import { projectContractBytecode } from "../bytecode";
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';


const crowdsaleFactoryContractAddress = "0x2648981230D8Efb6217Ff194ef16844B1D1B7C5d";
//Change the contract address

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = newKitFromWeb3(web3);
const CrowdsaleFactoryContract = new kit.connection.web3.eth.Contract(CrowdsaleFactoryABI, crowdsaleFactoryContractAddress);
//console.log("Inside Factory Service:", FactoryContract);

export async function getAllDeployedCrowdsale(){
    const allCrowdsaleList = await CrowdsaleFactoryContract.methods.getAllDeployedProjects().call();
    console.log("All Crowdsale Projects: ", allCrowdsaleList);
    return allCrowdsaleList;
}

export async function createNewCrowdsale (connector, tokenAddr, beneficiaryAddr, rate) {
    try {
        const create = await CrowdsaleFactoryContract.methods.createCrowdSale(rate, beneficiaryAddr, tokenAddr);
        const encodedData = create.encodeABI();
        const txObj = {
            from: connector.accounts[0],
            to: crowdsaleFactoryContractAddress,
            data: encodedData
        }
        const txn = await connector.sendTransaction(txObj);
        console.log("Transaction:", txn);
        return true;
    } catch {
        return false;
    }
}