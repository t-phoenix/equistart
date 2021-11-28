import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
//import components
import CustomSideBarMenu from './src/components/CustomSideBarMenu';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry, Layout} from '@ui-kitten/components';
import {default as theme} from './custom-theme.json';
import {DaoScreens, WalletScreens} from './src/navigation/StackConfig';
import Navigator from './src/navigation/Navigator';
//web3 imports
// import Web3 from 'web3';
import {
  withWalletConnect,
  useWalletConnect,
  RenderQrcodeModalProps,
  WalletService
} from '@walletconnect/react-native-dapp';

import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from './src/commonStyles';
//import WalletConnectProvider from '@walletconnect/react-native-dapp';

const Drawer = createDrawerNavigator();

const App = () => {
  // const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
  // console.log("Web3 instance:", web3);

  // const connector = useWalletConnect();
  // console.log('App connector:', connector);

  const DaoNavigator = ({navigation}) => (
    <Navigator screens={DaoScreens} navigation={navigation} />
  );

  const WalletNavigator = ({navigation}) => (
    <Navigator screens={WalletScreens} navigation={navigation} />
  );

  return (
    // <WalletConnectProvider
    //   storageOptions={{
    //     asyncStorage: AsyncStorage,
    //   }}

    //   // bridge="https://bridge.walletconnect.org"
    //   // clientMeta={{
    //   //   description: 'Connect with WalletConnect',
    //   //   url: 'https://www.google.com',
    //   //   icons: ['https://walletconnect.org/walletconnect-logo.png'],
    //   //   name: 'WalletConnect',
    //   //   apiKey: '627f76522696909ec5ed72b3abad15b9'
    //   // }}
    //   // redirectUrl={Platform.OS === 'web' ? window.location.origin : 'equistart://'}

    //   rpcUrl="https://alfajores-forno.celo-testnet.org"
    //   >
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              drawerStyle: {
                backgroundColor: '#1d2023',
                width: 240,
              },
              drawerActiveTintColor: '#E4C2A6',
              drawerInactiveTintColor: '#FFFFFF',
            }}

            // drawerContent={props => <CustomSideBarMenu {...props} />}
          >
            <Drawer.Screen
              name="Dao"
              component={DaoNavigator}
              options={{headerShown: false}}
            />
            <Drawer.Screen
              name="Wallet"
              component={WalletNavigator}
              options={{headerShown: false}}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

function CustomBottomSheet({
  walletServices,
  visible,
  connectToWalletService,
  uri,
}) {
  const renderContent = React.useCallback(() => {
  //   return <Text>Hello</Text>;
  // });

  return walletServices.map((walletService, i) => (
      <TouchableOpacity style={{backgroundColor:"#fff"}} key={`i${i}`} onPress={() => connectToWalletService(walletService, uri)}>
        <Image source={{ uri: walletService.logo }} />
        <Text>{walletService.name}</Text>
      </TouchableOpacity>
    ));
  }, [walletServices, uri]);
  const sheetRef = React.useRef(null);
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[450, 300, 0]}
      borderRadius={10}
      renderContent={renderContent}
    />
  );
}

export default withWalletConnect(App, {
  redirectUrl:
    Platform.OS === 'web' ? window.location.origin : 'app://WalletHomeScreen',
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
  
  //uri:"0e46b69-d0cc-4b3e-b6a2-cee442f97188@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=627f76522696909ec5ed72b3abad15b9"
  //bridge: "https://bridge.walletconnect.org/info"
  //url: "wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=627f76522696909ec5ed72b3abad15b9",
  // apiKey: '627f76522696909ec5ed72b3abad15b9',
  //rpcUrl: 'https://alfajores-forno.celo-testnet.org',
  //renderQrcodeModal: RenderQrcodeModalProps => <CustomBottomSheet {...RenderQrcodeModalProps} />,
});