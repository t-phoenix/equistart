import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import commonStyles from '../../commonStyles';
import {COLORS} from '../../colors';

export default function ({navigation}) {
  const tokenData = [
    {token: 'CELO', amount: '6.5', value: '6'},
    {token: 'cUSD', amount: '10', value: '1'},
    {token: 'EQI', amount: '7000000', value: '0.0001'},
  ];
  const [sendingToken, setSendingToken] = React.useState();
  const [sendingAmount, setSendingAmount] = React.useState();
  const tokenBalances = ({item}) => {
    return (
      <View style={{paddingTop: 10}}>
        <Text>
          {item.token}: {item.amount} ~~~ ${' '}
          {parseFloat(item.amount) * parseFloat(item.value)}
        </Text>
      </View>
    );
  };
  return (
    <View style={commonStyles.pageView}>
      <View style={commonStyles.backSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate('WalletHomeScreen')}>
          <Text> Back </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.FormBox}>
        <Text style={{alignSelf: 'center'}}>Send</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{paddingTop: 10}}>Tokens: </Text>
          <FlatList data={tokenData} renderItem={tokenBalances} />
        </View>

        <View style={styles.pickerBox}>
          <Text>Transfering Token:</Text>
          <Picker
            style={styles.pickerStyle}
            selectedValue={sendingToken}
            onValueChange={(itemValue, itemIndex) =>
              setSendingToken(itemValue)
            }>
            {tokenData.map(item => {
              return (
                <Picker.Item
                  label={item.token}
                  value={item.token}
                    color={
                      sendingToken === item.token
                        ? COLORS.primaryBlack
                        : COLORS.primaryWhite
                    }
                />
              );
            })}
          </Picker>
        </View>
        <View style={styles.pickerBox}>
          <Text>Amount: </Text>
          <TextInput
            style={styles.amountInput}
            onChangeText={setSendingAmount}
            value={sendingAmount}
            placeholder="Enter number"
            keyboardType="numeric"
          />
          
        </View>

        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-evenly', marginTop: 30}}>
            <TouchableOpacity style={commonStyles.primaryButton}>
                <Text>Sign and Send</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backSection: {
    height: '4%',
    width: '90%',
    marginVertical: '2%',
    justifyContent: 'center',
    backgroundColor: '#3EA0BD',
  },
  FormBox: {
    height: '90%',
    width: '90%',
    marginVertical: '2%',
    backgroundColor: '#E8954B',
  },
  pickerStyle: {
    height: 180,
    width: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  pickerBox: {
    paddingVertical: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  amountInput: {
    height: 40,
    width: 180,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: COLORS.secondaryWhite,
    borderRadius: 16,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 4,
    // shadowColor: COLORS.robinsEggBlue,
  },
});
