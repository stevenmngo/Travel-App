import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { Button, Header, Left, Right, Icon, Item, Body, Title, Thumbnail } from 'native-base'

import DateTimePicker from 'react-native-modal-datetime-picker';

class DayPickerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isDateTimePickerVisibleStart: false,
            isDateTimePickerVisibleEnd: false,
            startDate: new Date().toLocaleString(),
            endDate: new Date().toLocaleString(),
            totalDays: 0
        };
        // These line is to bind this key word
        this._showDateTimePickerStart = this._showDateTimePickerStart.bind(this);
        this._showDateTimePickerEnd = this._showDateTimePickerEnd.bind(this);
        this._hideDateTimePickerStart = this._hideDateTimePickerStart.bind(this);
        this._hideDateTimePickerEnd = this._hideDateTimePickerEnd.bind(this);
        this._handleDatePickedStart = this._handleDatePickedStart.bind(this);
        this._handleDatePickedEnd = this._handleDatePickedEnd.bind(this);
        this._updateTodayDay = this._updateTodayDay.bind(this);
    }

    // These function is being used to control the datePicker
    _showDateTimePickerStart = () => this.setState(Object.assign(this.state, { isDateTimePickerVisibleStart: true }));
    _showDateTimePickerEnd = () => this.setState(Object.assign(this.state, { isDateTimePickerVisibleEnd: true }));
    _hideDateTimePickerStart = () => this.setState(Object.assign(this.state, { isDateTimePickerVisibleStart: false }));
    _hideDateTimePickerEnd = () => this.setState(Object.assign(this.state, { isDateTimePickerVisibleEnd: false }));

    // This function calculate the total days of the trips
    _updateTodayDay = () => {
        if (this.state.startDate != "" && this.state.endDate != ""){
            let startDateStr = this.state.startDate.split(',')[0]
            startDate = new Date(startDateStr)
            let endDateStr = this.state.endDate.split(',')[0]
            endDate = new Date(endDateStr)
            if (endDate > startDate){
                var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                this.setState(Object.assign(this.state, { totalDays: diffDays}))
            } else {
                this.setState(Object.assign(this.state, { totalDays: 0}))
            }
        }
    }

    // Function handle Start Day confirm
    _handleDatePickedStart = (date) => {
        console.log('A date has been picked: ', date);
        this.setState(Object.assign(this.state, { startDate: date.toLocaleString()}))
        this._hideDateTimePickerStart()
        this._updateTodayDay()
    };

    // Function handle End Day confirm
    _handleDatePickedEnd = (date) => {
        console.log('A date has been picked: ', date);
        this.setState(Object.assign(this.state, { endDate: date.toLocaleString()}))
        this._hideDateTimePickerEnd()
        this._updateTodayDay()
    };

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
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Start Date</Text>
                    <TouchableOpacity onPress={this._showDateTimePickerStart}>
                        <Text>{this.state.startDate}</Text>
                    </TouchableOpacity>
                    <Text>End Date</Text>
                    <TouchableOpacity onPress={this._showDateTimePickerEnd}>
                        <Text>{this.state.endDate}</Text>
                    </TouchableOpacity >
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisibleEnd}
                        onConfirm={this._handleDatePickedEnd}
                        onCancel={this._hideDateTimePickerEnd}
                    />
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisibleStart}
                        onConfirm={this._handleDatePickedStart}
                        onCancel={this._hideDateTimePickerStart}
                    />
                </View>
            </View>
        )

    }
}

export default DayPickerScreen