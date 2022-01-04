import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import commonStyles from '../commonStyles';

const Badge = ({ status }) => {
    if (status) {
        return (
            <View style={styles.activeBadge}>
                <Text style={commonStyles.tertiaryTextGreen}>Active</Text>
            </View>
        )
    }
    else {
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
        borderColor: '#29A47E',
        backgroundColor: 'rgba(41,164,126,0.2)',
        borderWidth: 1,
        borderRadius: 20,
        height: 30,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closedBadge: {
        borderColor: '#cc2525',
        backgroundColor: 'rgba(255, 191, 191, 0.2)',
        borderWidth: 1,
        borderRadius: 20,
        height: 30,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
