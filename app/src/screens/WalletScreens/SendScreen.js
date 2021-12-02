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
import { useWalletConnect } from '@walletconnect/react-native-dapp';

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
  const scrollViewRef = React.useRef();

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
      try {
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
      } catch (error) {
        console.log("ERROR:", error);
      }
      setSending(false);
    }
  }

  const sendNativeToken = async () => {
    try {
      let amount = kit.web3.utils.toWei('1', 'ether');
      const tx = {
        from: connector.accounts[0],
        to: "0x2F15F9c7C7100698E10A48E3EA22b582FA4fB859",
        value: amount,
      }
      const txn = await connector.sendTransaction(tx)
      console.log("Transaction: ", txn);

    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  return (
    <View style={commonStyles.pageView}>
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false} ref={scrollViewRef}>
        <EmptySpace />
        <View style={commonStyles.outerCard}>
          <View style={{ ...commonStyles.innerCard, backgroundColor: colorPairs[num].background, flexDirection: 'row' }}>
            <View>
              <Text style={{ color: colorPairs[num].text, ...styles.heading }}> Add Payment </Text>
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
        </View>
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
          onTouchStart={() => scrollViewRef.current.scrollToEnd()}
          value={sendingAddress}
          placeholder="address"
          label={() => <Text style={commonStyles.inputLabel}>Address</Text>}
        />
        <Input
          style={commonStyles.input}
          onChangeText={setSendingAmount}
          onTouchStart={() => scrollViewRef.current.scrollToEnd()}
          value={sendingAmount}
          placeholder="amount"
          label={() => <Text style={commonStyles.inputLabel}>Amount</Text>}
          keyboardType="numeric"
        />
        <EmptySpace space={110} />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button style={commonStyles.doubleButton} status="warning" onPress={() => navigation.goBack()}>
          Back
        </Button>
        <Button style={commonStyles.doubleButton} onPress={() => sendTokens()}>
          {!sending && "Sign and Send"}
          {sending && <Spinner size='tiny' status='basic' />}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
