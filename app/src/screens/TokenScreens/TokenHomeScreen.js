import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {Button, Text, Icon, Spinner, Input} from '@ui-kitten/components';
import {Dimensions} from 'react-native';
import TokenCardDetail from '../../components/TokenCardDetail';
import ProposalCardSummary from '../../components/ProposalCardSummary';
import CardList from '../../components/CardList';
import commonStyles from '../../commonStyles';
import {backgrounds} from '../../colors';
import {Platform} from 'react-native';
import EmptySpace from '../../components/EmptySpace';
import {transferTokens,getUserBalance } from '../../services/TokenServices/ERC20TokenService';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {formatNumber} from '../../services/FormatterService';
import Toast from 'react-native-simple-toast';


export default function TokenHomeScreen({route, navigation}) {
  const connector = useWalletConnect();
  
  const [cardBackgrounds, setCardBackgrounds] = React.useState(Array.from({ length: 2 }).map(() => backgrounds[Math.floor(Math.random() * 100) % backgrounds.length]));
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [sendingAddress, setSendingAddress] = React.useState();
  const [sendingAmount, setSendingAmount] = React.useState();
  const [fetchinAddress, setFetchingAddress] = React.useState();
  const [fetchedBalance, setFetchedBalance] = React.useState(0);
  const [sending, setSending] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);
  const [isWalletConnected, setIsWalletConnected] = React.useState(
    connector.connected,
  );

  const scrollViewRef = React.useRef();

  React.useEffect(() => {
    setIsWalletConnected(connector.connected);
  }, [connector.connected]);

  const sendTokens = async () => {
    setSending(true);
    console.log('contract address:', route.params.data.address);
    transferTokens(
      connector,
      route.params.data.address,
      sendingAddress,
      sendingAmount,
    ).then(success => {
      if (!success) {
        console.log('toast failed');
      } else {
        console.log(sendingAmount, ' tokens sent successfully');
      }
    });
    setSending(false);
  };


  const fetchBalance = async () => {
    setFetching(true);
    getUserBalance(route.params.data.address, fetchinAddress).then(result => {
      console.log("User Balance: ", result);
      setFetchedBalance(result);
    })
    setFetching(false);
  }  

  return (
    
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView
        style={commonStyles.pageContent}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}>
        <TokenCardDetail cardData={route.params.data} navigation={navigation} />

        <View
          style={{
            ...commonStyles.innerCard,
            backgroundColor:cardBackgrounds[0]
          }}>
          <Text style={styles.headerText} category="h3">
            Transfer Tokens
          </Text>
          <Input
            style={commonStyles.input}
            onChangeText={setSendingAddress}
            onTouchEnd={() => scrollViewRef.current.scrollToEnd()}
            value={sendingAddress}
            placeholder="address"
            // accessoryRight={renderIcon}
            label={() => <Text style={styles.inputLabel}>Address</Text>}
          />
          <Input
            style={commonStyles.input}
            onChangeText={setSendingAmount}
            onTouchEnd={() => scrollViewRef.current.scrollToEnd()}
            value={sendingAmount}
            placeholder="amount"
            label={() => <Text style={styles.inputLabel}>Amount</Text>}
            keyboardType="numeric"
          />
          <View style={commonStyles.rowButtonContainer}>
            <Button style={commonStyles.doubleButton} onPress={sendTokens}>
              {!sending && 'Send Tokens'}
              {sending && <Spinner size="tiny" status="basic" />}
            </Button>
          </View>
        </View>

        <EmptySpace space={12} />

        <View
          style={{
            ...commonStyles.innerCard,
            backgroundColor:cardBackgrounds[1],
          }}>
          <Text style={styles.headerText} category="h3">
            User Balance
          </Text>
          <Input
            style={commonStyles.input}
            onChangeText={setFetchingAddress}
            onTouchEnd={() => scrollViewRef.current.scrollToEnd()}
            value={fetchinAddress}
            placeholder="address"
            // accessoryRight={renderIcon}
            label={() => <Text style={styles.inputLabel}>Address</Text>}
          />
          <View style={commonStyles.rowButtonContainer}>
            <Button style={commonStyles.doubleButton} onPress={fetchBalance}>
              {!fetching && 'Get Balance'}
              {fetching && <Spinner size="tiny" status="basic" />}
            </Button>
          </View>
          <Text style={styles.inputLabel}>
            Balance: {formatNumber(fetchedBalance)}
          </Text>

        </View>

        <EmptySpace space={120} />
      </ScrollView>

      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('TokenListScreen')}
          status="warning">
          Back
        </Button>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: '#404248',
  },
  inputLabel: {
    color: '#000',
    fontWeight: 'bold',
  },
});
