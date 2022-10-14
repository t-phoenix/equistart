import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { Button, Text, Layout, Card, Icon, Spinner, Input } from '@ui-kitten/components';
import { backgrounds, colorPairs } from '../../colors';
import EmptySpace from '../../components/EmptySpace';
import CardList from '../../components/CardList';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import {deployTimelock, deployGovernor, updateGovernorFactory } from '../../services/GovernorServices/GovernorFactoryService';

import commonStyles from '../../commonStyles';
import { COLORS } from '../../colors';

const num = (Math.floor((Math.random() * 100))) % colorPairs.length;

export default function CreateGovernorScreen({ navigation }) {
    const connector = useWalletConnect();
    const [tokenAddr, setTokenAddr]= React.useState('');


    async function createGovernor(){
        //TODO: CREATE input for these parameters
        const delay = 3600;
        const proposers = ["0xe2c7618d0f07578cad8de5c05d5cbc3382b04fcd"];
        const executors =["0xe2c7618d0f07578cad8de5c05d5cbc3382b04fcd"];
        // const tokenAdrr = "0xe2c7618d0f07578cad8de5c05d5cbc3382b04fcd";
        
        deployTimelock(connector, delay, proposers, executors ).then((timelockAddr) => {
            console.log("Deploying TIMELOCK:", timelockAddr);
            deployGovernor(connector, timelockAddr, tokenAddr).then((governorAddr)=>{
                console.log("Governor Deployed:", governorAddr);
                //TODO: Send governor Address to Factory for listing
                updateGovernorFactory(connector, governorAddr, timelockAddr, tokenAddr ).then((result)=>{
                    console.log("Updating Factory:", result);
                }).error((err) => {
                    console.log("Error while updating Governor Factory:", err);
                })
            }).error((err)=>{
                console.log("Error while deploying Governor:", err)
            })
        }).error((err) => {
            console.error("Erroe while deploying Timelock",err );
        });
    }


    return(
        <SafeAreaView style={commonStyles.pageView}>
      {/* <Text>TokenListing Screen</Text> */}
      
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false}>
        
        <View style={commonStyles.outerCard}>
          <View style={{ ...commonStyles.innerCard, backgroundColor: colorPairs[num].background, flexDirection: 'row' }}>
            <View>
              <Text style={{ color: colorPairs[num].text, ...styles.heading }}> Add Governor </Text>
              <Text style={{ color: colorPairs[num].text, ...styles.heading }}>  Details</Text>
            </View>
            <View>
              <Image
                style={{
                  width: 140,
                  height: 100,
                  resizeMode: 'contain'
                }}
                source={require('../../../assets/images/project_details.png')}
              />
            </View>
          </View>
        </View>
        {/* Add List Code Here */}
        <EmptySpace />

        {/* CREATE 3 MORE FIELDS
        TO REPLACE THE HARDCODED DATA in createGovernor */}

        <Input
          style={commonStyles.input}
          onChangeText={setTokenAddr}
          value={tokenAddr}
          label={() => <Text style={commonStyles.inputLabel}>Token Address</Text>}
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
        <Button style={commonStyles.singleButton} onPress={createGovernor}>
          Create Governor
        </Button>
      </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    heading: {
      fontSize: 25,
      fontWeight: 'bold',
    }
  });
  