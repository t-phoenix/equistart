import React from 'react';
import { TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text, Layout, Card, Icon, Input } from '@ui-kitten/components';
import { backgrounds, colorPairs } from '../../colors';
import commonStyles from '../../commonStyles';
import EmptySpace from '../../components/EmptySpace';

export default function CreateDaoScreen({ navigation }) {
  const [projectTitle, setProjectTitle] = React.useState('');
  //const [description, setDescription] = React.useState('');
  const [symbol, setSymbol] = React.useState('');
  const [numOfToken, setNumOfToken] = React.useState();
  //const [initialDeposit, setInitialDeposit] = React.useState();
  let num = (Math.floor((Math.random() * 100))) % colorPairs.length;

  return (
    <View style={commonStyles.pageView}>
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false}>
        <EmptySpace />
        <Card style={commonStyles.card}>
          <View style={{ ...styles.topCard, backgroundColor: colorPairs[num].background }}>
            <View>
              <Text style={{ color: colorPairs[num].text, ...styles.heading }}> Add Project </Text>
              <Text style={{ color: colorPairs[num].text, ...styles.heading }}>  Details</Text>
            </View>
            <View>
              <Image
                style={{
                  width: 180,
                  height: 100,
                  resizeMode: 'contain'
                }}
                source={require('../../../assets/images/project_details.png')}
              />
            </View>
          </View>
        </Card>
        <EmptySpace />
        {/* <Input
          style={commonStyles.input}
          label={() => <Text style={commonStyles.inputLabel}> Creators Phone Number</Text>}
          placeholder='8107599599'
        /> */}
        <Input
          style={commonStyles.input}
          onChangeText={setProjectTitle}
          value={projectTitle}
          label={() => <Text style={commonStyles.inputLabel}> Project Title</Text>}
          placeholder={'Project Title'}
        />
        {/* <Input
          style={commonStyles.input}
          onChangeText={setDescription}
          value={description}
          label={() => <Text style={commonStyles.inputLabel}> Description</Text>}
          placeholder={'Description'}
          multiline
          numberOfLines={4}
        /> */}
        <Input
          style={commonStyles.input}
          value={symbol}
          onChangeText={setSymbol}
          label={() => <Text style={commonStyles.inputLabel}> Project Symbol</Text>}
          placeholder={'SYM'}
        />
        <Input
          style={commonStyles.input}
          value={numOfToken}
          onChangeText={setNumOfToken}
          label={() => <Text style={commonStyles.inputLabel}> Total Tokens to Mint</Text>}
          placeholder='21000000'
          keyboardType="numeric"
        />
        {/* <Input
          style={commonStyles.input}
          value={initialDeposit}
          label={() => <Text style={commonStyles.inputLabel}> Total Initial Deposit $</Text>}
          placeholder='2100'
          onChangeText={setInitialDeposit}
        /> */}
        <EmptySpace space={50} />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          // onPress={() => navigation.navigate('DaoList')}
          onPress={() => navigation.navigate('DaoList')}
          status='warning'>
          Back
        </Button>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('cofounderDetails')}
        >
          Next
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topCard: {
    flexDirection: 'row',
    padding: '5%',
    justifyContent: 'space-between',
    borderRadius: 15,
    marginHorizontal: '-4%',
    marginVertical: '-2%'
  },
  heading: {
    fontSize: 25,
    // fontWeight: 'bold',
  }
});
