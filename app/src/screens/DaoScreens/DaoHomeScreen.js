import React from 'react';
import { View, StyleSheet} from 'react-native';
import { Button} from '@ui-kitten/components';
import { Dimensions } from 'react-native';
import DaoCard from '../../components/DaoCard';

export default function DaoHomeScreen({ route, navigation }) {
  return (
    <View style={styles.pageView}>
      <DaoCard daoData={route.params.data} navigation={navigation} withButton={false} />
      <View>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('DaoList')}>
          BACK
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
    width: windowWidth/2,
    marginLeft: windowWidth/4
  },
  pageView: {
    height: windowHeight - 80,
    justifyContent: 'space-between'
  },
})
