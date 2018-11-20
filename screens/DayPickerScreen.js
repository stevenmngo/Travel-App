import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { Button, Header, Left, Right, Icon, Item, Body, Title, Thumbnail } from 'native-base'

import DateTimePicker from 'react-native-modal-datetime-picker';
import DatepickerRange from 'react-native-range-datepicker';

class DayPickerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            startDate: new Date(),
            untilDate: new Date(),
            totalDays: 0
        };
        this.onSubmmit = this.onSubmmit.bind(this)
    }

    onSubmmit(startDate, untilDate){
        let startDay = Date.parse(startDate)
        let endDay = Date.parse(untilDate)
        let timeDiff = Math.abs(endDay - startDay);
        let totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        console.log(totalDays)
        this.setState({ startDate, untilDate, totalDays})
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon name="menu" onPress={() => this.props.navigation.openDrawer()}></Icon>
                            </Button>
                        </Left>
                        <Body>
                            <Title>Pick Date</Title>
                        </Body>
                        <Right>
                            <Thumbnail small source={require('../assets/group.png')} />
                        </Right>
                    </Header>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Total Days</Text>
                    <Text>{this.state.totalDays}</Text>
                    <DatepickerRange
                        selectedBackgroundColor= 'red'
                        selectedTextColor= 'white'
                        todayColor= 'red'
                        buttonColor= 'red'
                        startDate = '13052017'
                        untilDate = '26062017'
                        onConfirm = {(startDate, untilDate) => this.onSubmmit(startDate, untilDate)}
                    />
                </View>
            </View>
        )

    }
}

export default DayPickerScreen