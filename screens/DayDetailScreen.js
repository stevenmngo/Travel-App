import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Header, Left, Right, Icon, Tab, Tabs, ScrollableTab, Button, ActionSheet, Content, ListItem, Body, Title,
    Thumbnail, TextInput, FlatList} from 'native-base'
import { connect } from 'react-redux'

import action from '../actions'

var BUTTONS = ["Day 1", "Day 2", "Day 3", "Day 4", "Cancel"];
var REMOVE = ["Remove"];
var CANCEL_INDEX = 4;
const days = [1, 2, 3, 4, 5, 6]

class DayDetailScreen extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            all: [
                " MN Peak",
                " MD Peak",
                " MT Peak",
                " MY Peak",
                " MI Peak",
                " MO Peak",
                " MQ Peak",
            ],
            day: [
                {
                    day: 1,
                    list: [" Mission Peak", " Mission Peak2", " Mission Peak3"]
                },
                {
                    day: 2,
                    list: [" Mission Peak", " Mission Peak2", " Mission Peak3"]
                },
                {
                    day: 3,
                    list: [" Mission Peak", " Mission Peak2", " Mission Peak3"]
                },
            ],
            stateCity: ' ',
            APIResult: [],
        }
        this.setSelected = this.setSelected.bind(this)
        this.realTimeSearch = this.realTimeSearch.bind(this)
    }

    setSelected = stateCity => {
        this.props.selectCiti(stateCity)
    }

    realTimeSearch = stateCity => {
        this.setState({stateCity})
        this.props.requestResult(stateCity)
    }

    render() {
        const renderAll = this.state.all.map(b => {  
            return (
                <ListItem>
                    <Button onPress={() => ActionSheet.show({
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        title: "Select Day to be added"
                    },
                        buttonIndex => {
                            this.setState({ clicked: BUTTONS[buttonIndex] })
                        }
                    )}>
                        <Icon name='add' />
                    </Button>
                    <Text style={{ textAlign: "center" }}>{b}</Text>
                </ListItem>
            )
        });
        const renderedTabs = this.state.day.map(b => {
            const renderedPOI = b.list.map(a =>{
                return(
                    <ListItem>
                    <Button onPress={() => ActionSheet.show({
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        title: "Select Day to be added"
                    },
                    buttonIndex => {
                        this.setState({ clicked: BUTTONS[buttonIndex] })
                    }
                    )}>
                        <Icon name='add' />
                    </Button> 
                    <Text style={{ textAlign: "center" }}>{a}</Text>
                    </ListItem>
                )
            })
            return (<Tab heading={"Day " + b.day}>
                        <Text style={{textAlign: "center"}}>DAY {b.day}</Text>
                        {renderedPOI}
                    </Tab>)
        });
        return (
            <View style={{flex:1}}>
                <Header>
                    <Left>
                        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()}></Icon>
                    </Left> 
                    <Body style={{}}>
                        <Title> Planner </Title>
                    </Body>
                    <Right>
                        <Thumbnail small source={require('../assets/group.png')} />
                    </Right>
                </Header>
                
                {/* render day tab  */}
                <Tabs renderTabBar = {() => <ScrollableTab/>}>
                    {renderedTabs}
                </Tabs>   

                {/* render All POI  */}
                <Tabs renderTabBar = {() => <ScrollableTab/>}>
                    <Tab heading="ALL">
                        {/* Search tab bar */}
                        {/*<TextInput
                            placeholder='Search Places...'
                            style={{ width: '50%', height: 40, alignItems: 'center', justifyContent: 'center' }}
                            onChangeText={(stateCity) => this.realTimeSearch(stateCity)}
                            value={this.state.stateCity}
                        />
                        <Text style={{ marginTop: 0, marginBottom: 10 }}>Current Selected City</Text>
                        <Text>{this.props.selectedCiti}</Text>*/}
                        <View>
                            {/* Search tab bar */}
                            <TextInput
                                placeholder='Search Places...'
                                style={{ width: '50%', height: 40, alignItems: 'center', justifyContent: 'center' }}
                                onChangeText={(stateCity) => this.realTimeSearch(stateCity)}
                                value={this.state.stateCity}
                            />
                            <Text style={{ marginTop: 0, marginBottom: 10 }}>Current Selected City</Text>
                            <Text>{this.props.selectedCiti}</Text>
                        </View>
                        {renderAll}
                    </Tab>
                </Tabs>  
            </View>
        )
    }
}

const mapStateToProps = state => ({
    selectedCiti: state.DayDetailReducer.SelectedDestination,
    searchResult: state.DayDetailReducer.searchResult
})

const mapDispatchToProps = dispatch => ({
    selectCiti: citi => dispatch(action.DayDetailAction.selectDestination(citi)),
    requestResult: input => dispatch(action.DayDetailAction.fetchSuggestionDestination(input))
})

{/*export default connect (
    mapStateToProps,
    mapDispatchToProps
) (DayDetailScreen)*/}

export default DayDetailScreen
