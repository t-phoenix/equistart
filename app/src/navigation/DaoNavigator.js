/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
//importing components
import {Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

//Navigation Screens Import
import DaoListScreen from '../screens/DaoListScreen';
import CreateDaoScreen from '../screens/CreateDaoScreen';
import CofounderDetailsScreen from '../screens/CofounderDetailsScreen'
import ReviewScreen from '../screens/ReviewScreen';
import DaoHomeScreen from '../screens/DaoScreens/DaoHomeScreen'
// import ExpandedWalletScreen from '../screens/ExpandedWalletScreen';

//import styles and colors
import commonStyles from '../commonStyles';
import {COLORS} from '../colors';

// import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
export default function DaoNavigator({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DaoList"
        component={DaoListScreen}
        options={{
          headerTitle: () => (
            <Text style={commonStyles.primaryTextBlue}>Dao List</Text>
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
        name="CreateDao"
        component={CreateDaoScreen}
        options={{
          headerTitle: () => (
            <Text style={commonStyles.primaryTextBlue}>Create your Project</Text>
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
        name="cofounderDetails"
        component={CofounderDetailsScreen}
        options={{
          headerTitle: () => (
            <Text style={commonStyles.primaryTextBlue}>Create your Project</Text>
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
        name="Review"
        component={ReviewScreen}
        options={{
          headerTitle: () => (
            <Text style={commonStyles.primaryTextBlue}>Review</Text>
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
        name="DaoHomeScreen"
        component={DaoHomeScreen}
        options={{
          headerTitle: () => (
            <Text style={commonStyles.primaryTextBlue}>Home</Text>
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

const styles = StyleSheet.create({});
