import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Button, Text, Layout, Card } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import Badge from './Badge'

const ProposalCardSummary = ({ cardData, navigation }) => {
    return (
        <Card style={styles.card}>
            <View style={styles.rowContainer}>
                <Text style={commonStyles.secondaryTextGrey}>ID: {<Text> {cardData.id} </Text>} </Text>
                <Badge status={cardData.status} />
            </View>
            <Text style={commonStyles.secondaryTextGrey}>Header: {<Text> {cardData.header} </Text>} </Text>
            <View style={styles.container}>
                <Text style={commonStyles.secondaryTextGrey}>Votes:</Text>
                <View style={styles.container}>
                    <View style={{ marginLeft: '10%' }}></View>
                    <Text style={commonStyles.primaryTextOrange}> Yes {<Text> {cardData.id} </Text>} </Text>
                    <View style={{ marginLeft: '10%' }}></View>
                    <Text style={commonStyles.primaryTextOrange}> No {<Text> {cardData.id} </Text>} </Text>
                </View>
                <View style={{ marginLeft: 'auto' }}></View>
                <Button
                    style={styles.footerControl}
                    onPress={() => navigation.navigate('ProposalDetails', {cardData})}
                    size='small'>
                    DETAILS
                </Button>
            </View>
        </Card>
    )
}

export default ProposalCardSummary;

const styles = StyleSheet.create({
    card: {
        margin: 4,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flexDirection: 'row'
    }
})
