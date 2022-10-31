import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Button, Text, Icon, Spinner, Input} from '@ui-kitten/components';
import {Dimensions} from 'react-native';
import GovernorCardDetail from '../../components/GovernorCardDetail';
import GovernorProposalSummary from '../../components/GovernorProposalSummary';
import CardList from '../../components/CardList';
import commonStyles from '../../commonStyles';
import {backgrounds, COLORS} from '../../colors';
import {Platform} from 'react-native';
import EmptySpace from '../../components/EmptySpace';

import {
  getProposerRole,
  getExecutorRole,
  getAdminRole,
  checkHasRole,
  grantTimelockRole,
} from '../../services/GovernorServices/MyGovernorService';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {
  formatNumber,
  formatAddress,
  copyToClipboard,
} from '../../services/FormatterService';
import Toast from 'react-native-simple-toast';

export default function GovernorSettingScreen({route, navigation}) {
  const connector = useWalletConnect();
  const [roles, setRoles] = React.useState({
    proposer: '0x0000000000000000000000000000000000000000',
    executor: '0x0000000000000000000000000000000000000000',
    admin: '0x0000000000000000000000000000000000000000',
  });

  //   const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isWalletConnected, setIsWalletConnected] = React.useState(
    connector.connected,
  );

  const [roleAddr, setRoleAddr] = React.useState('');
  const [userAddr, setUserAddr] = React.useState('');
  const [roleResult, setRoleResult] = React.useState('bool');
  const [grantResult, setGrantResult] = React.useState('txn');
  //   const [treasuryBal, setTreasuryBal] = React.useState('Enter token address');

  const scrollViewRef = React.useRef();

  const governorData = route.params.data;

  React.useEffect(() => {
    setIsWalletConnected(connector.connected);
    console.log('Settings Screen:', governorData);
    getRoleAddresses();
  }, [connector.connected]);

  async function getRoleAddresses() {
    // try {
    console.log('Hello');
    let propROLE = await getProposerRole(governorData.timelock);
    let execROLE = await getExecutorRole(governorData.timelock);
    let adminROLE = await getAdminRole(governorData.timelock);
    console.log('Timelock:');
    console.log(
      'Proposer:',
      propROLE,
      'executor:',
      execROLE,
      'admin:',
      adminROLE,
    );
    const allRoles = {
      proposer: propROLE,
      executor: execROLE,
      admin: adminROLE,
    };
    setRoles(() => allRoles);
  }

  async function checkRole() {
    let result = await checkHasRole(governorData.timelock, roleAddr, userAddr);
    console.log('TRUE/FALSE: ', result);
    setRoleResult(() => String(result));
  }

  async function grantRole() {
    console.log("hellolollollo")
    let result = await grantTimelockRole(
      connector,
      governorData.timelock,
      roleAddr,
      userAddr,
    );
    console.log('Granting role', result);
    // setGrantResult(() => result);
  }

  return (
    <SafeAreaView style={commonStyles.pageView}>
      <ScrollView
        style={commonStyles.pageContent}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}>
        <View>
          <Text>This is Settings Screen</Text>
          {/* //TODO: print copyable role Addresses: admin, governor, executor
            //TODO: function to check 'hasRole'
            //TODO: function to 'grantRole'
            //TODO: function to 'renounceRole' */}
          <Button
            style={commonStyles.button}
            onPress={() => getRoleAddresses(governorData)}
            accessoryLeft={<Icon name="refresh-outline" />}
            status="warning"
          />
          <EmptySpace />

          <View>
            <View style={commonStyles.rowButtonContainer}>
              <Text>PROPOSER: </Text>
              <TouchableOpacity onPress={() => copyToClipboard(roles.proposer)}>
                <Text style={commonStyles.activeText}>
                  {formatAddress(roles.proposer)}
                </Text>
              </TouchableOpacity>
            </View>
            <EmptySpace />
            <View style={commonStyles.rowButtonContainer}>
              <Text>EXECUTOR: </Text>
              <TouchableOpacity onPress={() => copyToClipboard(roles.executor)}>
                <Text style={commonStyles.activeText}>
                  {formatAddress(roles.executor)}
                </Text>
              </TouchableOpacity>
            </View>
            <EmptySpace />
            <View style={commonStyles.rowButtonContainer}>
              <Text>TIMELOCK_ADMIN: </Text>
              <TouchableOpacity onPress={() => copyToClipboard(roles.admin)}>
                <Text style={commonStyles.activeText}>
                  {formatAddress(roles.admin)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* {!isLoading && !roles.length && <View style={{ alignItems: 'center' }}><EmptySpace space={40} /><Text style={commonStyles.tertiaryTextGrey}>Error</Text></View>}
            {isLoading && <View style={{ alignItems: 'center' }}><EmptySpace space={50} /><Spinner status='basic' /></View>} */}
          <EmptySpace space={18} />
          <Input
            style={commonStyles.input}
            value={roleAddr}
            onChangeText={val => setRoleAddr(val)}
            placeholder="address"
            label={() => (
              <Text style={commonStyles.inputLabel}>Role Address</Text>
            )}
          />
          <Input
            style={commonStyles.input}
            value={userAddr}
            onChangeText={val => setUserAddr(val)}
            placeholder="address"
            label={() => (
              <Text style={commonStyles.inputLabel}>User or Contract</Text>
            )}
          />
          <View>
            <Button
              style={styles.smallButton}
              onPress={checkRole}
              status="warning">
              Check Role
            </Button>
            <EmptySpace />
            <Text style={styles.smallText}>Has Role : {roleResult}</Text>
          </View>
          <EmptySpace space={12} />
          <View>
            <Text>Grant Role only works for Admin</Text>
            <Button
              style={styles.smallButton}
              onPress={grantRole}
              status="warning">
              Grant Role
            </Button>
            <EmptySpace />
            <Text style={styles.smallText}>Grant Role : {grantResult}</Text>
          </View>
          <EmptySpace space={18} />
        </View>
      </ScrollView>

      <View style={commonStyles.rowButtonContainer}>
        <Button
          style={commonStyles.doubleButton}
          onPress={() => navigation.goBack()}
          status="warning">
          Back
        </Button>
        {/* <Button
          style={commonStyles.singleButton}
          onPress={() => {
            navigation.navigate('CreateProposalScreen', {
              data: route.params.data,
            });
          }}>
          Create Prosposal
        </Button> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: '#404248',
  },
  inputLabel: {
    color: '#000',
    fontWeight: 'bold',
  },
  infoButton: {
    width: '30%',
    marginLeft: '70%',
  },
  smallText: {
    fontSize: 12,
    color: COLORS.secondaryWhite,
  },
  smallButton: {},
});
