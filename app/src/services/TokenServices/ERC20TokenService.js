import {ERC20TokenABI} from '../../ABIs/TokenABI';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';


const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = newKitFromWeb3(web3);



export async function getTokenName(address){
    let contract = new kit.connection.web3.eth.Contract(ERC20TokenABI, address);
    let name = await contract.methods.name().call();
    return name;
}

//TODO: can add symbol and total # of tokens call methods.

export async function getTokenDecimal(address){
    let contract = new kit.connection.web3.eth.Contract(ERC20TokenABI, address);
    let decimal = await contract.methods.decimals().call();
    return decimal;

}

export async function getUserBalance(tokenAddr, userAddr){
    let contract = new kit.connection.web3.eth.Contract(ERC20TokenABI, tokenAddr);
    console.log("contractAddr: ",tokenAddr );
    console.log("userAddr: ", userAddr);
    let userBalance = await contract.methods.balanceOf(userAddr).call();
    console.log("UserBalance:", userBalance);
    return userBalance;
}


export async function transferTokens(connector, tokenAddr, sendingAddr, amount) {
    try {
        let contract = new kit.connection.web3.eth.Contract(ERC20TokenABI, tokenAddr);
        let sendingAmt = web3.utils.toWei(amount.toString(), 'ether');
        let transfer = await contract.methods.transfer(sendingAddr, sendingAmt);
        let encodedData = transfer.encodeABI();
        const txObj = {
          from: connector.accounts[0],
          to: tokenAddr,
          data: encodedData,
        }
        const txn = await connector.sendTransaction(txObj);
        console.log("Transaction:", txn);
        return true;
    } catch (error) {
        console.log("error occured: ", error);
        return false;
    }
}



//TODO:ERC20 read and write functions list
// balanceOf(Addr) - for any address.
// getVotes (Addr) - for self and for any address.
// delegate (addr);