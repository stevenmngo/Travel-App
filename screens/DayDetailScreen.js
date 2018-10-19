import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { Header, Left, Right, Icon, Container, Tab, Tabs, ScrollableTab, Button } from 'native-base'

class DayDetailScreen extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Header>
                    <Left>
                        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()}></Icon>
                    </Left>
                </Header>
                {/*<Header hasTabs/>*/}
                <Tabs renderTabBar = {()=> <ScrollableTab/>} >
                    <Tab heading = "Tab1"> 
                        <Text>Tab 1</Text>
                    </Tab>
                    <Tab heading = "Tab2"> 
                        <Text>Tab 2</Text>
                    </Tab>
                    <Tab heading = "Tab3"> 
                        <Text>Tab 3</Text>
                    </Tab>
                    <Tab heading = "Tab4"> 
                        <Text>Tab 4</Text>
                    </Tab>
                    <Tab heading = "Tab5"> 
                        <Text>Tab 5</Text>
                    </Tab>
                </Tabs>
            </View>
        )
    }
}

export default DayDetailScreen
