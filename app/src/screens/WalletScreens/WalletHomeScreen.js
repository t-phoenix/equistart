import React from 'react';
import { View, StyleSheet, FlatList, Image, ImageBackground } from 'react-native';
import { Button, Layout, Text, Icon, Card, Spinner } from '@ui-kitten/components';

import commonStyles from '../../commonStyles';
import { colorPairs, backgrounds } from '../../colors';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import EmptySpace from '../../components/EmptySpace';
import { formatMobileNumber, formatAddress, formatTokenValue } from '../../services/FormatterService';
//web3 imports
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
import { Factory_ABI, Project_ABI } from '../../ABI';
import { getProjectList } from '../../services/FactoryServices';
const contractAddress = "0x3c6A22D1ad76D38513C581B1cF2da8F247BeCdba";
let num = (Math.floor((Math.random() * 100))) % colorPairs.length;

export default function WalletHomeScreen({ navigation }) {
    const [connected, setConnected] = React.useState(false);
    const [userData, setUserData] = React.useState({ network: 'Alfajores', phone: '9999988888', address: '' });
    const [balance, setBalance] = React.useState({});
    const [fetching, setFetching] = React.useState(false);
    const connector = useWalletConnect();
    const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
    const kit = newKitFromWeb3(web3);

    React.useEffect(() => {
        if (connector.connected) {
            setUserData((x) => ({ ...x, address: connector.accounts[0] }));
            setConnected(true);
        } 
    }, []);

    const handleConnect = async () => {
        if (!connector.connected) {
            connector.connect().then((res) => {
                setUserData((x) => ({ ...x, address: res.accounts[0] }));
                setConnected(true);
            })
        }
        else {
            setConnected(true);
        }
    }

    const handleDisconnect = async () => {
        connector.killSession();
        setUserData({ network: 'Alfajores', phone: '', address: '' });
        setBalance({});
        setConnected(false);
    }

    const fetchBalance = async () => {
        setFetching(true);
        let bal = {};
        let totalBalance = await kit.getTotalBalance(connector.accounts[0]);
        console.log("Total balance:", totalBalance.CELO);
        if(totalBalance.CELO && totalBalance.cUSD){
            bal["CELO"] = totalBalance.CELO;
            bal["cUSD"] = totalBalance.cUSD;
        }

        const projectList = await getProjectList();
        console.log("contract List:", projectList);
        
        for (var i = 0; i < projectList.length; i++) {
            console.log(projectList[i]);
            let contract = new kit.connection.web3.eth.Contract(Project_ABI, projectList[i][4]);
            let syb = await contract.methods.symbol().call();
            let val = await contract.methods.balanceOf(connector.accounts[0]).call();
            bal[syb] = val + "000000000000000000";
            console.log(contract.methods);
        }
        setBalance(bal);
        console.log(bal);
        setFetching(false);
    }

    const LoadingIndicator = (props) => (
        <View style={[props.style, styles.indicator]}>
            <Spinner size='tiny' />
        </View>
    );

    return (
        <View style={commonStyles.pageView}>
            <View style={commonStyles.pageContent}>
                <EmptySpace />
                <View style={commonStyles.outerCard}>
                    <View style={{ ...commonStyles.innerCard, backgroundColor: colorPairs[num].background }}>
                        <View style={commonStyles.row}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...commonStyles.primaryTextBlack, color: colorPairs[num].text }}>{userData.network}</Text>
                                <View><Icon style={styles.icon} fill={colorPairs[num].text} name='link-2-outline' /></View>
                            </View>
                            <Button style={commonStyles.button} size="small" status="danger" onPress={() => handleDisconnect()}>
                                Disconnect
                            </Button>
                        </View>
                        <EmptySpace />
                        <View style={commonStyles.rowButtonContainer}>
                            <Image
                                style={{
                                    width: 75,
                                    height: 75,
                                    resizeMode: 'contain'
                                }}
                                source={require('../../../assets/images/user.png')}
                            />
                            {/* <EmptySpace /> */}
                            <View>
                                <Text style={commonStyles.secondaryTextGrey}>    Phone:       {<Text style={commonStyles.tertiaryTextBlack}>{formatMobileNumber(userData.phone)}</Text>}</Text>
                                <Text style={commonStyles.secondaryTextGrey}>    Address:    {<Text style={commonStyles.tertiaryTextBlack}>{formatAddress(userData.address)}</Text>}</Text>
                            </View>
                        </View>
                    </View>
                    <EmptySpace />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={commonStyles.primaryTextOrange}>Tokens: </Text>
                        <Button style={commonStyles.button} status="info" size="small" onPress={() => fetchBalance()}>
                            {!fetching && "Fetch Balance"}
                            {fetching && <LoadingIndicator />}
                        </Button>
                    </View>
                    <EmptySpace />
                    <View >
                        {Object.keys(balance).map((token) => (
                            <Text key={token} style={commonStyles.secondaryTextGrey}>{token}: {<Text>{formatTokenValue(balance[token])}</Text>}</Text>
                        ))}
                    </View>
                </View>
            </View>

            <View style={commonStyles.rowButtonContainer}>
                <Button style={commonStyles.doubleButton} onPress={() => navigation.navigate('sendScreen')}>
                    Transfer
                </Button>
                <Button style={commonStyles.doubleButton} >
                    Recieve
                </Button>
            </View>

            {!connected &&
                <View style={styles.overlay}>
                    <EmptySpace space={50} />
                    <View style={commonStyles.outerCard}>
                        <View style={{ ...commonStyles.innerCard, backgroundColor: colorPairs[num].background }}>
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
                            <Button style={commonStyles.button} onPress={() => handleConnect()}>
                                Connect
                            </Button>
                        </View>
                    </View>
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
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginTop: 5,
        marginLeft: 5,
        width: 25,
        height: 25,
    },
});