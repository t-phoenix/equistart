import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Icon, Spinner, Input } from '@ui-kitten/components';
import { Dimensions } from 'react-native';
import TokenCardDetail from '../../components/TokenCardDetail';
import ProposalCardSummary from '../../components/ProposalCardSummary';
import CardList from '../../components/CardList';
import commonStyles from '../../commonStyles';
import { backgrounds } from '../../colors';
import { Platform } from 'react-native';
import EmptySpace from '../../components/EmptySpace';
import { transferTokens } from '../../services/TokenServices/ERC20TokenService';
import { useWalletConnect } from '@walletconnect/react-native-dapp';



export default function TokenHomeScreen({ route, navigation }) {
  const connector = useWalletConnect();

  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [sendingAddress, setSendingAddress] = React.useState();
  const [sendingAmount, setSendingAmount] = React.useState();
  const [sending, setSending] = React.useState(false);
  const [isWalletConnected, setIsWalletConnected] = React.useState(connector.connected);

  const scrollViewRef = React.useRef();

  React.useEffect(() => {
    setIsWalletConnected(connector.connected);
  }, [connector.connected]);
 
  const sendTokens = async () => {
    setSending(true);
    console.log("contract address:", route.params.data.address);
    transferTokens(connector, route.params.data.address, sendingAddress, sendingAmount).then((success) => {
      if (!success) {
        console.log("toast failed");
      }
      else {
        console.log(sendingAmount, " tokens sent successfully");
      }
    })
    setSending(false);    
  }



  return (
    <View style={commonStyles.pageView}>
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false}  ref={scrollViewRef}>
        <TokenCardDetail cardData={route.params.data} navigation={navigation} />

        <View style={{ ...commonStyles.innerCard, backgroundColor: backgrounds[(Math.floor((Math.random() * 100))) % backgrounds.length] }}>
        <Text style={styles.headerText} category='h3'>Send Tokens</Text>
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
              {!sending && "Sign and Send"}
              {sending && <Spinner size='tiny' status='basic' />}
            </Button>
          </View>


        </View>
        <EmptySpace space={60} />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('TokenListScreen')}
          status="warning">
          Back
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: '#404248'
  },
  inputLabel: {
    color: '#000',
    fontWeight: 'bold'
  }
});
