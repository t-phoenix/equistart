import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import commonStyles from '../commonStyles';

export default function ReviewScreen({navigation}) {
  const data = [
    {key: 'phone', value: '810599599'},
    {key: 'title', value: 'Equistart'},
    {key: 'description', value: 'Equity sharing on Blockchain'},
    {key: 'symbol', value: 'EQI'},
    {key: 'token', value: '21000000'},
    {key: 'deposit', value: '2100$'},
  ];
  const teamData = [
    {
      key: '91873173782',
      address: '0x223112ken2k1nk2ns',
      token: '7000000',
      amount: '700',
    },
    {
      key: '12873819733',
      address: '0xbqiwebdu3hdu39d93',
      token: '7000000',
      amount: '700',
    },
    {
      key: '38912738127',
      address: '0xdewdbwidibedjwjis',
      token: '7000000',
      amount: '700',
    },
  ];

  const renderRow = ({item}) => {
    return (
      <View style={{fdisplay: 'flex', flexDirection: 'row', paddingTop: 8}}>
        <Text>{item.key}:</Text>
        <Text>{item.value}</Text>
      </View>
    );
  };

  const renderTeam = ({item}) => {
    return (
      <View
        style={{
          fdisplay: 'flex',
          flexDirection: 'row',
          paddingTop: 8,
          justifyContent: 'space-between',
        }}>
        <Text>{item.key}</Text>
        <Text>{item.address}</Text>
        <Text>{item.token}</Text>
        <Text>{item.amount}</Text>
      </View>
    );
  };

  function handleInstall(){
      navigation.navigate('DaoList')
  }

  return (
    <View style={commonStyles.pageView}>
      <View style={commonStyles.backSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate('cofounderDetails')}>
          <Text> Back </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.FormBox}>
        <Text style={{fontWeight: 'bold'}}>Review Your Project Details</Text>
        <FlatList
          style={{padding: 4, height: '30%'}}
          data={data}
          renderItem={renderRow}
          keyExtractor={item => item.key}
          scrollEnabled={false}
        />
        <Text style={{fontWeight: 'bold'}}>Your core Team Details</Text>
        <FlatList
          style={{padding: 4, height: '40%'}}
          data={teamData}
          renderItem={renderTeam}
          keyExtractor={item => item.key}
          scrollEnabled={false}
        />
        <View style={{padding:4, height: '30%', alignItems: 'center'}}>
            <TouchableOpacity style={commonStyles.primaryButton} onPress={()=>handleInstall()}>
                <Text>Install Project on Blockchain</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  FormBox: {
    height: '90%',
    width: '90%',
    marginVertical: '2%',
    backgroundColor: '#E8954B',
    justifyContent: 'flex-start'
  },
});
