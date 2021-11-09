import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';

import commonStyles from '../commonStyles';

export default function CreateDaoScreen({navigation}) {
  const [projectTitle, setProjectTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [symbol, setSymbol] = React.useState('');
  const [numOfToken, setNumOfToken] = React.useState('21000000');
  const [initialDeposit, setInitialDeposit] = React.useState('2100');

  return (
    <View style={commonStyles.pageView}>
      <View style={styles.backSection}>
        <TouchableOpacity onPress={() => navigation.navigate('DaoList')}>
          <Text> Back </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.FormBox}>
        <View style={styles.phoneBox}>
          <Text style={styles.header}>Creator's phone number: </Text>
          <Text style={styles.phone}>8107599599</Text>
        </View>
        <Text style={styles.header}>Project Title</Text>
        <TextInput
          onChangeText={setProjectTitle}
          value={projectTitle}
          style={styles.input}
        />

        <Text style={styles.header}>Description</Text>
        <TextInput
          onChangeText={setDescription}
          value={description}
          style={styles.input2}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.header}>Project Symbol</Text>
        <TextInput
          value={symbol}
          onChangeText={setSymbol}
          style={styles.input}
          placeholder={'SYM'}
        />

        <Text style={styles.header}>Total Tokens to mint</Text>
        <TextInput
          value={numOfToken}
          onChangeText={setNumOfToken}
          style={styles.input}
          keyboardType="numeric"
        />

        <Text style={styles.header}>
          Total initial Deposit in $ (cUSD, by whole founding team)
        </Text>
        <TextInput
          value={initialDeposit}
          onChangeText={setInitialDeposit}
          style={styles.input}
          keyboardType="numeric"
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('cofounderDetails')}
          style={styles.button}>
          <Text>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backSection: {
    height: '4%',
    width: '90%',
    marginVertical: '2%',
    justifyContent: 'center',
    backgroundColor: '#3EA0BD',
  },
  FormBox: {
    height: '90%',
    width: '90%',
    marginVertical: '2%',
    backgroundColor: '#E8954B',
  },
  phoneBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  header: {
    marginTop: 8,
    marginLeft: 12,
  },
  phone: {
    marginTop: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input2: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginHorizontal: '30%',
    borderWidth: 2,
    paddingVertical: 4,
  },
});
