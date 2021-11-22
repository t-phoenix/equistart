import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import commonStyles from '../../commonStyles'
import { Button, Text, Layout, Card, Icon, Input, Datepicker, PopoverPlacements } from '@ui-kitten/components'
import EmptySpace from '../../components/EmptySpace'

const CreateProposal = ({ navigation }) => {
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
            <ScrollView style={commonStyles.pageContent} showsVerticalScrollIndicator={false}>
                <EmptySpace />
                <Text style={commonStyles.secondaryTextGrey}>Enter Proposal Details</Text>
                <Input
                    style={commonStyles.input}
                    value={header}
                    onChangeText={header => setHeader(header)}
                    placeholder="Header"
                    label={() => <Text style={commonStyles.inputLabel}> Header </Text>}
                />
                <Input
                    style={commonStyles.input}
                    onChangeText={setDescription}
                    value={description}
                    label={() => <Text style={commonStyles.inputLabel}> Description </Text>}
                    placeholder='Description'
                    multiline
                    numberOfLines={4}
                />
                <View style={styles.datePickerContainer}>
                    <Datepicker
                        controlStyle={commonStyles.input}
                        min={today}
                        date={startDate}
                        label={() => <Text style={commonStyles.inputLabel}> Start date  </Text>}
                        onSelect={nextStartDate => { setStartDate(nextStartDate); setEndDate('') }}
                        accessoryRight={CalendarIcon}
                        backdropStyle={styles.backdrop}
                    />
                    <Text style={{ ...styles.toText, ...commonStyles.secondaryTextGrey }}> To </Text>
                    <Datepicker
                        controlStyle={commonStyles.input}
                        min={startDate}
                        date={endDate}
                        label={() => <Text style={commonStyles.inputLabel}> End date  </Text>}
                        onSelect={nextEndDate => setEndDate(nextEndDate)}
                        accessoryRight={CalendarIcon}
                        placement={PopoverPlacements.BOTTOM_END}
                        backdropStyle={styles.backdrop}
                    />
                </View>
            </ScrollView>
            <View style={styles.rowContainer}>
                <Button
                    style={commonStyles.doubleButton}
                    onPress={() => navigation.goBack(null)}
                    status='warning'>
                    Back
                </Button>
                <Button
                    style={commonStyles.doubleButton}
                // onPress={addFounder}
                >
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
        marginTop: 30
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
})
