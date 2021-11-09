import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList
} from 'react-native';

import commonStyles from '../commonStyles';

export default function WalletHomeScreen({navigation}){

    const connectedNetwork = "alfajores"
    const userPhone = "8107599599"
    const address = "0x1erve1i2udb2wd29nd2wnewace"
    const tokenData = [{token: "CELO", amount: "6.5", value: "6"}, {token: "cUSD", amount: "10", value: "1"}, {token: "EQI", amount: "7000000", value: "0.0001"}]



    const tokenBalances = ({item}) =>{
        return(
            <View style={{paddingTop: 10}}>
                <Text>{item.token}: {item.amount} ~~~ $ {parseFloat(item.amount) * parseFloat(item.value)}</Text>
            </View>
        );
    }
    return (
        <View style={commonStyles.pageView}>
            <View style={styles.FormBox}>
                <View style={{display: 'flex', flexDirection:'row-reverse', paddingHorizontal: 8}}>
                <TouchableOpacity style={commonStyles.primaryButton}>
                    <Text>Disconnect</Text>
                </TouchableOpacity>
                </View>
                
                <Text style={{padding: 10}}>Network: {connectedNetwork}</Text>
                <Text style={{padding: 10}}>Phone: {userPhone}</Text>
                <Text style={{padding: 10}}>Address: {address}</Text>

                <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center' , marginTop: 20}}>
                    <Text style={{paddingTop: 10}}>Tokens: </Text>
                    <FlatList 
                        data = {tokenData}
                        renderItem={tokenBalances}
                    />
                </View>


                <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-evenly', marginTop: 30}}>
                <TouchableOpacity style={commonStyles.primaryButton} onPress={()=>navigation.navigate('sendScreen')}>
                    <Text> Send </Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.primaryButton}>
                    <Text> Receive </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
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
});