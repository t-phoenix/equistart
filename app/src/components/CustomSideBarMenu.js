// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import commonStyles from '../commonStyles';
import {COLORS} from '../colors';
// import {Svg} from 'react-native-svg';
// import HarmonyLogo from '../assets/harmony-icon.svg';

const CustomSidebarMenu = props => {
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primaryBlack}}>
      {/*Top Large Image */}
      {/* <Image
        source={{uri: BASE_PATH + proileImage}}
        style={styles.sideMenuProfileIcon}
      /> */}
      <View style={styles.logoBox}>
        {/* <HarmonyLogo width={30} height={30} style={styles.logoStyle} /> */}
        <Text style={commonStyles.primaryTextBlue}>equistart</Text>
      </View>
      <View style={commonStyles.dividerStyle} />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <View style={commonStyles.dividerStyle} />
        <View style={styles.customItem}>
          <Text
            style={{color: COLORS.primaryWhite}}
            onPress={() => {
              Linking.openURL(
                'https://open.harmony.one/22m-on-social-wallet-security',
              );
            }}>
            Grants
          </Text>
        </View>
        <View style={styles.customItem}>
          <Text
            style={{color: COLORS.primaryWhite}}
            onPress={() => {
              Linking.openURL('https://github.com/polymorpher/one-wallet/wiki');
            }}>
            Wiki
          </Text>
        </View>
      </DrawerContentScrollView>
      <View style={styles.creatorContainer}>
        <Text style={commonStyles.smallText}>t-phoenix</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorContainer: {
    alignItems: 'center',
  },
  logoBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 32,
  },
});

export default CustomSidebarMenu;
