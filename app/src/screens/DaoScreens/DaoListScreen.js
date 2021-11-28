import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Layout, Card } from '@ui-kitten/components';
// import LinearGradient from 'react-native-linear-gradient';
import CardList from '../../components/CardList';

import commonStyles from '../../commonStyles';
import { COLORS } from '../../colors';
import DaoCardSummary from '../../components/DaoCardSummary';
import EmptySpace from '../../components/EmptySpace';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';

import {Factory_ABI, Project_ABI} from '../../ABI';

export default function DaoListScreen({ navigation }) {

  const data = [{ key: 0, title: "Equistart", token: "EQI", amount: "21000000", value: "0.0001" }, { key: 1, title: "Company2", token: "CMP2", amount: "100000", value: "1" }, { key: 2, title: "Company3", token: "CMP3", amount: "100000", value: "1" }, { key: 3, title: "Company4", token: "CMP4", amount: "100000", value: "1" },];
  const contractAddress = "0x3c6A22D1ad76D38513C581B1cF2da8F247BeCdba";

  const connector = useWalletConnect();
  let connectedAddress='';
  if(connector.connected){
   connectedAddress = connector.accounts[0];
  }
  console.log("Address:", connectedAddress);

  const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
  //console.log("WEB3:", web3);
  const kit = newKitFromWeb3(web3);
  //console.log("Kit Instance:", kit);
  const FactoryContract = new kit.web3.eth.Contract(Factory_ABI, contractAddress);
  


  React.useEffect(() => {
    console.log("running...")
    if(FactoryContract != null || FactoryContract != undefined) {
      loadProjAddList();
      
    }
    
  }, [])


  async function loadProjAddList(){
    const contractList = await FactoryContract.methods.getDeployedProjects().call();
    console.log("contract List:", contractList);
  }

  // async function checkFunction(){
  //   const goldToken = await kit.contracts.getGoldToken();
  //   console.log("Token contract:", goldToken );
  //   const balance = await kit.getTotalBalance(connectedAddress);
  //   console.log("User Balance", balance);
  // }

  async function Reload(){
    
    // console.log("Projects List:", listOfProjAddress);

    // console.log("Project Contract", ProjectContract);
    console.log("Factory Contract", FactoryContract);
  }

  return (
    <View style={commonStyles.pageView}>
      <View style={{}}>
        {/* <Button style={commonStyles.singleButton} onPress={()=>checkFunction()}>Check</Button> */}
        <Button style={commonStyles.singleButton} onPress={()=>Reload()}>Reload</Button>
      </View>
       
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false}>
        <EmptySpace space={20} />
        <View style={styles.messageContainer}>
          <Text style={commonStyles.primaryTextWhite}>Hi, there </Text>
          <Text style={commonStyles.tertiaryTextGrey}>browse projects</Text>
          <Text style={commonStyles.tertiaryTextGrey}>or get started by creating yours </Text>
        </View>
        <CardList cardListData={data} card={DaoCardSummary} navigation={navigation} />
        <EmptySpace space={40} />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button style={commonStyles.singleButton} onPress={() => { navigation.navigate('CreateDao') }}>
          Create New Project
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    borderWidth: 2,
    backgroundColor: '#fff321',
    margin: 8,
    padding: 8,
  },
  messageContainer: {
    marginHorizontal: 15,
    marginBottom: 20
  }
});
