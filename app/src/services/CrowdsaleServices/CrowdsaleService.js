//TODO: 
//buyToken(addr) function : calculation on screen.
//Read functions:
// rate
// weiRaised
// token Address
// Wallet Addr

import {CrowdsaleABI} from '../../ABIs/CrowdsaleABI';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';


const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = newKitFromWeb3(web3);

export async function getAmountRaised(contractAddr){
    let contract = new kit.connection.web3.eth.Contract(CrowdsaleABI, contractAddr);
    let weiRaised = await contract.methods.weiRaised().call();
    return weiRaised;
}

export async function buyTokens(connector, contractAddr, buyerAddr, value){
    try {
        let contract = new kit.connection.web3.eth.Contract(CrowdsaleABI, contractAddr);
        // let sendingAmt = web3.utils.toWei(amount.toString(), 'ether');
        let buy = await contract.methods.buyTokens(buyerAddr);
        let encodedData = buy.encodeABI();
        const txObj = {
          from: connector.accounts[0],
          to: contractAddr,
          data: encodedData,
          value: value
        }
        const txn = await connector.sendTransaction(txObj);
        console.log("Transaction:", txn);
        return true;
    } catch (error) {
        console.log("error occured: ", error);
        return false;
    }
}