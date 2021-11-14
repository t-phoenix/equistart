import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text, Layout, Card } from '@ui-kitten/components';
// import LinearGradient from 'react-native-linear-gradient';
import DaoList from '../components/DaoList';

import commonStyles from '../commonStyles';
import { COLORS } from '../colors';

export default function DaoListScreen({ navigation }) {

  const data = [{ key: 0, title: "Equistart", token: "EQI", amount: "21000000", value: "0.0001" }, { key: 1, title: "Company2", token: "CMP2", amount: "100000", value: "1" }];

  return (
    <View style={commonStyles.pageView}>
      <View style={styles.daoListBox}>
        <DaoList data={data} navigation={navigation}/>
      </View>
      <View>
        <Button style={commonStyles.singleButton} appearance='outline' status='primary' onPress={() => { navigation.navigate('CreateDao') }}>
          Create New Project
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  daoListBox: {
    padding: '2%',
  },
  thumbnail: {
    borderWidth: 2,
    backgroundColor: '#fff321',
    margin: 8,
    padding: 8,
  }
});
