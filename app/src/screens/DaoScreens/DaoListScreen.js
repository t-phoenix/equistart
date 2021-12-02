import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Layout, Card } from '@ui-kitten/components';
// import LinearGradient from 'react-native-linear-gradient';
import CardList from '../../components/CardList';

import commonStyles from '../../commonStyles';
import { COLORS } from '../../colors';
import DaoCardSummary from '../../components/DaoCardSummary';
import EmptySpace from '../../components/EmptySpace';

//importing web3 Services
import {getProjectList} from '../../services/FactoryServices';

export default function DaoListScreen({ navigation }) {

  //const data = [{ key: 0, title: "Equistart", token: "EQI", amount: "21000000", value: "0.0001" }, { key: 1, title: "Company2", token: "CMP2", amount: "100000", value: "1" }, { key: 2, title: "Company3", token: "CMP3", amount: "100000", value: "1" }, { key: 3, title: "Company4", token: "CMP4", amount: "100000", value: "1" },];
  const [data, setData] = React.useState([{ key: 0, title: "0", token: "0", amount: "0", address: "0.0" }]);
 
  React.useEffect(() => {
    console.log("running...")
    loadProjAddList();
  }, [])


  async function loadProjAddList(){
    const projectList = await getProjectList();
    console.log("contract List:", projectList);
    let listOfObjects = [];
    if(projectList.length > 0){
      for (let i = 0; i < projectList.length; i++){
        const tempProj = projectList[i];
        //console.log("Project"+i + " :"+tempProj[0]);
        listOfObjects.push({key: tempProj[0], title: tempProj[1], token: tempProj[2], amount: tempProj[3], address: tempProj[4]})
      }
      setData(listOfObjects);
    }
  }

  return (
    <View style={commonStyles.pageView}>
      <Button onPress={loadProjAddList}>
        Reload
      </Button>
       
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
