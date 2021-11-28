import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Button, Text, Layout, Card } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import { backgrounds } from '../colors'

const DaoCardSummary = ({ cardData, navigation, withButton = true }) => {

    function openProject(data) {
        navigation.navigate('DaoHomeScreen', { data: data })
    }

    return (
        <Card style={{ ...commonStyles.card, padding: 0 }}>
            <Card style={{ backgroundColor: backgrounds[(Math.floor((Math.random() * 100))) % backgrounds.length], ...styles.card }}>
                <View>
                    <View>
                        <ImageBackground source={require('../../assets/images/company.png')} style={{height: 100, justifyContent: 'space-between'}}>
                            <View>
                                <Text style={commonStyles.secondaryTextBlack}>{cardData.title}</Text>
                                <Text style={commonStyles.tertiaryTextGrey}>{cardData.token}</Text>
                            </View>
                            {withButton && <Button
                                style={{width: 72.5 ,...commonStyles.button}}
                                onPress={() => openProject(cardData)}
                                size='small'
                                status='info'>
                                Details
                            </Button>}
                        </ImageBackground>
                    </View>
                </View>
            </Card>
            <Text style={commonStyles.tertiaryTextGrey}>Total Project Token: {cardData.amount} </Text>
            <Text style={commonStyles.tertiaryTextGrey}>Value ($): {cardData.value}</Text>
        </Card>
    )
}

export default DaoCardSummary;

const styles = StyleSheet.create({
    card: {
        marginHorizontal: '-7.5%',
        marginTop: '-5.3%',
        marginBottom: 5,
        borderRadius: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
