import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import commonStyles from '../commonStyles';

const Badge = ({status}) => {
    if(status){
        return (
            <View style={styles.activeBadge}>
                <Text style={commonStyles.tertiaryTextGreen}>Active</Text>
            </View>
        )
    }
    else{
        return (
            <View style={styles.closedBadge}>
                <Text style={commonStyles.tertiaryTextRed}>Closed</Text>
            </View>
        );
    }
}

export default Badge

const styles = StyleSheet.create({
    activeBadge: {
        borderColor: '#00d142',
        backgroundColor: 'rgba(237, 255, 243, 0.2)',
        borderWidth: 1,
        paddingLeft: 7,
        paddingTop: 3,
        borderRadius: 20,
        height: 30,
        width: 55
    },
    closedBadge: {
        borderColor: '#cc2525',
        backgroundColor: 'rgba(255, 191, 191, 0.2)',
        borderWidth: 1,
        paddingLeft: 5,
        paddingTop: 3,
        borderRadius: 20,
        height: 30,
        width: 55
    }
})
