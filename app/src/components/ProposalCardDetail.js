import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, Layout, Card } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import Badge from './Badge'

const ProposalCardDetail = ({ cardData }) => {
    const [yesCount, setYesCount] = React.useState(cardData.id);
    const [noCount, setNoCount] = React.useState(cardData.id);
    const [votingStatus, setVotingStatus] = React.useState(false);
    return (
        <View>
            <Card style={styles.card} >
                <View>

                </View>
                <View style={styles.nameContainer}>
                    <Text category='h3'>{cardData.header}</Text>
                    <Badge status={cardData.status} />
                </View>
                <Text style={commonStyles.primaryTextOrange}>Description</Text>
                <Text>
                    This is the best proposal in the world.
                </Text>
                <Text style={commonStyles.primaryTextOrange}>About</Text>
                <View style={styles.rowContainer}>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Creator: {<Text> 8283944992 </Text>} </Text>
                        <Text style={commonStyles.secondaryTextGrey}>Start Date: {<Text> {cardData.amount} </Text>} </Text>
                    </View>
                    <View>
                        <Text style={commonStyles.secondaryTextGrey}>Symbol: {<Text> {cardData.token} </Text>} </Text>
                        <Text style={commonStyles.secondaryTextGrey}>End Date: {<Text> {cardData.value} </Text>} </Text>
                    </View>
                </View>
                <Text style={commonStyles.primaryTextOrange}>Results</Text>
                <View style={styles.bottomSection}>
                    <View style={{ marginLeft: '10%' }}></View>
                    <Text style={commonStyles.secondaryTextGrey}>Yes {<Text> {yesCount} </Text>} </Text>
                    <View style={{ marginLeft: '10%' }}></View>
                    <Text style={commonStyles.secondaryTextGrey}>No {<Text> {noCount} </Text>} </Text>
                </View>
                <View style={styles.voteMessage}>
                    <Text style={commonStyles.primaryTextOrange}>Vote</Text>
                    {votingStatus && <View style={{marginTop: 13, marginLeft: 3}}><Text style={commonStyles.smallTextRed}>(You have Voted)</Text></View>}
                </View>
                <View style={styles.bottomSection}>
                    <Button
                        style={commonStyles.doubleButton}
                        onPress={() => {setYesCount(yesCount + 1); setVotingStatus(true)}}
                        status='success'
                        appearance='outline'
                        disabled={votingStatus}>
                        YES
                    </Button>
                    <Button
                        style={commonStyles.doubleButton}
                        onPress={() => {setNoCount(noCount + 1); setVotingStatus(true)}}
                        appearance='outline'
                        status='danger'
                        disabled={votingStatus}>
                        NO
                    </Button>
                </View>
                
            </Card>
        </View>
    )
}

export default ProposalCardDetail

const styles = StyleSheet.create({
    card: {
        // flex: 1,
        margin: 4,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    footerControl: {
        marginHorizontal: 2,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: '10%'
    },
    voteMessage: {
        flexDirection: 'row'
    }
})
