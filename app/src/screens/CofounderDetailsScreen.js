import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  Divider,
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

export default function CofounderDetailsScreen({navigation}) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const tableHeader = ['phone', 'Address', 'Token(21000000)', 'Amount(2100)'];
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
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Phone:</Text>
            <TextInput
              value={phone}
              onChangeText={input => setPhone(input)}
              style={commonStyles.inputStyle}
              placeholder="9999-999-999"
            />
            <Text style={styles.modalText}>Address:</Text>
            <TextInput
              value={address}
              onChangeText={input => setAddress(input)}
              style={commonStyles.inputStyle}
              placeholder="0x12uwidhiu2eh3e3dh239dh3dd3"
            />
            <Text style={styles.modalText}>Token:</Text>
            <TextInput
              value={token}
              onChangeText={input => setToken(input)}
              style={commonStyles.inputStyle}
              placeholder="7000000"
            />
            <Text style={styles.modalText}>Deposit:</Text>
            <TextInput
              value={amount}
              onChangeText={input => setAmount(input)}
              style={commonStyles.inputStyle}
              placeholder="700"
            />
            <Pressable
              style={[commonStyles.primaryButton]}
              onPress={addFounder}>
              <Text style={styles.textStyle}>Add member</Text>
            </Pressable>
            <Pressable
              style={[commonStyles.primaryButton]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>back</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={commonStyles.backSection}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateDao')}>
          <Text> Back </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.FormBox}>
        <View style={styles.phoneBox}>
          <Text>Total token to mint: </Text>
        </View>
        <View style={styles.phoneBox}>
          <Text>Total amount to deposit: </Text>
        </View>

        <View style={styles.tableBox}>
          <Text style={{marginVertical: 8}}>Co founder Details</Text>
          <Table borderStyle={{borderWidth: 2, borderColor: '#000'}}>
            <Row data={tableHeader} style={styles.tableHeader} />
            <Rows data={tableData} style={styles.tableRow} />
          </Table>

          <TouchableOpacity
            style={commonStyles.primaryButton}
            onPress={() => setModalVisible(true)}>
            <Text>Add a Co-founder</Text>
          </TouchableOpacity>

          <View style={{height: '20%'}} />

          <TouchableOpacity
            style={commonStyles.primaryButton}
            onPress={() => navigation.navigate('Review')}>
            <Text>Review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    alignItems: 'center',
  },
  tableHeader: {
    height: 40,
    width: '100%',
    backgroundColor: '#f1f8',
  },
  tableRow: {
    // height: 36,
    width: '100%',
    backgroundColor: '#3a7b',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: 16,
    marginBottom: 8,
  },
});
