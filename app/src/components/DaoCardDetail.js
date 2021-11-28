import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, Layout, Card } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import { backgrounds } from '../colors'

const DaoCardDetail = ({ cardData, navigation }) => {
    return (
        <Card style={{backgroundColor:'#F8F8F8', ...commonStyles.card}}>
                <View style={styles.nameContainer}>
                    <Text style={styles.headerText} category='h3'>{cardData.title}</Text>
                    <Text style={styles.dynamicText} category='s1'>({cardData.token})</Text>
                </View>
                <Text style={commonStyles.primaryTextOrange}>About</Text>
                <View style={styles.rowContainer}>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Creator: {<Text style={styles.dynamicText}> 8283944992 </Text>} </Text>
                        <Text style={commonStyles.secondaryTextGrey}>Total token: {<Text style={styles.dynamicText}> {cardData.amount/1000}K </Text>} </Text>
                    </View>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Symbol: {<Text style={styles.dynamicText}> {cardData.token} </Text>} </Text>
                        <Text style={commonStyles.secondaryTextGrey}>Address: {<Text style={styles.dynamicText}> {cardData.address} </Text>} </Text>
                    </View>
                </View>
                <Text style={commonStyles.primaryTextOrange}>Description</Text>
                <Text style={styles.dynamicText}>
                    This is the best company in the world.
                </Text>
            </Card>
    )
}

export default DaoCardDetail;

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    dynamicText: {
        color: '#9C9DA0',
        paddingLeft: 6 
    },
    headerText: {
        color: '#404248'
    }
})
