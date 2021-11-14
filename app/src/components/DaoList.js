import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import DaoCard from './DaoCard'

const DaoList = ({ data, navigation }) => {
    return (
        <View>
            <ScrollView>
                {data.map((item) => (
                    <DaoCard daoData={item} navigation={navigation} key={item.title}/>
                ))}
            </ScrollView>
        </View>
    )
}

export default DaoList

const styles = StyleSheet.create({
      
})
