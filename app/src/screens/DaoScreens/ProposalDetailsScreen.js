import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import commonStyles from '../../commonStyles'
import ProposalCardDetail from '../../components/ProposalCardDetail'
import { Button } from '@ui-kitten/components'
import EmptySpace from '../../components/EmptySpace'

const ProposalDetailsScreen = ({ route, navigation }) => {

    return (
        <View style={commonStyles.pageView}>
            <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false}>
                <EmptySpace />
                <ProposalCardDetail cardData={route.params.cardData} />
                <EmptySpace space={30} />
            </ScrollView>
            <View style={commonStyles.rowButtonContainer}>
                <Button
                    style={commonStyles.singleButton}
                    onPress={() => navigation.goBack()}
                    status='warning'>
                    Back
                </Button>
            </View>
        </View>
    )
}

export default ProposalDetailsScreen

const styles = StyleSheet.create({})
