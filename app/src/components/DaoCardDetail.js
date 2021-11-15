import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, Layout, Card } from '@ui-kitten/components'
import commonStyles from '../commonStyles'

const DaoCardDetail = ({ cardData, navigation }) => {
    return (
        <Card style={styles.card} >
            <View style={styles.nameContainer}>
                <Text category='h3'>{cardData.title}</Text>
                <Text category='s1'>({cardData.token})</Text>
            </View>
            <Text style={commonStyles.primaryTextOrange}>About</Text>
            <View style={styles.rowContainer}>
                <View>
                    <Text style={commonStyles.secondaryTextGrey}>Creator: {<Text> 8283944992 </Text>} </Text>
                    <Text style={commonStyles.secondaryTextGrey}>Total token: {<Text> {cardData.amount} </Text>} </Text>
                </View>
                <View>
                    <Text style={commonStyles.secondaryTextGrey}>Symbol: {<Text> {cardData.token} </Text>} </Text>
                    <Text style={commonStyles.secondaryTextGrey}>Value ($): {<Text> {cardData.value} </Text>} </Text>
                </View>
            </View>
            <Text style={commonStyles.primaryTextOrange}>Description</Text>
            <Text>
                This is the best company in the world.
            </Text>
        </Card>
    )
}

export default DaoCardDetail;

const styles = StyleSheet.create({
    card: {
        // flex: 1,
        margin: 4,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    rowContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    }
})
