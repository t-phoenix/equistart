import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import commonStyles from '../../commonStyles';
import {COLORS} from '../../colors';

export default function DaoHomeScreen({route, navigation}) {
    const data = route.params.data;
    //key, amount, value
    const projectName = data.title;
    const token = data.token;
    const amount = data.amount;
    const value = data.value;
    
  return (
    <View style={commonStyles.pageView}>
      <View style={commonStyles.backSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DaoList')}>
          <Text> Back </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.FormBox}>
            <Text>Title: {data.title}</Text>
            <Text>Symbol: {data.token}</Text>
            <Text>Quantity of Tokens: {data.amount}</Text>
            <Text>Value: {data.value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
FormBox: {
    height: '90%',
    width: '90%',
    marginVertical: '2%',
    backgroundColor: '#E8954B',
  },
})
