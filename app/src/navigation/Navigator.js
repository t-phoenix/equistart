import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet } from 'react-native';
import commonStyles from '../commonStyles';
import { Button, Icon } from '@ui-kitten/components';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

const Stack = createStackNavigator();

export default function Navigator({ screens, navigation }) {
  const connector = useWalletConnect();
  const MenuAction = () => (
    <Button style={commonStyles.buttonGrey} accessoryLeft={<Icon name='menu-outline' />} onPress={() => navigation.openDrawer()} />
  );

  return (
    <Stack.Navigator>
      {screens.map(screen => (
        <Stack.Screen
          name={screen.name}
          component={screen.component}
          options={{
            headerTitle: () => (<View style={{ ...commonStyles.row, width: '100%' }}>
              <Text style={commonStyles.primaryTextOrange}>{screen.title}</Text>
              {connector.connected && <View style={styles.controlContainer}>
                <Text style={commonStyles.tertiaryTextGreen}>Wallet Connected</Text>
              </View>}
            </View>),
            headerLeft: MenuAction,
            headerStyle: commonStyles.headerBarStyle,
          }}
          key={screen.name}
        />
      ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  controlContainer: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(41,164,126,0.05)',
    borderColor: '#29A47E',
    borderWidth: 1,
    borderRadius: 20,
  },
});
