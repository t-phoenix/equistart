import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Button, Layout, Text, Icon, Card, Spinner } from '@ui-kitten/components';

import commonStyles from '../../commonStyles';
import { colorPairs, backgrounds } from '../../colors';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import EmptySpace from '../../components/EmptySpace';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
import { Factory_ABI, Project_ABI } from '../../ABI';
import { getProjectList } from '../../services/FactoryServices';
const contractAddress = "0x3c6A22D1ad76D38513C581B1cF2da8F247BeCdba";
let num = (Math.floor((Math.random() * 100))) % colorPairs.length;

export default function WalletHomeScreen({ navigation }) {
    const [connected, setConnected] = React.useState(false);
    const [userData, setUserData] = React.useState({ network: 'Alfajores', phone: '+91-82839-44992', address: '' });
    const [balance, setBalance] = React.useState({});
    const [fetching, setFetching] = React.useState(false);
    const connector = useWalletConnect();
    // console.log('Wallet connector:', connector);

    const connectedNetwork = 'alfajores';
    const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
    //console.log("WEB3:", web3);
    const kit = newKitFromWeb3(web3);
    const FactoryContract = new kit.connection.web3.eth.Contract(Factory_ABI, contractAddress);
    // const ProjectContract = new kit.connection.web3.eth.Contract(Project_ABI, contractAddress);

    console.log("swax", FactoryContract);
    // console.log("Contract Kit:", kit);
    // const address = '0x1erve1i2udb2wd29nd2wnewace';
    const tokenData = [
        { token: 'CELO', amount: '6.5', value: '6' },
        { token: 'cUSD', amount: '10', value: '1' },
        { token: 'EQI', amount: '7000000', value: '0.0001' },
    ];

    // const loadProjects = async () => {
    //     const projectList = await getProjectList();
    //     console.log("contract List:", projectList);
    //     let bal = {};
    //     for (var i = 0; i < projectList.length; i++) {
    //         console.log(projectList[i]);
    //         let contract = new kit.connection.web3.eth.Contract(Project_ABI, projectList[i][4]);
    //         let syb = await contract.methods.symbol().call();
    //         let val = await contract.methods.balanceOf(connector.accounts[0]).call();
    //         bal[syb] = val + "000000000000000000";
    //         console.log(contract.methods);
    //     }
    //     setBalance(bal);
    // }

    React.useEffect(() => {
        if (connector.connected) {
            setUserData((x) => ({ ...x, address: connector.accounts[0] }));
            // loadProjects();
            setConnected(true);
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

    const getBalance = async () => {
        let bal = await kit.getTotalBalance(connector.accounts[0]);
        setBalance(bal);
    }

    const handleConnect = async () => {
        if (!connector.connected) {
            connector.connect().then((res) => {
                setUserData((x) => ({ ...x, address: res.accounts[0] }));
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
        setUserData({ network: 'Alfajores', phone: '', address: '' });
        setBalance({});
        setConnected(false);
    }

    const handleCheck = async () => {
        setFetching(true);
        const projectList = await getProjectList();
        console.log("contract List:", projectList);
        let bal = {};
        for (var i = 0; i < projectList.length; i++) {
            console.log(projectList[i]);
            let contract = new kit.connection.web3.eth.Contract(Project_ABI, projectList[i][4]);
            let syb = await contract.methods.symbol().call();
            let val = await contract.methods.balanceOf(connector.accounts[0]).call();
            bal[syb] = val + "000000000000000000";
            console.log(contract.methods);
        }
        setBalance(bal);
        setFetching(false);
    }

    const LoadingIndicator = (props) => (
        <View style={[props.style, styles.indicator]}>
            <Spinner size='tiny' />
        </View>
    );

    const formatAddress = (addr) => {
        return addr.substring(0, 6) + '....' + addr.substring(addr.length - 6);
    }

    const formatTokenValue = (value) => {
        let val = String(value);
        let bd = val.slice(0, -18);
        let ad = val.slice(bd.length, -15);
        return bd + '.' + ad;
    }

    return (
        <View style={commonStyles.pageView}>
            <View style={commonStyles.pageContent}>
                <EmptySpace />
                <View style={commonStyles.rowButtonContainer}>

                </View>
                <Card style={commonStyles.card}>
                    <Card style={{ ...commonStyles.innerCard, backgroundColor: colorPairs[num].background }}>
                        <View style={commonStyles.row}>
                            <Text style={commonStyles.primaryTextBlack}>{userData.network}</Text>
                            <Button style={commonStyles.button} size="small" status="danger" onPress={() => handleDisconnect()}>
                                Disconnect
                            </Button>
                        </View>
                        <EmptySpace />
                        <Text style={commonStyles.secondaryTextGrey}>    Phone:      {<Text style={commonStyles.tertiaryTextBlack}>{userData.phone}</Text>}</Text>
                        <Text style={commonStyles.secondaryTextGrey}>    Address:    {<Text style={commonStyles.tertiaryTextBlack}>{formatAddress(userData.address)}</Text>}</Text>
                    </Card>
                    <EmptySpace />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={commonStyles.primaryTextOrange}>Tokens: </Text>
                        <Button style={commonStyles.button} status="info" size="small" onPress={() => handleCheck()}>
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
                            <Button style={commonStyles.button} onPress={() => handleConnect()}>
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
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
