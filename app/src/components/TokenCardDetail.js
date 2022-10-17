import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Button, Text, Spinner, Card, Icon } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import { backgrounds } from '../colors'
import { CommonActions } from '@react-navigation/native';
import { formatAddress, formatNumber } from '../services/FormatterService'
import EmptySpace from './EmptySpace';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { getUserBalance, getTokenDecimal, getUserVotes, delegateUser } from '../services/TokenServices/ERC20TokenService';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';

const TokenCardDetail = ({ cardData, navigation }) => {
    const [balance, setBalance] = React.useState('');
    const [fetching, setFetching] = React.useState(false);
    const [votes, setVotes] = React.useState('');
    const connector = useWalletConnect();

    React.useEffect(() => {
        refreshCardDetails();
    }, []);

    const refreshCardDetails = (tokenAddress = cardData.address) => {
        if (connector.connected) {
            setFetching(true);
            setBalance('');
            setVotes('');
            Promise.all([getUserBalance(tokenAddress, connector.accounts[0]), getUserVotes(tokenAddress, connector.accounts[0])])
                .then(([bal, votes]) => {
                    setBalance(bal);
                    setVotes(votes);
                    setFetching(false);
                })
        }
    }

    const delegateVotes = (tokenAddress) => {
        delegateUser(connector, tokenAddress, connector.accounts[0]).then((success) => {
            if (success) {
                setFetching(true);
                refreshCardDetails();
            }
        })
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
                    <Text style={styles.headerText} category='h3'>{cardData.title}</Text>
                    <Text style={styles.text} category='s1'>({cardData.token})</Text>
                    <Button style={{ ...commonStyles.button, marginLeft: 'auto' }} size='small'
                        onPress={() => refreshCardDetails()} disabled={!connector.connected} status="warning">
                        {fetching && <Spinner size='tiny' status='basic' />}
                        {!fetching && "Refresh"}
                    </Button>
                </View>
                <Text style={commonStyles.primaryTextOrange}>About</Text>
                <View style={commonStyles.rowButtonContainer}>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Project Address</Text>
                        <TouchableOpacity onPress={() => copyToClipboard(cardData.address)}>
                            <Text style={commonStyles.activeText}>{formatAddress(cardData.address)}</Text>
                        </TouchableOpacity>
                        <Text style={commonStyles.secondaryTextGrey}>Your Votes</Text>
                        <Text style={styles.text}>   {formatNumber(votes) || '---'} </Text>
                    </View>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Total token</Text>
                        <Text style={styles.text}>   {formatNumber(cardData.amount)} </Text>
                        <Text style={commonStyles.secondaryTextGrey}>Your Balance</Text>
                        <Text style={styles.text}>   {formatNumber(balance) || '---'} </Text>
                    </View>
                </View>
                <EmptySpace />
                <View style={commonStyles.rowButtonContainer}>
                    {!connector.connected && <Button appearance='outline' size='small' style={{ ...commonStyles.button, width: '45%' }} onPress={() => navigation.navigate('Wallet', { screen: 'WalletHomeScreen' })} accessoryRight={<Icon name='arrow-forward-outline' />}>Connect Wallet</Button>}
                    {connector.connected && <><Button appearance='outline' size='small' style={{ ...commonStyles.button, width: '40%' }} onPress={() => delegateVotes(cardData.address)}>Delegate Votes</Button>
                        <Button appearance='outline' size='small' style={{ ...commonStyles.button, width: '40%' }} onPress={() => navigation.navigate('Wallet', { screen: 'SendScreen', params: { data: cardData } })} accessoryRight={<Icon name='arrow-forward-outline' />}>Send Token</Button></>}
                </View>
            </View>
            <EmptySpace />
        </View>
    )
}

export default TokenCardDetail;

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
