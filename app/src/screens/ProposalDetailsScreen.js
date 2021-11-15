import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import commonStyles from '../commonStyles'
import ProposalCardDetail from '../components/ProposalCardDetail'
import { Button } from '@ui-kitten/components'

const ProposalDetailsScreen = ({ route, navigation}) => {

    return (
        <View style={commonStyles.pageView}>
            {console.log(route)}
            <ProposalCardDetail cardData={route.params.cardData} />
            <Button
                style={commonStyles.singleButton}
                onPress={() => navigation.goBack()}>
                BACK
            </Button>
        </View>
    )
}

export default ProposalDetailsScreen

const styles = StyleSheet.create({})
