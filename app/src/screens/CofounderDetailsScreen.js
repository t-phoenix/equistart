import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable
} from 'react-native';
import commonStyles from '../commonStyles';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import { Button, Text, Modal, Input, Card } from '@ui-kitten/components';
import { Dimensions } from 'react-native';

export default function CofounderDetailsScreen({ navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const tableHeader = ['phone', 'Address', 'Token', 'Amount'];
  const [tableData, setTableData] = React.useState([
    [
      '7676676766',
      '0x34oh2odno23ndu4ndcwueciwibcbejrbvjsbvn',
      '7000000',
      '700',
    ],
    [
      '2323332232',
      '0xuh43wufbwecbeirbcerwibefjbvwiefnbcvije',
      '7000000',
      '700',
    ],
    // [
    //   '9883232701',
    //   '0xklinfnjcwiejfncefnindcsdcsdkcsskcskdcj',
    //   '7000000',
    //   '700',
    // ],
  ]);

  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [token, setToken] = React.useState('');
  const [amount, setAmount] = React.useState('');

  function addFounder() {
    setModalVisible(!modalVisible);
    console.log(phone);
    tableData.push([phone, address, token, amount]);
  }

  return (
    <View style={commonStyles.pageView}>
      <Modal
        backdropStyle={styles.backdrop}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <Card>
          <View>
            <View>
            <Text style={commonStyles.secondaryTextGrey}>New Member Details</Text>
              <Input
                value={phone}
                onChangeText={input => setPhone(input)}
                placeholder="9999-999-999"
                label="Phone"
              />
              <Input
                value={address}
                onChangeText={input => setAddress(input)}
                label="Address"
                placeholder="0x12uwidhiu2eh3e3dh239dh3dd3"
              />
              <Input
                value={token}
                onChangeText={input => setToken(input)}
                label="Token"
                placeholder="7000000"
              />
              <Input
                value={amount}
                onChangeText={input => setAmount(input)}
                label="Deposit"
                placeholder="700"
              />
              <View style={styles.bottomSection}>
                <Button
                  style={styles.modelButtonGroup}
                  onPress={() => setModalVisible(!modalVisible)}>
                  BACK
                </Button>
                <Button
                  style={styles.modelButtonGroup}
                  onPress={addFounder}
                  appearance='outline'>
                  Add member
                </Button>
              </View>
            </View>
          </View>
        </Card>
      </Modal>

      <View style={styles.page}>
        <Button
          style={styles.button}
          onPress={() => setModalVisible(true)}
          size='small'
          appearance='outline' >
          Add a Co-founder
        </Button>
        <Text style={commonStyles.secondaryTextGrey}>Total token to mint: {<Text style={commonStyles.primaryOrange}> 210000 </Text>} </Text>
        <Text style={commonStyles.secondaryTextGrey}>Total amount to deposit: {<Text style={commonStyles.primaryOrange}> 7000 </Text>}</Text>

        <View style={styles.tableBox}>
          <Text style={commonStyles.secondaryTextGrey}>Co-founder Details</Text>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#333333', borderRadius: 10 }}>
            <Row data={tableHeader} style={styles.tableHeader} textStyle={styles.HeaderTableText} />
            <Rows data={tableData} style={styles.tableRow} textStyle={styles.TableText} />
          </Table>
        </View>
      </View>


      <View style={styles.bottomSection}>
        <Button
          style={styles.buttonGroup}
          onPress={() => navigation.navigate('CreateDao')}>
          BACK
        </Button>
        <Button
          style={styles.buttonGroup}
          onPress={() => navigation.navigate('Review')}
          appearance='outline'>
          Review
        </Button>
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  button: {
    margin: 2,
    width: windowWidth / 3,
    marginLeft: 'auto'
  },
  buttonGroup: {
    margin: 5,
    width: windowWidth / 2.2
  },
  modelButtonGroup: {
    margin: 5,
    width: windowWidth / 3
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  page: {
    marginHorizontal: 10,
    marginVertical: 5
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  FormBox: {
    height: '80%',
    width: '90%',
    marginVertical: '2%',
    backgroundColor: '#E8954B',
  },
  phoneBox: {
    margin: 4,
    display: 'flex',
    flexDirection: 'row',
  },
  tableBox: {
    marginVertical: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tableHeader: {
    height: 40,
    width: '100%',
    backgroundColor: '#e67425',
    alignContent: "center",
  },
  TableText: {
    margin: 5
  },
  HeaderTableText: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  tableRow: {
    // height: 36,
    width: '100%',
    backgroundColor: 'rgba(51, 102, 255, 0.08)'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
});
