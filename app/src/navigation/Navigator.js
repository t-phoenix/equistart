import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet } from 'react-native';
import commonStyles from '../commonStyles';
import { Button, Icon } from '@ui-kitten/components';

const Stack = createStackNavigator();

export default function Navigator({ screens, navigation }) {

  const MenuAction = () => (
    <Button accessoryLeft={<Icon name='menu-outline' />} onPress={() => navigation.openDrawer()} />
  );

  return (
    <Stack.Navigator>
      {screens.map(screen => (
        <Stack.Screen
          name={screen.name}
          component={screen.component}
          options={{
            headerTitle: () => (<Text style={commonStyles.primaryOrange}>{screen.title}</Text>),
            headerLeft: MenuAction,
            headerStyle: commonStyles.headerBarStyle,
          }}
          key={screen.name}
        />
      ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
