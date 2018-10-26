import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Header, Left, Right, Icon, Tab, Tabs, ScrollableTab } from 'native-base'

class DayDetailScreen extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Header>
                    <Left>
                        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()}></Icon>
                    </Left>
                </Header>
                <Tabs renderTabBar = {() => <ScrollableTab/>}>
                    <Tab heading = "Day1">
                        <Text style={{textAlign: "center"}}>DAY 1</Text>
                    </Tab>
                    <Tab heading = "Day2">
                        <Text style={{textAlign: "center"}}>DAY 2</Text>
                    </Tab>
                    <Tab heading = "Day3">
                        <Text style={{textAlign: "center"}}>DAY 3</Text>
                    </Tab>
                    <Tab heading = "Day4">
                        <Text style={{textAlign: "center"}}>DAY 4</Text>
                    </Tab>
                    <Tab heading = "Day5">
                        <Text style={{textAlign: "center"}}>DAY 5</Text>
                    </Tab>
                </Tabs>      
            </View>
        )
    }
}

export default DayDetailScreen
