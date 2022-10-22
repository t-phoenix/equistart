import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {Button, Text, Icon, Spinner, Input} from '@ui-kitten/components';
import {Dimensions} from 'react-native';
import GovernorCardDetail from '../../components/GovernorCardDetail';
import GovernorProposalSummary from '../../components/GovernorProposalSummary';
import CardList from '../../components/CardList';
import commonStyles from '../../commonStyles';
import {backgrounds} from '../../colors';
import {Platform} from 'react-native';
import EmptySpace from '../../components/EmptySpace';
import {transferTokens,getUserBalance } from '../../services/TokenServices/ERC20TokenService';
import {getAllProposalList} from '../../services/GovernorServices/MyGovernorService';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {formatNumber} from '../../services/FormatterService';
import Toast from 'react-native-simple-toast';


export default function GovernorHomeScreen({route, navigation}) {
  const connector = useWalletConnect();  
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isWalletConnected, setIsWalletConnected] = React.useState(
    connector.connected,
  );

  const scrollViewRef = React.useRef();

  React.useEffect(() => {
    setIsWalletConnected(connector.connected);
    console.log("Route data:", route.params.data);
    loadProposalList();
  }, [connector.connected]);

  const loadProposalList = async () => {
    setIsLoading(true);
    getAllProposalList(route.params.data.governor).then(result => {
      console.log("proposal Result: ", result[0].returnValues);
      let listOfObjects = [];
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          const prop = result[i];
          listOfObjects.push({ 
            key: i,
            proposalId: prop.returnValues.proposalId, 
            header: prop.blockHash,
            transactionHash: prop.transactionHash, 
            description: prop.returnValues.description, 
            address: prop.returnValues.proposer,
            votingStartDate: prop.returnValues.startBlock,
            votingEndDate: prop.returnValues.endBlock, 
            });
        }
        setData(listOfObjects);
      }
    })
    setIsLoading(false);
  }  

  return (
    
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView
        style={commonStyles.pageContent}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}>

        <GovernorCardDetail cardData={route.params.data} navigation={navigation} />
        <View>
            <Text>Instructions:</Text>
            <Text>create a proposal</Text>
            <Text>Ex. grant in ERC20 token from gov treasury</Text>
            <Text>params: token --x tokenAddress, callData --x teamAddress, grantAmount</Text>
            {/* Call propose functions with params (address[targets], uint256[values], bytes[calldata], description string) */}
        </View>

        {/* <View>
          <Button style={commonStyles.button} onPress={loadProposalList} accessoryLeft={<Icon name='refresh-outline' />} status='warning' />
        </View> */}

        <EmptySpace space={12} />
        <View style={{ ...commonStyles.row, marginHorizontal: 5 }}>
          <Text style={commonStyles.secondaryTextGrey}> All Proposals </Text>
          <Button style={commonStyles.button} onPress={loadProposalList} accessoryLeft={<Icon name='refresh-outline' />} status='warning' />
        </View>
        <View>
          {!isLoading && <CardList cardListData={data} card={GovernorProposalSummary} navigation={navigation} />}
          {!isLoading && !data.length && <View style={{ alignItems: 'center' }}><EmptySpace space={40} /><Text style={commonStyles.tertiaryTextGrey}>No Proposals</Text></View>}
          {isLoading && <View style={{ alignItems: 'center' }}><EmptySpace space={50} /><Spinner status='basic' /></View>}
        </View>

        <EmptySpace space={120} />
      </ScrollView>

      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.goBack()}
          status="warning">
          Back
        </Button>
        <Button style={commonStyles.singleButton} onPress={() => { navigation.navigate('CreateProposalScreen', { data: route }) }}>
          Create Prosposal
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
