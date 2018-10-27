import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Header, Left, Right, Icon, Tab, Tabs, ScrollableTab, Button, ActionSheet, Content} from 'native-base'


var BUTTONS = ["Day 1", "Day 2", "Day 3", "Uncheck", "Cancel"];
var REMOVE = ["Remove"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

class DayDetailScreen extends Component {
    constructor(props)
    {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={{flex:1}}>
                <Header>
                    <Left>
                        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()}></Icon>
                    </Left>
                </Header>
                <Tabs renderTabBar = {() => <ScrollableTab/>}>
                    <Tab heading = "All POI">
                        <Text style={{textAlign: "center"}}>ALL POI</Text>
                        <Content padder>
                        <Button onPress={() => ActionSheet.show({
                            options: BUTTONS,
                            cancelButtonIndex: CANCEL_INDEX,
                            destructiveButtonIndex: DESTRUCTIVE_INDEX,
                            title: "Select Day to be added"    
                        }, 
                        buttonIndex => {
                            this.setState({clicked: BUTTONS[buttonIndex]}) 
                        }
                        )}>
                            <Icon name='add'/>
                        </Button>
                        </Content>
                    </Tab>
                    <Tab heading = "Day1">
                        <Text style={{textAlign: "center"}}>DAY 1</Text>
                        <Content padder>
                        <Button onPress={() => ActionSheet.show({
                            options: REMOVE,
                            title: "Remove POI"    
                        }, 
                        buttonIndex => {
                            this.setState({clicked: BUTTONS[buttonIndex]}) 
                        }
                        )}>
                            <Icon name='remove'/>
                        </Button>
                        </Content>
                    </Tab>
                    <Tab heading = "Day2">
                        <Text style={{textAlign: "center"}}>DAY 2</Text>
                        <Content padder>
                        <Button onPress={() => ActionSheet.show({
                            options: REMOVE,
                            title: "Remove POI"    
                        }, 
                        buttonIndex => {
                            this.setState({clicked: BUTTONS[buttonIndex]}) 
                        }
                        )}>
                            <Icon name='remove'/>
                        </Button>
                        </Content>
                    </Tab>
                    <Tab heading = "Day3">
                        <Text style={{textAlign: "center"}}>DAY 3</Text><Content padder>
                        <Button onPress={() => ActionSheet.show({
                            options: REMOVE,
                            title: "Remove POI"    
                        }, 
                        buttonIndex => {
                            this.setState({clicked: BUTTONS[buttonIndex]}) 
                        }
                        )}>
                            <Icon name='remove'/>
                        </Button>
                        </Content>
                    </Tab>
                    <Tab heading = "Day4">
                        <Text style={{textAlign: "center"}}>DAY 4</Text><Content padder>
                        <Button onPress={() => ActionSheet.show({
                            options: REMOVE,
                            title: "Remove POI"    
                        }, 
                        buttonIndex => {
                            this.setState({clicked: BUTTONS[buttonIndex]}) 
                        }
                        )}>
                            <Icon name='remove'/>
                        </Button>
                        </Content>
                    </Tab>
                    <Tab heading = "Day5">
                        <Text style={{textAlign: "center"}}>DAY 5</Text>
                        <Content padder>
                        <Button onPress={() => ActionSheet.show({
                            options: REMOVE,
                            title: "Remove POI"    
                        }, 
                        buttonIndex => {
                            this.setState({clicked: BUTTONS[buttonIndex]}) 
                        }
                        )}>
                            <Icon name='remove'/>
                        </Button>
                        </Content>
                    </Tab>
                </Tabs>   
            </View>
        )
    }
}

export default DayDetailScreen
