import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Layout, Card } from '@ui-kitten/components';
// import LinearGradient from 'react-native-linear-gradient';
import CardList from '../../components/CardList';

import commonStyles from '../../commonStyles';
import { COLORS } from '../../colors';
import DaoCardSummary from '../../components/DaoCardSummary';
import EmptySpace from '../../components/EmptySpace';


export default function DaoListScreen({ navigation }) {

  const data = [{ key: 0, title: "Equistart", token: "EQI", amount: "21000000", value: "0.0001" }, { key: 1, title: "Company2", token: "CMP2", amount: "100000", value: "1" }, { key: 2, title: "Company3", token: "CMP3", amount: "100000", value: "1" }, { key: 3, title: "Company4", token: "CMP4", amount: "100000", value: "1" },];

  return (
    <View style={commonStyles.pageView}>
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
