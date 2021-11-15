import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'

const CardList = ({ cardListData, card, navigation }) => {
    return (
        <View>
            <ScrollView>
                {cardListData.map((item) => (
                    <View key={item.key}>{card({cardData: item, navigation: navigation})}</View>
                ))}
            </ScrollView>
        </View>
    )
}

export default CardList

const styles = StyleSheet.create({})
