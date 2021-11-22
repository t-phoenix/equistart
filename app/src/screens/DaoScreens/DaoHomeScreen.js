import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
import {Dimensions} from 'react-native';
import DaoCardDetail from '../../components/DaoCardDetail';
import ProposalCardSummary from '../../components/ProposalCardSummary';
import CardList from '../../components/CardList';
import commonStyles from '../../commonStyles';
import {Platform} from 'react-native';
import EmptySpace from '../../components/EmptySpace';

export default function DaoHomeScreen({ route, navigation }) {
  const data = [{ key: 0, id: 1, header: 'header', status: 0 }, { key: 1, id: 2, header: 'header2', status: 1 }, { key: 2, id: 3, header: 'This is a very long header', status: 1 }]
  return (
    <View style={commonStyles.pageView}>
      <View style={commonStyles.pageContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <EmptySpace />
          <DaoCardDetail cardData={route.params.data} navigation={navigation} />
          <Text style={commonStyles.secondaryTextGrey}> All Proposals </Text>
          <View style={styles.cardList}>
            <CardList
              cardListData={data}
              card={ProposalCardSummary}
              navigation={navigation}
            />
          </View>
          <EmptySpace space={40} />
        </ScrollView>
      </View>
      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('DaoList')}
          size="small"
          status="warning">
          Back
        </Button>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('CreateProposal')}
          size="medium">
          Create Proposal
        </Button>
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  cardList: {
    height: 'auto',
  },
});
