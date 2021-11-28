import { Factory_ABI } from "../ABI";
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';

const contractAddress = "0x0f9Dd41f1c1b1b72808f791A83518dDF0c1aC17f";
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = newKitFromWeb3(web3);
const FactoryContract = new kit.connection.web3.eth.Contract(Factory_ABI, contractAddress);
console.log("Inside Factory Service:", FactoryContract);


export async function getProjectList(){
    const projectList = await FactoryContract.methods.getAllDeployedProjects().call();
    console.log("Project List inside Services:", projectList);
    return projectList
}