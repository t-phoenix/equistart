import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import { Dimensions } from 'react-native';
import DaoCardDetail from '../../components/DaoCardDetail';
import ProposalCardSummary from '../../components/ProposalCardSummary';
import CardList from '../../components/CardList';
import commonStyles from '../../commonStyles';
// import { ScrollView } from 'react-native-gesture-handler';

export default function DaoHomeScreen({ route, navigation }) {
  const data = [{ key: 0, id: 1, header: 'header', status: 0 }, { key: 1, id: 2, header: 'header2', status: 1 }, { key: 2, id: 3, header: 'header3', status: 1 }]
  return (
    <View style={styles.pageView}>
      <View style={{height: windowHeight - 140}}>
      <ScrollView>
      <View>
        <DaoCardDetail cardData={route.params.data} navigation={navigation} />
        <Text style={commonStyles.secondaryTextGrey}> All Proposals </Text>
        <View style={styles.cardList}>
          <CardList cardListData={data} card={ProposalCardSummary} navigation={navigation} />
        </View>
      </View>
      </ScrollView>
      </View>
      <View style={styles.rowContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('DaoList')}
          size='small'>
          BACK
        </Button>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('CreateProposal')}
          appearance='outline'
          size='medium'>
          Create Proposal
        </Button>
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  button: {
    margin: 2,
    width: windowWidth / 2,
    marginLeft: windowWidth / 4
  },
  pageView: {
    height: windowHeight - 80,
    justifyContent: 'space-between'
  },
  cardList: {
    height: 'auto',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }

})
