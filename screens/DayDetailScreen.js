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
            tags: 'restaurant',
        }

        this.fetchPlaces = this.fetchPlaces.bind(this)
    }

    fetchPlaces = () => {
        this.props.fetchSuggestionPOI(this.state.tags, this.props.Destination.geometry.location)
    }

    componentWillMount(){
        this.fetchPlaces()

    }

    componentDidUpdate(prevProps) {
        if (prevProps.Destination.name !== this.props.Destination.name) {
            this.fetchPlaces();
        }
    }


    render() {
        const renderAll = this.props.fetchedPOI.map(b => {  
            return (
                <ListItem key = {b.name}>
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
                    <Text style={{ textAlign: "center" }}>{b.name}</Text>
                </ListItem>
            )
        });
        const renderedTabs = this.state.day.map(b => {
            const renderedPOI = b.list.map(a =>{
                return(
                    <ListItem key={a}>
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
                        <View>
                            <Text>Hello</Text>
                        </View>
                        {renderAll}
                    </Tab>
                </Tabs>  
            </View>
        )
    }
}

const mapStateToProps = state => ({
    fetchedPOI: state.DayDetailReducer.fetchedPOI,
    Destination: state.home.Destination,
})

const mapDispatchToProps = dispatch => ({
    fetchSuggestionPOI: (tags, location) => dispatch(action.DayDetailAction.fetchSuggestionPOI(tags, location))
})

export default connect (
    mapStateToProps,
    mapDispatchToProps
) (DayDetailScreen)

// export default DayDetailScreen
