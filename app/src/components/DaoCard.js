import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, Layout, Card } from '@ui-kitten/components'

const DaoCard = ({daoData, navigation, withButton = true}) => {

    function openProject(data) {
        navigation.navigate('DaoHomeScreen', { data: data })
    }

    const Header = (daoData) => (
        <View>
            <Text category='h6'>{daoData.title}</Text>
            <Text category='s1'>{daoData.token}</Text>
        </View>
    );

    return (
        <Card style={styles.card} header={Header(daoData)}>
            <Text>Total Project Token: {daoData.amount} </Text>
            <Text>Value ($): {daoData.value}</Text>
            <View style={styles.footerContainer}>
                {withButton && <Button
                    style={styles.footerControl}
                    onPress={() => openProject(daoData)}
                    size='small'>
                    DETAILS
                </Button>}
            </View>
        </Card>
    )
}

export default DaoCard;

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
