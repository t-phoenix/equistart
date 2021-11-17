import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const EmptySpace = ({space = 10}) => {
    return (
        <View style={{marginVertical: space}}>
        </View>
    )
}

export default EmptySpace

const styles = StyleSheet.create({
})
