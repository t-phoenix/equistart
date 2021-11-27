# Dev Helper 

**WalletConnect v1 is used (compatible with valora)**

### Android won't connect to crypto wallet unless the code snippet mentioned below is commented.


> After npm install or yarn, go to node_modules/@walletconnect/react-native-dapp/dist/providers/WalletConnectProvider.js and comment the code snippet as shown below:


`if (Platform.OS === 'android') {

            const canOpenURL = await Linking.canOpenURL(uri);
            
            // if (!canOpenURL) {
            
            //     Linking.openURL('https://walletconnect.org/wallets');
            
            //     throw new Error('No wallets found.');
            
            // }
            await Linking.openURL(uri);
}`

