import React from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import { Button, Layout, Text, Icon } from '@ui-kitten/components';

import commonStyles from '../../commonStyles';

export default function WalletHomeScreen({ navigation }) {

    const connectedNetwork = "alfajores"
    const userPhone = "8107599599"
    const address = "0x1erve1i2udb2wd29nd2wnewace"
    const tokenData = [{ token: "CELO", amount: "6.5", value: "6" }, { token: "cUSD", amount: "10", value: "1" }, { token: "EQI", amount: "7000000", value: "0.0001" }]

    const StarIcon = (props) => (
        <Icon {...props} name='star' />
    );

    const tokenBalances = ({ item }) => {
        return (
            <View style={{ paddingTop: 10 }}>
                <Text>{item.token}: {item.amount} ~~~ $ {parseFloat(item.amount) * parseFloat(item.value)}</Text>
            </View>
        );
    }
    return (
        <View style={commonStyles.pageView}>
            <View>
                <View style={{ display: 'flex', flexDirection: 'row-reverse', paddingHorizontal: 8 }}>
                    <Button style={styles.button} status='danger'>
                        DISCONNECT
                    </Button>
                </View>

                <Text style={{ padding: 10 }}>Network: {connectedNetwork}</Text>
                <Text style={{ padding: 10 }}>Phone: {userPhone}</Text>
                <Text style={{ padding: 10 }}>Address: {address}</Text>

                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ paddingTop: 10 }}>Tokens: </Text>
                    <FlatList
                        data={tokenData}
                        renderItem={tokenBalances}
                    />
                </View>


                <View style={commonStyles.rowButtonContainer}>
                    <Button style={styles.button} status='danger'>
                        SEND
                    </Button>
                    <Button style={styles.button} status='danger'>
                        DISCONNECT
                    </Button>
                    {/* <TouchableOpacity style={commonStyles.primaryButton} onPress={() => navigation.navigate('sendScreen')}>
                        <Text> Send </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={commonStyles.primaryButton}>
                        <Text> Receive </Text>
                    </TouchableOpacity> */}
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 2,
    },
});