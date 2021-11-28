import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Button, Layout, Text, Icon, Card, Modal } from '@ui-kitten/components';

import commonStyles from '../../commonStyles';
import { colorPairs } from '../../colors';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import EmptySpace from '../../components/EmptySpace';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';


export default function WalletHomeScreen({ navigation }) {
    const [connected, setConnected] = React.useState(false);
    const [userData, setUserData] = React.useState({ network: 'Alfajores', phone: '', address: '' });
    // const [balance, setBalance] = React.useState({"CELO": "0", "cEUR": "0", "cUSD": "0", "lockedCELO": "0", "pending": "0"});
    const connector = useWalletConnect();
    // console.log('Wallet connector:', connector);

    const connectedNetwork = 'alfajores';
    const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
    //console.log("WEB3:", web3);
    const kit = newKitFromWeb3(web3);
    // console.log("Contract Kit:", kit);
    // const address = '0x1erve1i2udb2wd29nd2wnewace';
    const tokenData = [
        { token: 'CELO', amount: '6.5', value: '6' },
        { token: 'cUSD', amount: '10', value: '1' },
        { token: 'EQI', amount: '7000000', value: '0.0001' },
    ];

    React.useEffect(() => {
        if (connector.connected) {
            setUserData((x) => ({ ...x, phone: '8283944992', address: connector.accounts[0] }));
            setConnected(true);
            var getBalance = async () => {
                var balance = await kit.getTotalBalance(connector.accounts[0]);
                console.log("User Balance", balance);
            }
            getBalance();
        }
    }, []);

    const tokenBalances = ({ item }) => {
        return (
            <View style={{ paddingTop: 10 }}>
                <Text>
                    {item.token}: {item.amount} ~~~ ${' '}
                    {parseFloat(item.amount) * parseFloat(item.value)}
                </Text>
            </View>
        );
    };

    const handleConnect = async () => {
        if (!connector.connected) {
            connector.connect().then((res) => {
                setUserData((x) => ({ ...x, phone: '8283944993', address: res.accounts[0] }));
                setConnected(true);
            })
        }
        else {
            console.log("address:", connector.accounts[0]);
            setConnected(true);
            // setUserData({network: 'Celo??', phone: '8283944993', address: connector.accounts[0]});
        }
    }

    const handleDisconnect = async () => {
        connector.killSession();
        setConnected(false);
    }

    const handleCheck = async () => {
        const balance = await kit.getTotalBalance(userData.address);
        console.log("User Balance", balance);
    }

    let num = (Math.floor((Math.random() * 100))) % colorPairs.length;
    return (
        <View style={commonStyles.pageView}>
            <View style={commonStyles.pageContent}>
                <EmptySpace />
                <View style={commonStyles.rowButtonContainer}>
                    <Button style={commonStyles.button} size="small" status="danger" onPress={() => handleDisconnect()}>
                        Disconnect
                    </Button>
                    <Button style={commonStyles.button} size="small" status="info" onPress={() => handleCheck()}>
                        Check
                    </Button>
                </View>
                <Card style={commonStyles.card}>
                    <Text style={commonStyles.secondaryTextGrey}>Network: {<Text>{userData.network}</Text>}</Text>
                    <Text style={commonStyles.secondaryTextGrey}>Phone: {<Text>{userData.phone}</Text>}</Text>
                    <Text style={commonStyles.secondaryTextGrey}>Address: {<Text>{userData.address}</Text>}</Text>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: 20,
                        }}>
                        <Text style={{ paddingTop: 10 }}>Tokens: </Text>
                        <FlatList data={tokenData} renderItem={tokenBalances} />
                    </View>
                </Card>

            </View>

            <View style={commonStyles.rowButtonContainer}>
                <Button style={commonStyles.doubleButton} status="warning" onPress={() => navigation.navigate('sendScreen')}>
                    Send
                </Button>
                <Button style={commonStyles.doubleButton} >
                    Recieve
                </Button>
            </View>

            {!connected &&
                <View style={styles.overlay}>
                    <EmptySpace space={50} />
                    <Card style={commonStyles.card}>
                        <View style={{ ...styles.topCard, backgroundColor: colorPairs[num].background }}>
                            <View style={{ flexDirection: 'row', marginVertical: '5%' }}>
                                <View>
                                    <Text style={{ color: colorPairs[num].text, ...styles.heading }}> Connect your </Text>
                                    <Text style={{ color: colorPairs[num].text, ...styles.heading }}> CELO Wallet</Text>
                                </View>
                                <Image
                                    style={{
                                        width: 180,
                                        height: 100,
                                        resizeMode: 'contain'
                                    }}
                                    source={require('../../../assets/images/wallet.png')}
                                />
                            </View>
                            <Button style={commonStyles.button} status="primary" onPress={() => handleConnect()}>
                                Connect
                            </Button>
                        </View>
                    </Card>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 2,
    },
    topCard: {
        padding: '5%',
        justifyContent: 'space-between',
        borderRadius: 15,
        marginHorizontal: '-4%',
        marginVertical: '-2%',
    },
    heading: {
        fontSize: 25,
        // fontWeight: 'bold',
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 1,
        backgroundColor: 'rgba(30,30,30,0.8)',
        width: '100%',
        height: '100%'
    }
});
