import React from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Linking,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import commonStyles from '../../commonStyles';
import { COLORS } from '../../colors';
import { Button } from '@ui-kitten/components';

const windowHeight = Dimensions.get('window').height;

export default function GovernorInfo({ navigation }) {
    return (
        <SafeAreaView style={commonStyles.pageView}>
            <ScrollView>
                <View style={styles.contentBox}>
                    <Text>Instructions:</Text>
                    <Text>create a proposal</Text>
                    <Text>Ex. grant in ERC20 token from gov treasury</Text>
                    <Text>params: token --x tokenAddress, callData --x teamAddress, grantAmount</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contentBox: {
        //backgroundColor:'#fff',
        margin: '5%',
        padding: '5%',
    },
    buttonBox: { alignItems: 'center', paddingHorizontal: 8 },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    descriptionText: {
        fontSize: 14,
        fontWeight: '400',
        color: 'white',
    },
    specialText: {
        marginVertical: 8,
        fontSize: 16,
        color: COLORS.robinsEggBlue,

    },
    hyperlinkBtn: {
        color: 'white',
        textDecorationLine: 'underline',
    },
});
