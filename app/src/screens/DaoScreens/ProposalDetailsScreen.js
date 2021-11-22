import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import commonStyles from '../../commonStyles'
import ProposalCardDetail from '../../components/ProposalCardDetail'
import { Button } from '@ui-kitten/components'
import EmptySpace from '../../components/EmptySpace'

const ProposalDetailsScreen = ({ route, navigation}) => {

    return (
        <View style={commonStyles.pageView}>
            <View style={commonStyles.pageContent}>
                <EmptySpace />
                <ProposalCardDetail cardData={route.params.cardData} />
            </View>
            <Button
                style={commonStyles.rowButtonContainer}
                onPress={() => navigation.goBack()}
                status='warning'>
                Back
            </Button>
        </View>
    )
}

export default ProposalDetailsScreen

const styles = StyleSheet.create({})
