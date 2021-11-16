import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import commonStyles from '../commonStyles'
import { Button, Text, Layout, Card, Icon, Input, Datepicker, PopoverPlacements } from '@ui-kitten/components'

const CreateProposal = ({navigation}) => {
    const [description, setDescription] = React.useState('');
    const [header, setHeader] = React.useState('');
    const today = new Date();
    const [startDate, setStartDate] = React.useState(today);
    const [endDate, setEndDate] = React.useState();

    const CalendarIcon = (props) => (
        <Icon {...props} name='calendar' />
    );

    return (
        <View style={commonStyles.pageView}>
            <View style={styles.formView}>
                <Text style={commonStyles.secondaryTextGrey}>Enter Proposal Details</Text>
                <Input
                    style={styles.input}
                    value={header}
                    onChangeText={header => setHeader(header)}
                    placeholder=''
                    label="Header"
                />
                <Input
                    style={styles.input}
                    onChangeText={setDescription}
                    value={description}
                    label='Description'
                    multiline
                    numberOfLines={4}
                />
                <View style={styles.datePickerContainer}>
                    <Datepicker
                        min={today}
                        date={startDate}
                        label={'Start date: '}
                        onSelect={nextStartDate => { setStartDate(nextStartDate); setEndDate('') }}
                        accessoryRight={CalendarIcon}
                        backdropStyle={styles.backdrop}
                    />
                    <Text style={{ ...styles.toText, ...commonStyles.secondaryTextGrey }}> To </Text>
                    <Datepicker
                        min={startDate}
                        date={endDate}
                        label={'End date: '}
                        onSelect={nextEndDate => setEndDate(nextEndDate)}
                        accessoryRight={CalendarIcon}
                        placement={PopoverPlacements.BOTTOM_END}
                        backdropStyle={styles.backdrop}
                    />
                </View>
            </View>
            <View style={styles.rowContainer}>
                <Button
                    style={commonStyles.doubleButton}
                    onPress={() => navigation.goBack(null)}>
                    BACK
                </Button>
                <Button
                    style={commonStyles.doubleButton}
                    // onPress={addFounder}
                    appearance='outline'>
                    Publish
                </Button>
            </View>
        </View>
    )
}

export default CreateProposal

const styles = StyleSheet.create({
    input: {
        margin: 4,
    },
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    formView: {
        padding: '3%',
    },
    toText: {
        marginTop: 25
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
})
