import React from 'react';
import {StyleSheet, SafeAreaView, View, ScrollView} from 'react-native';
import commonStyles from '../../commonStyles';
import ProposalCardDetail from '../../components/ProposalCardDetail';
import EmptySpace from '../../components/EmptySpace';

import { Button, Text, Layout, Card } from '@ui-kitten/components'
import Badge from '../../components/Badge';

import { formatAddressLong, formatDate } from '../../services/FormatterService'
import { castVote } from '../../services/ProjectServices'
import { useWalletConnect } from '@walletconnect/react-native-dapp';

const GovernorProposalDetailsScreen = ({route, navigation}) => {

    

    const connector = useWalletConnect();
    // console.log("Card Data: ", cardData);


    const handleVote = async (vote) => {
        castVote(route.params.cardData.projectData.address, connector, route.params.cardData.key, vote).then(success => {
            if (success) {
                if (vote) {
                    setYesCount(yesCount + 1);
                }
                else {
                    setNoCount(noCount + 1);
                }
            }
            else {
                console.log('error');
            }
        })
    };


    


  return (
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView
        style={commonStyles.pageContent}
        showsVerticalScrollIndicator={false}>
        <EmptySpace />
        <View>
          <View style={{...commonStyles.innerCard, backgroundColor: '#F8F8F8'}}>
            <View style={styles.nameContainer}>
              <Text category="h3" style={styles.header}>
                {route.params.cardData.header}
              </Text>
              {/* <Badge status={cardData.isActive} /> */}
              <Text>Status: {route.params.cardData.status}</Text>
            </View>
            <EmptySpace />
            <Text style={commonStyles.primaryTextOrange}>Description</Text>
            <Text style={styles.text}>{route.params.cardData.description}</Text>
            <EmptySpace />
            <Text style={commonStyles.primaryTextOrange}>About</Text>
            <View>
              <Text style={commonStyles.secondaryTextGrey}>Creator: </Text>
              {
                <Text style={styles.text}>
                  {' '}
                  {formatAddressLong(route.params.cardData.address)}{' '}
                </Text>
              }
              <Text style={commonStyles.secondaryTextGrey}>
                Voting Ends At:{' '}
              </Text>
              {
                <Text style={styles.text}>
                  {' '}
                  {formatDate(route.params.cardData.votingEndDate)}{' '}
                </Text>
              }
            </View>
            <EmptySpace />
            <Text style={commonStyles.primaryTextOrange}>Results</Text>
            {/* <View style={styles.bottomSection}>
              <View style={{marginLeft: '10%'}}></View>
              <Text style={commonStyles.secondaryTextGrey}>
                Yes {<Text style={styles.text}> {yesCount} </Text>}{' '}
              </Text>
              <View style={{marginLeft: '10%'}}></View>
              <Text style={commonStyles.secondaryTextGrey}>
                No {<Text style={styles.text}> {noCount} </Text>}{' '}
              </Text>
            </View> */}
            <EmptySpace />
            {/* <View style={styles.voteMessage}>
              <Text style={commonStyles.primaryTextOrange}>Vote</Text>
              {votingStatus && (
                <View style={{marginTop: 13, marginLeft: 3}}>
                  <Text style={commonStyles.smallTextRed}>
                    (Voting period is over for this proposal)
                  </Text>
                </View>
              )}
            </View> */}

            {/* <View style={styles.bottomSection}>
              <Button
                style={commonStyles.doubleButton}
                onPress={() => {
                  handleVote(true);
                }}
                status="success"
                disabled={votingStatus}>
                YES
              </Button>
              <Button
                style={commonStyles.doubleButton}
                onPress={() => {
                  handleVote(false);
                }}
                status="danger"
                disabled={votingStatus}>
                NO
              </Button>
            </View> */}
          </View>
        </View>
        <EmptySpace space={30} />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.singleButton}
          onPress={() => navigation.goBack()}
          status="warning">
          Back
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default GovernorProposalDetailsScreen;

const styles = StyleSheet.create({
    card: {
        // flex: 1,
        margin: 4,
    },
    header: {
        maxWidth: '80%',
        color: '#404248'
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: '10%'
    },
    voteMessage: {
        flexDirection: 'row'
    },
    text: {
        color: '#9C9DA0',
        paddingLeft: 6
    },
})




