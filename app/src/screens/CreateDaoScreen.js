import React from 'react';
import { TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Layout, Card, Icon, Input } from '@ui-kitten/components';

import commonStyles from '../commonStyles';

export default function CreateDaoScreen({ navigation }) {
  const [projectTitle, setProjectTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [symbol, setSymbol] = React.useState('');
  const [numOfToken, setNumOfToken] = React.useState();
  const [initialDeposit, setInitialDeposit] = React.useState();

  return (
    <View style={commonStyles.pageView}>
      <ScrollView style={styles.scrollView}>
        <Input
          style={styles.input}
          disabled={true}
          label='Creators phone number'
          placeholder='8107599599'
        />
        <Input
          style={styles.input}
          onChangeText={setProjectTitle}
          value={projectTitle}
          label='Project Title'
        />
        <Input
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          label='Description'
          multiline
          numberOfLines={4}
        />
        <Input
          style={styles.input}
          value={symbol}
          onChangeText={setSymbol}
          label='Project Symbol'
          placeholder={'SYM'}
        />
        <Input
          style={styles.input}
          value={numOfToken}
          onChangeText={setNumOfToken}
          label='Total Tokens to mint'
          placeholder='21000000'
          keyboardType="numeric"
        />
        <Input
          style={styles.input}
          value={initialDeposit}
          label='Total initial Deposit in $ (cUSD, by whole founding team)'
          placeholder='2100'
          onChangeText={setInitialDeposit}
        />
      </ScrollView>
      <View style={styles.bottomSection}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('DaoList')}>
          BACK
        </Button>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('cofounderDetails')}
          appearance='outline'>
          NEXT
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  input: {
    flex: 1,
    margin: 2,
  },
  scrollView: {
    padding: 10
  }
});
