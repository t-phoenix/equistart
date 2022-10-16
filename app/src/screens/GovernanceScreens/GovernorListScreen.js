import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button, Text, Layout, Card, Icon, Spinner } from '@ui-kitten/components';
// import LinearGradient from 'react-native-linear-gradient';
import CardList from '../../components/CardList';
import GovernorCardSummary from '../../components/GovernorCardSummary';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import {DeployTimelock } from '../../services/GovernorServices/GovernorFactoryService';
import {getAllDeployedGovernors} from  '../../services/GovernorServices/GovernorFactoryService';
import EmptySpace from '../../components/EmptySpace';
import commonStyles from '../../commonStyles';
import { COLORS } from '../../colors';

export default function TokenListScreen({ navigation }) {

  const [data, setData] = React.useState([{ key: 0, governor: "0", timelock: "0", token: "0", }]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    loadProjAddList();
  }, [])


  

  async function loadProjAddList() {
    setIsLoading(true);
    const projectList = await getAllDeployedGovernors();
    let listOfObjects = [];
    if (projectList.length > 0) {
      for (let i = 0; i < projectList.length; i++) {
        const tempProj = projectList[i];
        console.log("TokenDetail", i,":", tempProj);
        listOfObjects.push({ key: i, governor: tempProj[0], timelock: tempProj[1], token: tempProj[2] })
      }
      setData(listOfObjects);
    }
    setIsLoading(false);
  }

    return(
        <SafeAreaView style={commonStyles.pageView}>
      {/* <Text>TokenListing Screen</Text> */}
      
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false}>

        <View style={{ ...styles.messageContainer, ...commonStyles.row }}>
          <View>
            <Text style={commonStyles.primaryTextWhite}>Hi, there </Text>
            <Text style={commonStyles.tertiaryTextGrey}>browse Already created Governors</Text>
            <Text style={commonStyles.tertiaryTextGrey}>or get started by creating one for your token</Text>
          </View>
          <View>
            <Button style={commonStyles.button} onPress={loadProjAddList} accessoryLeft={<Icon name='refresh-outline' />} status='warning' />
          </View>
        </View>
        {!isLoading && <CardList cardListData={data} card={GovernorCardSummary} navigation={navigation} />}
        {/* Add Details Button Navigation for new page */}
        {isLoading && <View style={{ alignItems: 'center' }}><EmptySpace space={50} /><Spinner status='basic' /></View>}
        <EmptySpace space={40} />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button style={commonStyles.singleButton} onPress={() => { navigation.navigate('CreateGovernor') }}>
          Create New Governor
        </Button>
      </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginHorizontal: 15
  }
});