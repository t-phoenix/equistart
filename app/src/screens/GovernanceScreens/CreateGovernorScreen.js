import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, Image} from 'react-native';
import {
  Button,
  Text,
  Layout,
  Card,
  Icon,
  Spinner,
  Input,
} from '@ui-kitten/components';
import {backgrounds, colorPairs} from '../../colors';
import EmptySpace from '../../components/EmptySpace';
import CardList from '../../components/CardList';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {
  deployTimelock,
  deployGovernor,
  updateGovernorFactory,
} from '../../services/GovernorServices/GovernorFactoryService';

import commonStyles from '../../commonStyles';
import {COLORS} from '../../colors';

const num = Math.floor(Math.random() * 100) % colorPairs.length;

export default function CreateGovernorScreen({navigation}) {
  const connector = useWalletConnect();
  const [tokenAddr, setTokenAddr] = React.useState('');
  const [timelockAddr, setTimelockAddr] = React.useState('');
  const [governorAddr, setGovernorAddr] = React.useState('');
  const [buttonSwitch, setButtonSwitch] = React.useState(0);

  async function createTimelock() {
    //TODO: CREATE input for these parameters
    const delay = 3600;
    //WARNING:
    //EDIT
    //EDIT
    //Developers can ADD their current mobile testing wallet while creating governor
    const proposers = ['0xe2c7618d0f07578cad8de5c05d5cbc3382b04fcd'];
    const executors = ['0xe2c7618d0f07578cad8de5c05d5cbc3382b04fcd'];
    // const tokenAdrr = "0xe2c7618d0f07578cad8de5c05d5cbc3382b04fcd";

    deployTimelock(connector, delay, proposers, executors)
      .then(result => {
        console.log('Deploying TIMELOCK:', result);
        setTimelockAddr(()=>result);
        setButtonSwitch(()=>1);
      })
      .error(err => {
        console.error('Erroe while deploying Timelock', err);
      });
  }

  async function createGovernor() {
    deployGovernor(connector, timelockAddr, tokenAddr)
      .then(result => {
        console.log('Governor Deployed:', result);
        setGovernorAddr(()=>result);
        setButtonSwitch(()=>2);
      })
      .error(err => {
        console.log('Error while deploying Governor:', err);
      });
  }

  async function updateFactory() {
    updateGovernorFactory(connector, governorAddr, timelockAddr, tokenAddr)
      .then(result => {
        console.log('Updating Factory:', result);
        navigation.goBack();
      })
      .error(err => {
        console.log('Error while updating Governor Factory:', err);
      });
  }

  return (
    <SafeAreaView style={commonStyles.pageView}>
      {/* <Text>TokenListing Screen</Text> */}

      <ScrollView
        style={commonStyles.pageContent}
        showsVerticalScrollIndicator={false}>
        <View style={commonStyles.outerCard}>
          <View
            style={{
              ...commonStyles.innerCard,
              backgroundColor: colorPairs[num].background,
              flexDirection: 'row',
            }}>
            <View>
              <Text style={{color: colorPairs[num].text, ...styles.heading}}>
                {' '}
                Add Governor{' '}
              </Text>
              <Text style={{color: colorPairs[num].text, ...styles.heading}}>
                {' '}
                Details
              </Text>
            </View>
            <View>
              <Image
                style={{
                  width: 140,
                  height: 100,
                  resizeMode: 'contain',
                }}
                source={require('../../../assets/images/project_details.png')}
              />
            </View>
          </View>
        </View>
        {/* Add List Code Here */}
        <EmptySpace />
        <View>
          <Text>Enter Token Address</Text>
          <Text>1st Deploy Timelock</Text>
          <Text>Timelock: {timelockAddr}</Text>
          <Text>2nd Deplot Governor</Text>
          <Text>Governor: {governorAddr}</Text>
          <Text>3rd Add To The App Governor List</Text>
        </View>        
        {/* CREATE 3 MORE FIELDS
        TO REPLACE THE HARDCODED DATA in createGovernor */}
        <EmptySpace />
        <Input
          style={commonStyles.input}
          onChangeText={setTokenAddr}
          value={tokenAddr}
          label={() => (
            <Text style={commonStyles.inputLabel}>Token Address</Text>
          )}
          placeholder={'ERC20 Token Address'}
        />
        
        
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.goBack()}
          status="warning">
          Back
        </Button>
        <>
          {buttonSwitch == 0 ? (
            <Button style={commonStyles.singleButton} onPress={createTimelock}>
              Create Timelock
            </Button>
          ) : (
            <>
              {buttonSwitch == 1 ? (
                <Button
                  style={commonStyles.singleButton}
                  onPress={createGovernor}>
                  Create Governor
                </Button>
              ) : (
                <Button
                  style={commonStyles.singleButton}
                  onPress={updateFactory}>
                  Update List
                </Button>
              )}
            </>
          )}
        </>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
