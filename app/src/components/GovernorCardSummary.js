import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Button, Text, Layout, Card } from '@ui-kitten/components'
import commonStyles from '../commonStyles'
import { backgrounds } from '../colors'
import EmptySpace from './EmptySpace'
import { formatAddress, formatNumber } from '../services/FormatterService'
import { getTokenName } from '../services/TokenServices/ERC20TokenService'

const GovernorCardSummary = ({ cardData, navigation }) => {

    const [tokenName,setTokenName] = React.useState('');

    React.useEffect(() => {
        console.log("HERE WE ARE:")
        fetchTokenName(cardData);
    }, []);

    async function fetchTokenName(data) {
        try {
            const result = await getTokenName(data.token);
            console.log("TokenName:", result);
            setTokenName(()=>result);
        } catch (error) {
            console.log("ERORO while geting token Name", error);
        }
        
    }


    function openProject(data) {
        navigation.navigate('GovernorHomeScreen', { data: data })
    }

    return (
        <View style={{ ...commonStyles.outerCard}}>
            <View style={{ ...commonStyles.innerCard, backgroundColor: backgrounds[(Math.floor((Math.random() * 100))) % backgrounds.length] }}>
                <ImageBackground source={require('../../assets/images/company.png')}>
                    <View>
                        <Text style={commonStyles.secondaryTextBlack}>{tokenName} Governance</Text>
                    </View>
                    <EmptySpace />
                    <Button
                        style={{ width: 72.5, ...commonStyles.button }}
                        onPress={() => openProject(cardData)}
                        size='small'
                        status='info'>
                        Details
                    </Button>
                </ImageBackground>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={commonStyles.tertiaryTextGrey}>Token Address:  {cardData.token} </Text>
                <Text style={commonStyles.tertiaryTextGrey} selectable={true}>Governor Address:  {cardData.governor}</Text>
            </View>
        </View>
    )
}

export default GovernorCardSummary;

const styles = StyleSheet.create({
    bottomContainer: {
        padding: 10
    }
})
