import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Button, Text, Spinner, Card, Icon } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import { backgrounds } from '../colors'
import { formatAddress, formatNumber } from '../services/FormatterService'
import EmptySpace from './EmptySpace';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { getTokenName } from '../services/TokenServices/ERC20TokenService'
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';

const GovernorCardDetail = ({ cardData, navigation }) => {
    const [balance, setBalance] = React.useState('');
    const [fetching, setFetching] = React.useState(false);
    const [tokenName,setTokenName] = React.useState('');
    // const [decimal, setDecimal] = React.useState('');
    // const [fetchingDeci, setFetchingDeci] = React.useState(false);
    const connector = useWalletConnect();

    React.useEffect(() => {
        console.log("Governor CARD data: ",cardData);
        fetchTokenName(cardData);
        // fetchDecimal(cardData.address);
    }, []);

    async function fetchTokenName(data) {
        try {
            const result = await getTokenName(data.token);
            console.log("TokenName:", result);
            setTokenName(()=>result);
        } catch (error) {
            console.log("ERORO while geting token Name", error);
        }
        
    }

    const copyToClipboard = (address) => {
        Clipboard.setString(address);
        Toast.show('Address copied to clipboard!')
    }
    

    return (
        <View>
            <EmptySpace />
            <View style={{ ...commonStyles.innerCard, backgroundColor: '#F8F8F8' }}>
                <View style={styles.nameContainer}>
                    <Text style={styles.headerText} category='h3'>{tokenName}</Text>
                    {/* <Text style={styles.text} category='s1'>({cardData.timelock})</Text> */}
                </View>
                <Text style={commonStyles.primaryTextOrange}>About</Text>
                <View style={commonStyles.rowButtonContainer}>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Timelock: </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(cardData.timelock)}>
                            <Text style={commonStyles.activeText}>{formatAddress(cardData.timelock)}</Text>
                        </TouchableOpacity>    
                        <Text style={commonStyles.secondaryTextGrey}>Project Governor: </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(cardData.governor)}>
                            <Text style={commonStyles.activeText}>{formatAddress(cardData.governor)}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Token Addr: </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(cardData.governor)}>
                            <Text style={commonStyles.activeText}>{formatAddress(cardData.token)}</Text>
                        </TouchableOpacity>
                        <Text style={commonStyles.secondaryTextGrey}>Your power: </Text>

                        {/* GET VOTING POWER */}
                        {connector.connected && !fetching && <Text style={styles.text}>{formatNumber(balance)} </Text>}
                        {connector.connected && fetching && <View style={{ marginTop: 4, marginLeft: 30 }}><Spinner size='tiny' status='info' /></View>}
                        {!connector.connected && <Button appearance='outline' size='tiny' style={{ ...commonStyles.button, width: 100 }} onPress={() => navigation.navigate('Wallet', { screen: 'WalletHomeScreen' })}>Connect Wallet</Button>}
                    </View>
                </View>

            </View>
            <EmptySpace />
        </View>
    )
}

export default GovernorCardDetail;

const styles = StyleSheet.create({
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#9C9DA0',
        paddingLeft: 6
    },
    headerText: {
        color: '#404248'
    }
})