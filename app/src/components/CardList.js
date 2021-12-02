import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import EmptySpace from './EmptySpace'

const CardList = ({ cardListData, card, navigation }) => {
    return (
        <View>
            <EmptySpace />
            {cardListData.map((item) => (
                <View>
                    <View key={item.key}>{card({ cardData: item, navigation: navigation })}</View>
                    <EmptySpace key={item.key} />
                </View>
            ))}
        </View>
    )
}

export default CardList

const styles = StyleSheet.create({})
