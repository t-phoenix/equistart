import React from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import { Button, Text, Icon, Spinner } from '@ui-kitten/components';
import { Dimensions } from 'react-native';
import DaoCardDetail from '../../components/DaoCardDetail';
import ProposalCardSummary from '../../components/ProposalCardSummary';
import CardList from '../../components/CardList';
import commonStyles from '../../commonStyles';
import { Platform } from 'react-native';
import EmptySpace from '../../components/EmptySpace';
import { getProposalList } from '../../services/FactoryServices';

export default function DaoHomeScreen({ route, navigation }) {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    loadProposalList();
  }, [])


  async function loadProposalList() {
    setIsLoading(true);
    const proposalList = await getProposalList(route.params.data.address);
    let listOfObjects = [];
    if (proposalList.length > 0) {
      for (let i = 0; i < proposalList.length; i++) {
        const prop = proposalList[i];
        listOfObjects.push({ key: prop[0], id: prop[1], header: prop[2], status: prop[3], address: prop[4] })
      }
      setData(listOfObjects);
    }
    setIsLoading(false);
  }

  return (
    <View style={commonStyles.pageView}>
      <View style={commonStyles.pageContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DaoCardDetail cardData={route.params.data} navigation={navigation} />
          <View style={{ ...commonStyles.row, marginHorizontal: 5 }}>
            <Text style={commonStyles.secondaryTextGrey}> All Proposals </Text>
            <Button style={commonStyles.button} onPress={loadProposalList} accessoryLeft={<Icon name='refresh-outline' />} status='warning' />
          </View>
          <View style={styles.cardList}>
            {!isLoading && <CardList cardListData={data} card={ProposalCardSummary} navigation={navigation} />}
            {isLoading && <View style={{ alignItems: 'center' }}><EmptySpace space={50} /><Spinner status='basic' /></View>}
          </View>
          <EmptySpace space={40} />
        </ScrollView>
      </View>
      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('DaoList')}
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
