import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

const CardList = ({ cardListData, card, navigation }) => {
    return (
        <View>
            {/* <FlatList
                data={cardListData}
                renderItem={(item) => card({ cardData: item.item, navigation: navigation })}
                keyExtractor={item => item.key}
            /> */}
            <View>
                {cardListData.map((item) => (
                    <View key={item.key}>{card({ cardData: item, navigation: navigation })}</View>
                ))}
            </View>
        </View>
    )
}

export default CardList

const styles = StyleSheet.create({})
