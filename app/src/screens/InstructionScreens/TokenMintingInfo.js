import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import commonStyles from '../../commonStyles';
import {COLORS} from '../../colors';
import {Button} from '@ui-kitten/components';

const windowHeight = Dimensions.get('window').height;

export default function TokenMintingInfo({navigation}) {
  return (
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView>
        <View>
          <View style={styles.contentBox}>
            <Text style={styles.headerText}>Aim</Text>
            <Text style={styles.descriptionText}>
              This application helps a group of users make their project ownable
              and managable on a public blockchain using ERC-20 token standard.
            </Text>
          </View>

          <View style={styles.contentBox}>
            <Text style={styles.headerText}>How to use?</Text>
            <Text style={styles.descriptionText}>
              - This is a pure dApp, connected only with alfajores test network
            </Text>
            <Text style={styles.descriptionText}>
              {' '}
              - Alfajores is the testnet for celo blockchain, used in
              development and testing.
            </Text>
            <Text style={styles.descriptionText}>
              {' '}
              - Alfajores team also maintains a cryptowallet named alfajores on
              playstore.
            </Text>
          </View>
          <View style={styles.buttonBox}>
            <Button
              style={commonStyles.singleButton}
              onPress={() =>
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=org.celo.mobile.alfajores',
                )
              }>
              Alfajores Playstore
            </Button>
          </View>

          <View style={styles.contentBox}>
            <Text style={styles.descriptionText}>
              {' '}
              - download this wallet, setup it, and fund it using alfajores
              faucet.
            </Text>
          </View>

          <View style={styles.buttonBox}>
            <Button
              style={commonStyles.singleButton}
              onPress={() =>
                Linking.openURL('https://celo.org/developers/faucet')
              }>
              Alfajores Faucet
            </Button>
          </View>
          <View style={{height: 20}} />

          <TouchableOpacity
            style={styles.buttonBox}
            onPress={() =>
              Linking.openURL('https://www.youtube.com/watch?v=y-wXijAadiU')
            }>
            <Text style={styles.hyperlinkBtn}>
              Use this Youtube link if you need more help(works similiar to
              celo)
            </Text>
          </TouchableOpacity>

          <View style={{height: 10}} />

          <View style={styles.contentBox}>
            <Text style={styles.headerText}>What to do ?</Text>
            <Text style={styles.descriptionText}>
              Connect this dApp (Equistart) with alfajores wallet using connect
              button on Wallet Screen.
            </Text>
            <View style={{height: 12}} />
            <Text style={styles.descriptionText}>
              {' '}
              - You can create a new ERC20 token for your project.
            </Text>
            <Text style={styles.descriptionText}>
              {' '}
              - You can share/ transfer those project token to your co-founders,
              investors and other stakeholders as equity.
            </Text>
            <Text style={styles.descriptionText}>
              {' '}
              - If a user hold {'>'} 5% of total project tokens, user has
              special privileges under that project.
            </Text>
            <Text style={styles.descriptionText}>
              {' '}
              - These special users can create new proposal for their project.{' '}
            </Text>
            <Text style={styles.descriptionText}>
              {' '}
              - These special users can vote on those proposal.{' '}
            </Text>
          </View>

          <View style={styles.contentBox}>
            <Text style={styles.headerText}>Future Work</Text>
            <Text style={styles.descriptionText}>
              {' '}
              {'=>'} Next version will have the functionality of managing funds
              for your projects
            </Text>
            <Text style={styles.descriptionText}> - deposit </Text>
            <Text style={styles.descriptionText}> - withdraw </Text>
            <Text style={styles.descriptionText}> - sale </Text>
            <Text style={styles.descriptionText}> - escrow </Text>
            <Text style={styles.descriptionText}> - payments </Text>
            <Text style={styles.descriptionText}>
              {' '}
              {'=>'} More customisable variables.
            </Text>
            <Text style={styles.descriptionText}>
              {' '}
              {'=>'} Integrating multiple blockchains.
            </Text>
          </View>

          <View style={styles.contentBox}>
            <Text style={styles.specialText}>If your are interested to fund/ Join the project, please contact the developers.</Text>
            <Text style={styles.specialText}>Thank You !</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentBox: {
    //backgroundColor:'#fff',
    margin: '5%',
    padding: '5%',
  },
  buttonBox: {alignItems: 'center', paddingHorizontal: 8},
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
  },
  specialText: {
      marginVertical:8,
      fontSize: 16,
      color: COLORS.robinsEggBlue,

  },
  hyperlinkBtn: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});
