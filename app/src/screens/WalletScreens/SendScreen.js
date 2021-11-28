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

let num = (Math.floor((Math.random() * 100))) % colorPairs.length;
export default function ({ navigation }) {
  const [sendingToken, setSendingToken] = React.useState();
  const [sendingAmount, setSendingAmount] = React.useState();
  const [sendingAddress, setSendingAddress] = React.useState();
  const [selectedIndex, _setSelectedIndex] = React.useState(0);
  const [displayValue, setDisplayValue] = React.useState('');
  const [tokenList, setTokenList] = React.useState([[0, 1, 2]]);
  const [sending, setSending] = React.useState(false);

  const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
  const kit = newKitFromWeb3(web3);

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
      let contract = new kit.connection.web3.eth.Contract(Project_ABI, sendingToken[4]);
      console.log('1');
      await contract.methods.transfer(sendingAddress, sendingAmount).call();
      setSending(false);
    }
  }

  return (
    <View style={commonStyles.pageView}>
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false}>
        <EmptySpace />
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
