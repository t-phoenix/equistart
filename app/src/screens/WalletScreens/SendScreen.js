import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';
import commonStyles from '../../commonStyles'
import { Button, Text, Layout, Card, Icon, Input, Select, SelectItem, Spinner } from '@ui-kitten/components';
import { colorPairs } from '../../colors';
import EmptySpace from '../../components/EmptySpace';
import { getProjectList } from '../../services/FactoryServices';
import Web3 from 'web3';
import { Factory_ABI, Project_ABI } from '../../ABI';
import { newKitFromWeb3 } from '@celo/contractkit';
import  {useWalletConnect} from '@walletconnect/react-native-dapp';

let num = (Math.floor((Math.random() * 100))) % colorPairs.length;

export default function ({ navigation }) {
  const [sendingToken, setSendingToken] = React.useState();
  const [sendingAmount, setSendingAmount] = React.useState();
  const [sendingAddress, setSendingAddress] = React.useState();
  const [selectedIndex, _setSelectedIndex] = React.useState(0);
  const [displayValue, setDisplayValue] = React.useState('');
  const [tokenList, setTokenList] = React.useState([[0, 1, 2]]);
  const [sending, setSending] = React.useState(false);

  const connector = useWalletConnect();
  const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
  //const web3 = new Web3(connector);
  const kit = newKitFromWeb3(web3);
  kit.defaultAccount = connector.accounts[0];

  const setSelectedIndex = (idx) => {
    _setSelectedIndex(idx);
    setSendingToken(tokenList[idx - 1]);
    setDisplayValue(tokenList[idx - 1][2]);
  }

  React.useEffect(() => {
    fetchTokenList();
  }, []);

  const fetchTokenList = async () => {
    const projectList = await getProjectList();
    console.log("contract List:", projectList);
    setTokenList(projectList);
    // let tokens = [];
    // for (var i = 0; i < projectList.length; i++) {
    //   console.log(projectList[i]);
    //   tokens.push(projectList[i][3]);
    // }
  }

  const tokenBalances = ({ item }) => {
    return (
      <View style={{ paddingTop: 10 }}>
        <Text>
          {item.token}: {item.amount} ~~~ ${' '}
          {parseFloat(item.amount) * parseFloat(item.value)}
        </Text>
      </View>
    );
  };

  const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward' />
  );

  const sendTokens = async () => {
    if (sendingToken) {
      setSending(true);
      let projectContract = new kit.connection.web3.eth.Contract(Project_ABI, sendingToken[4]);
      console.log("tokenAddress:", sendingToken[4]);
      console.log('proj contract:', projectContract);
      let transfer = await projectContract.methods.transfer(sendingAddress, sendingAmount);
      let encodedData = transfer.encodeABI();
      const txObj = {
        from: connector.accounts[0],
        to: sendingToken[4],
        data: encodedData,
        
      }
      const txn = await connector.sendTransaction(txObj)
      console.log("transaction: ", txn);
      setSending(false);
    }
  }

  const sendNativeToken = async () => {
    try {
      // let amount = kit.web3.utils.toWei('0.001','ether');
      // const stableContract = await kit.contracts.getStableToken();
      // console.log("stable token contract:", stableContract);
      // const tx = await stableContract.transfer('0x2F15F9c7C7100698E10A48E3EA22b582FA4fB859', amount).send();
      // console.log("Trxn: ", tx);
      // const receipt = await tx.waitReceipt();
      // console.log("receipt: ", receipt);
      let amount = kit.web3.utils.toWei('1','ether');
      const tx =  {
        from: connector.accounts[0],
        to: "0x2F15F9c7C7100698E10A48E3EA22b582FA4fB859",
        value: amount,
      }
      const txn = await connector.sendTransaction(tx)
      console.log("Transaction: ",txn);

    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  return (
    <View style={commonStyles.pageView}>
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false}>
        <EmptySpace />
        <Button onPress={sendNativeToken}>
          test
        </Button>
        <Card style={commonStyles.card}>
          <View style={{ ...styles.topCard, backgroundColor: colorPairs[num].background }}>
            <View>
              <Text style={{ color: colorPairs[num].text, ...styles.heading }}> Add Recipients </Text>
              <Text style={{ color: colorPairs[num].text, ...styles.heading }}>  Details</Text>
            </View>
            <View>
              <Image
                style={{
                  width: 180,
                  height: 100,
                  resizeMode: 'contain'
                }}
                source={require('../../../assets/images/transfer.png')}
              />
            </View>
          </View>
        </Card>
        <EmptySpace />
        <Select
          style={{ height: 70, justifyContent: 'space-between' }}
          label={() => <Text style={commonStyles.inputLabel}>Token</Text>}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}
          value={displayValue}>
          {tokenList.map((x) => (
            <SelectItem
              key={x[0]}
              title={x[2]}
              accessoryRight={ForwardIcon}
            />
          ))}
        </Select>
        <EmptySpace />
        <Input
          style={commonStyles.input}
          onChangeText={setSendingAddress}
          value={sendingAddress}
          placeholder="address"
          label={() => <Text style={commonStyles.inputLabel}>Address</Text>}
        />
        <Input
          style={commonStyles.input}
          onChangeText={setSendingAmount}
          value={sendingAmount}
          placeholder="amount"
          label={() => <Text style={commonStyles.inputLabel}>Amount</Text>}
          keyboardType="numeric"
        />
        <EmptySpace space={100} />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button style={commonStyles.doubleButton} status="warning" onPress={() => navigation.goBack()}>
          Back
        </Button>
        <Button style={commonStyles.doubleButton} onPress={() => sendTokens()}>
          {!sending && "Sign and Send"}
          {sending && <Spinner size='tiny' status='basic'/>}
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
    fontSize: 20,
    // fontWeight: 'bold',
  }
});
