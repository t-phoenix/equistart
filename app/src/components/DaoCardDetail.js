import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, Layout, Card } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import { backgrounds } from '../colors'
import { formatAddress, formatMobileNumber, formatNumber } from '../services/FormatterService'
import EmptySpace from './EmptySpace'

const DaoCardDetail = ({ cardData, navigation }) => {
    return (
        <View>
            <EmptySpace />
            <View style={{ ...commonStyles.innerCard, backgroundColor: '#F8F8F8' }}>
                <View style={styles.nameContainer}>
                    <Text style={styles.headerText} category='h3'>{cardData.title}</Text>
                    <Text style={styles.text} category='s1'>({cardData.token})</Text>
                </View>
                <Text style={commonStyles.primaryTextOrange}>About</Text>
                <View style={commonStyles.row}>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Creator: {<Text style={styles.text}> {formatMobileNumber('8283944992')} </Text>} </Text>
                        <Text style={commonStyles.secondaryTextGrey}>Total token: {<Text style={styles.text}> {formatNumber(cardData.amount)} </Text>} </Text>
                    </View>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Symbol: {<Text style={styles.text}> {cardData.token} </Text>} </Text>
                        <Text style={commonStyles.secondaryTextGrey}>Address: {<Text style={styles.text}> {formatAddress(cardData.address)} </Text>} </Text>
                    </View>
                </View>
                {/* <Text style={commonStyles.primaryTextOrange}>Description</Text>
                <Text style={styles.text}>
                    This is the best company in the world.
                </Text> */}
            </View>
            <EmptySpace />
        </View>
    )
}

export default DaoCardDetail;

const styles = StyleSheet.create({
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#9C9DA0',
        paddingLeft: 6
    },
    headerText: {
        color: '#404248'
    }
})
