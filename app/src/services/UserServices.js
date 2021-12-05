import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
import { Factory_ABI, Project_ABI } from '../ABI';
import React from 'react';

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
var kit = newKitFromWeb3(web3);

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