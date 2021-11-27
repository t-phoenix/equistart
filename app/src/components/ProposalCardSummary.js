import React from 'react'
import { StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native'
import { Button, Text, Layout, Card } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import Badge from './Badge'
import { colorPairs } from '../colors'

const ProposalCardSummary = ({ cardData, navigation }) => {
    let num = (Math.floor((Math.random() * 100))) % colorPairs.length;
    return (
        <Card style={commonStyles.card}>
            <Card style={{ backgroundColor: colorPairs[num].background, ...styles.dynamicCard }}>
                <ImageBackground source={require('../../assets/images/company.png')} style={{ height: 300, justifyContent: 'space-between' }}>
                    <View style={styles.rowContainer}>
                        <Text style={commonStyles.secondaryTextGrey}>ID: {<Text style={{ color: colorPairs[num].text, fontWeight: 'bold' }}> {cardData.id} </Text>} </Text>
                        <Badge status={cardData.status} />
                    </View>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Header: {<Text style={{ color: colorPairs[num].text, fontWeight: 'bold' }}> {cardData.header} </Text>} </Text>
                        <Text style={commonStyles.secondaryTextGrey}>Votes:</Text>
                        <View style={styles.container}>
                            <View style={{ marginLeft: '10%' }}></View>
                            <Text style={commonStyles.primaryTextGreen}> Yes {<Text style={{ color: colorPairs[num].text, fontWeight: 'bold' }}> {cardData.id} </Text>} </Text>
                            <View style={{ marginLeft: '10%' }}></View>
                            <Text style={commonStyles.primaryTextRed}> No {<Text style={{ color: colorPairs[num].text, fontWeight: 'bold' }}> {cardData.id} </Text>} </Text>
                            <View style={{ marginLeft: 'auto' }}></View>
                            <Button
                                style={commonStyles.button}
                                onPress={() => navigation.navigate('ProposalDetails', { cardData })}
                                size='small'
                                status='info'>
                                Details
                            </Button>
                        </View>
                    </View>
                </ImageBackground>
            </Card>
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
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flexDirection: 'row'
    },
    dynamicCard: {
        borderRadius: 15,
        marginHorizontal: '-4%',
        marginVertical: '-2%'
    },
    dynamicText: {
        color: '#FFFFFF'
    }
})
