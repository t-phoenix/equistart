import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StyleSheet, View } from 'react-native';
//import components
import CustomSideBarMenu from './src/components/CustomSideBarMenu';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
import { DaoScreens, WalletScreens } from './src/navigation/StackConfig';
import Navigator from './src/navigation/Navigator';

const Drawer = createDrawerNavigator();

const App = () => {

  const DaoNavigator = ({navigation}) => (
    <Navigator screens={DaoScreens} navigation={navigation} />
  );

  const WalletNavigator = ({navigation}) => (
    <Navigator screens={WalletScreens} navigation={navigation} />
  );

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              drawerActiveTintColor: '#E75F00',
              drawerInactiveTintColor: "#FFFFFF",
            }}
            drawerContent={props => <CustomSideBarMenu {...props} />}>
            <Drawer.Screen name="Dao" component= {DaoNavigator} options={{ headerShown: false }} />
            <Drawer.Screen name="Wallet" component={WalletNavigator} options={{ headerShown: false }} />
          </Drawer.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
});

export default App;