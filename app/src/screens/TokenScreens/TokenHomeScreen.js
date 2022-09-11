import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Icon, Spinner } from '@ui-kitten/components';
import { Dimensions } from 'react-native';
import TokenCardDetail from '../../components/TokenCardDetail';
import ProposalCardSummary from '../../components/ProposalCardSummary';
import CardList from '../../components/CardList';
import commonStyles from '../../commonStyles';
import { Platform } from 'react-native';
import EmptySpace from '../../components/EmptySpace';
import { getProposalList } from '../../services/ProjectServices';

export default function TokenHomeScreen({ route, navigation }) {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // loadProposalList();
  }, [])


  return (
    <View style={commonStyles.pageView}>
      <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false}>
        <TokenCardDetail cardData={route.params.data} navigation={navigation} />

        <EmptySpace space={60} />
      </ScrollView>
      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.navigate('TokenListScreen')}
          status="warning">
          Back
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
});
