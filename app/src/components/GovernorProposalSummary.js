import React from 'react'
import { StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native'
import { Button, Text, Layout, Card } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import Badge from './Badge'
import { formatAddress, formatNumber, copyToClipboard } from '../services/FormatterService';
import { colorPairs } from '../colors'

const GovernorProposalSummary = ({ cardData, navigation }) => {
    let num = (Math.floor((Math.random() * 100))) % colorPairs.length;
    console.log("SHOULD GET DATA:", cardData)
    
    
    return (
        <View style={commonStyles.outerCard}>
            <View style={{ ...commonStyles.innerCard, backgroundColor: colorPairs[num].background }}>
                <ImageBackground source={require('../../assets/images/proposal.png')} style={{ height: 250, justifyContent: 'space-between' }}>
                    <View style={commonStyles.row}>
                        <Text style={commonStyles.secondaryTextGrey}>ID: {<Text style={{ color: colorPairs[num].text, fontWeight: 'bold' }}> {Number(cardData.key) + 1} </Text>} </Text>
                        <Text style={commonStyles.secondaryTextGrey}>State: {<Text style={{ color: colorPairs[num].text, fontWeight: 'bold' }}> {Number(cardData.proposalState)} </Text>} </Text>

                        {/* <Badge status={cardData.isActive} /> */}
                    </View>
                    
                    <View>
                        <TouchableOpacity style={styles.container} onPress={() => copyToClipboard(cardData.proposalId)}>
                            <Text style={commonStyles.tertiaryTextBlack}>ProposalId: </Text>
                            <Text style={commonStyles.activeText}>{formatAddress(cardData.proposalId)}</Text>
                        </TouchableOpacity>
                        {/* <Text style={commonStyles.secondaryTextGrey}>ProposalId: {<Text style={{ color: colorPairs[num].text, fontWeight: 'bold' }}> {cardData.proposalId} </Text>} </Text> */}
                        {/* <View style={styles.container}> */}
                        <View>
                            {/* <Text style={commonStyles.secondaryTextGrey}>Votes:</Text>
                            <View style={{ marginLeft: '10%' }}></View> */}
                            <Text style={commonStyles.primaryTextGreen}> Start Date {<Text style={{ color: colorPairs[num].text, fontWeight: 'bold' }}> {cardData.votingStartDate} </Text>} </Text>
                            <View style={{ marginLeft: '10%' }}></View>
                            <Text style={commonStyles.primaryTextRed}> End Date {<Text style={{ color: colorPairs[num].text, fontWeight: 'bold' }}> {cardData.votingEndDate} </Text>} </Text>
                        </View>
                        <View style={{marginLeft: 'auto', marginTop: 2}}>
                            <Button
                                style={commonStyles.button}
                                onPress={() => navigation.navigate('GovernorProposalDetails', { cardData })}
                                size='small'
                                status='info'>
                                Details
                            </Button>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>
    )
}

export default GovernorProposalSummary;

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
    dynamicText: {
        color: '#FFFFFF'
    }
})