import React from 'react';
import { TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text, Layout, Card, Icon, Input } from '@ui-kitten/components';
import { backgrounds, colorPairs } from '../../colors';
import commonStyles from '../../commonStyles';
import EmptySpace from '../../components/EmptySpace';

//importing web3 Services
import { Factory_ABI, Project_ABI } from "../../ABI";
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {installProject} from '../../services/FactoryServices';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';

export default function CreateDaoScreen({ navigation }) {

  const connector = useWalletConnect();
  //console.log("connector:", connector);

  const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
  //console.log("web3:", web3);
  
  let kit = newKitFromWeb3(web3);
  //console.log("Kit:", kit);

  kit.defaultAccount = connector.accounts[0];
  console.log("account", kit.defaultAccount);

  const factoryAddress = "0x0f9Dd41f1c1b1b72808f791A83518dDF0c1aC17f";
  const FactoryContract = new kit.connection.web3.eth.Contract(Factory_ABI, factoryAddress);
  console.log("Factory:", FactoryContract.methods);

  const [projectTitle, setProjectTitle] = React.useState('');
  //const [description, setDescription] = React.useState('');
  const [symbol, setSymbol] = React.useState('');
  const [numOfToken, setNumOfToken] = React.useState();
  //const [initialDeposit, setInitialDeposit] = React.useState();
  let num = (Math.floor((Math.random() * 100))) % colorPairs.length;

  async function handleInstall(){
    // const install = await installProject(connector, projectTitle, symbol, numOfToken);
    // console.log("installing Project: ", install);
    const create = await FactoryContract.methods.createProject(projectTitle, symbol, numOfToken);
    const encodedData = create.encodeABI();
    const txObj = {
      from: connector.accounts[0],
      to: factoryAddress,
      data: encodedData
    }
    const txn = await connector.sendTransaction(txObj);
    console.log("Transaction:", txn);
    // const data = txo.encodeABI();
    // //const provider = kit.connection.setProvider(connector)
    // console.log("provider: ", provider);
    // const tx = await kit.sendTransactionObject( {txo, from: kit.defaultAccount});
    // console.log("Txn:", tx);


    // const receipt = await tx.waitReceipt();
    // console.log("receipt:", receipt);

  }



  return (
    <View style={commonStyles.pageView}>
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false}>
        <EmptySpace />
        <Card style={commonStyles.card}>
          <View style={{ ...styles.topCard, backgroundColor: colorPairs[num].background }}>
            <View>
              <Text style={{ color: colorPairs[num].text, ...styles.heading }}> Add Project </Text>
              <Text style={{ color: colorPairs[num].text, ...styles.heading }}>  Details</Text>
            </View>
            <View>
              <Image
                style={{
                  width: 180,
                  height: 100,
                  resizeMode: 'contain'
                }}
                source={require('../../../assets/images/project_details.png')}
              />
            </View>
          </View>
        </Card>
        <EmptySpace />
        {/* <Input
          style={commonStyles.input}
          label={() => <Text style={commonStyles.inputLabel}> Creators Phone Number</Text>}
          placeholder='8107599599'
        /> */}
        <Input
          style={commonStyles.input}
          onChangeText={setProjectTitle}
          value={projectTitle}
          label={() => <Text style={commonStyles.inputLabel}> Project Title</Text>}
          placeholder={'Project Title'}
        />
        {/* <Input
          style={commonStyles.input}
          onChangeText={setDescription}
          value={description}
          label={() => <Text style={commonStyles.inputLabel}> Description</Text>}
          placeholder={'Description'}
          multiline
          numberOfLines={4}
        /> */}
        <Input
          style={commonStyles.input}
          value={symbol}
          onChangeText={setSymbol}
          label={() => <Text style={commonStyles.inputLabel}> Project Symbol</Text>}
          placeholder={'SYM'}
        />
        <Input
          style={commonStyles.input}
          value={numOfToken}
          onChangeText={setNumOfToken}
          label={() => <Text style={commonStyles.inputLabel}> Total Tokens to Mint</Text>}
          placeholder='21000000'
          keyboardType="numeric"
        />
        {/* <Input
          style={commonStyles.input}
          value={initialDeposit}
          label={() => <Text style={commonStyles.inputLabel}> Total Initial Deposit $</Text>}
          placeholder='2100'
          onChangeText={setInitialDeposit}
        /> */}
        <EmptySpace space={50} />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          // onPress={() => navigation.navigate('DaoList')}
          onPress={() => navigation.navigate('DaoList')}
          status='warning'>
          Back
        </Button>
        <Button
          style={commonStyles.doubleButton}
          // onPress={() => navigation.navigate('cofounderDetails', {projectTitle: projectTitle, symbol: symbol, numOfToken: numOfToken} )}
          onPress={handleInstall}
        >
          Install on Blockchain
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topCard: {
    flexDirection: 'row',
    padding: '5%',
    justifyContent: 'space-between',
    borderRadius: 15,
    marginHorizontal: '-4%',
    marginVertical: '-2%'
  },
  heading: {
    fontSize: 25,
    // fontWeight: 'bold',
  }
});
