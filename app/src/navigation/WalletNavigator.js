import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
//importing components
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//importing Screens
import WalletHomeScreen from '../screens/WalletHomeScreen';
import SendScreen from '../screens/SendScreen'

//import styles and colors
import commonStyles from '../commonStyles';
import {COLORS} from '../colors';

// import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

export default function WalletNavigator({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WalletHomeScreen"
        component={WalletHomeScreen}
        options={{
          headerTitle: () => (
            <Text style={commonStyles.primaryTextBlue}>Wallet</Text>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              {/* <Icon
                name="align-center"
                size={30}
                color={COLORS.robinsEggBlue}
                style={{paddingLeft: 16}}
              /> */}
              <Text>Drawer</Text>
            </TouchableOpacity>
          ),
          headerStyle: commonStyles.headerBarStyle,
        }}
      />
      <Stack.Screen
        name="sendScreen"
        component={SendScreen}
        options={{
          headerTitle: () => (
            <Text style={commonStyles.primaryTextBlue}>Wallet</Text>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              {/* <Icon
                name="align-center"
                size={30}
                color={COLORS.robinsEggBlue}
                style={{paddingLeft: 16}}
              /> */}
              <Text>Drawer</Text>
            </TouchableOpacity>
          ),
          headerStyle: commonStyles.headerBarStyle,
        }}
        />

    </Stack.Navigator>
  );
}
