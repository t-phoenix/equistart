import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

import commonStyles from '../commonStyles';
import {COLORS} from '../colors';

export default function DaoListScreen({navigation}) {

  const data = [{key: 0, title: "Equistart", token: "EQI", amount: "21000000", value: "0.0001" }, {key: 1, title: "Company2", token: "CMP2", amount: "100000", value: "1"}]


  function openProject(data){
    console.log(data.title)
    navigation.navigate('DaoHomeScreen', {data: data})
  }

  const projectThumbnail = ({item}) => {
    return(
      <TouchableOpacity style={styles.thumbnail} onPress={()=>openProject(item)}>
         <Text>Project: {item.title}</Text>
         <Text>Token: {item.token}</Text>
         <Text>Total Project Token: {item.amount} </Text>
         <Text>Value ($): {item.value}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.pageView}>
      <View style={styles.createDaoSection}>
        <TouchableOpacity style={commonStyles.primaryButton} onPress={()=>{navigation.navigate('CreateDao')}}>
          <Text>Create New Project</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.DaoListBox} >
        <Text>List of all DAO's</Text>
        <FlatList
          data = {data}
          renderItem = {projectThumbnail}
          
        />
        {/* {data.map(item => projectThumbnail(item))} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageView: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#8E8E8E',
  },
  createDaoSection: {
    height: '16%',
    width: '80%',
    backgroundColor: '#012233',
    paddingHorizontal: '14%',
    paddingTop: '4%',
    alignItems: 'center',
  },
  DaoListBox: {
    height: '80%',
    width: '90%',
    backgroundColor: '#4F965E',
    marginVertical: '4%',
    padding: '4%',
  },
  thumbnail: {
    borderWidth: 2,
    backgroundColor: '#fff321',
    margin: 8,
    padding: 8,
  }
});
