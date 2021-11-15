import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, Layout, Card } from '@ui-kitten/components'

const DaoCardSummary = ({cardData, navigation, withButton = true}) => {

    function openProject(data) {
        navigation.navigate('DaoHomeScreen', { data: data })
    }

    const Header = (cardData) => (
        <View>
            <Text category='h6'>{cardData.title}</Text>
            <Text category='s1'>{cardData.token}</Text>
        </View>
    );

    return (
        <Card style={styles.card} header={Header(cardData)}>
            <Text>Total Project Token: {cardData.amount} </Text>
            <Text>Value ($): {cardData.value}</Text>
            <View style={styles.footerContainer}>
                {withButton && <Button
                    style={styles.footerControl}
                    onPress={() => openProject(cardData)}
                    size='small'>
                    DETAILS
                </Button>}
            </View>
        </Card>
    )
}

export default DaoCardSummary;

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
})
