import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { Factory_ABI, Project_ABI } from '../ABI';
import React from 'react';

var connector;
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
var kit;
var isInitialised = false;

export default function UserServices() {
    if (!isInitialised) {
        connector = useWalletConnect();
        kit = newKitFromWeb3(web3);
        isInitialised = true;
    }
    return (null);
}

export const getBalance = async () => {
    let bal = {};
    let totalBalance = await kit.getTotalBalance(connector.accounts[0]);
    console.log("Total balance:", totalBalance.CELO);
    if (totalBalance.CELO && totalBalance.cUSD) {
        bal["CELO"] = totalBalance.CELO;
        bal["cUSD"] = totalBalance.cUSD;
    }

    const projectList = await getProjectList();

    for (var i = 0; i < projectList.length; i++) {
        let contract = new kit.connection.web3.eth.Contract(Project_ABI, projectList[i][4]);
        let syb = await contract.methods.symbol().call();
        let val = await contract.methods.balanceOf(connector.accounts[0]).call();
        bal[syb] = val + "000000000000000000";
    }

    return bal;
}

export const getUserAddress = () => {
    return connector.accounts[0];

}

export const connect = async () => {
    if (!connector.connected) {
        await connector.connect();
    }
}

export const disconnect = () => {
    connector.killSession();
}

export const isConnected = () => {
    return connector.connected;
}