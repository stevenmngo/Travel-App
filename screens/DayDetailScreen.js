import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Header, Left, Right, Icon, Tab, Tabs, ScrollableTab, Button, ActionSheet, Content, ListItem, Body, Title,
    Thumbnail, TextInput, FlatList} from 'native-base'
import { connect } from 'react-redux'

import action from '../actions'

//var BUTTONS = ["Day 1", "Day 2", "Day 3", "Day 4", "Cancel"];
var REMOVE = ["Remove"];
var CANCEL_INDEX = 4;
//const days = [1, 2, 3, 4, 5, 6]

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
            buttons:[ 
                        // {
                        //     buttons: "Day 1"
                        // },
                        // {
                        //     buttons: "Day 2"
                        // }
                "Day 1", "Day 2", "Day 3", "Day 4", "Cancel"
                    ]
        }

        this.fetchPlaces = this.fetchPlaces.bind(this)
    }

    fetchPlaces = () => {
        this.props.fetchSuggestionPOI(this.state.tags, this.props.Destination.geometry.location)
    }

    componentWillMount(){
        this.fetchPlaces()
    }

    componentDidMount(){
        let totalDays = 10
        day = []
        for (let count = 1; count <= totalDays; count++){
            day.push({ day: count, list: []})
        }
        //console.log(day)
        this.setState({day})

        // buttons = []
        // for (let count = 1; count <= totalDays; count++)
        // {
        //     buttons.push({ buttons: "Day " + count})
        // }
        // buttons.push({buttons: "Cancel"})
        // this.setState({buttons})
    }

    componentDidUpdate(prevProps) {
        if (prevProps.Destination.name !== this.props.Destination.name) {
            this.fetchPlaces();
        }
    }

    render() {
        const renderAll = this.props.fetchedPOI.map(b => {  
            return (
                <ListItem key={b.id}>
                    <Button onPress={() => ActionSheet.show({
                        options: this.state.buttons,
                        cancelButtonIndex: CANCEL_INDEX,
                        title: "Select Day to be added"
                    },
                        buttonIndex => {
                            this.setState({ clicked: this.state.buttons[buttonIndex] })
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
                        options: this.state.buttons,
                        cancelButtonIndex: CANCEL_INDEX,
                        title: "Select Day to be added"
                    },
                    buttonIndex => {
                        this.setState({ clicked: this.state.buttons[buttonIndex] })
                    }
                    )}>
                        <Icon name='add' />
                    </Button> 
                    <Text style={{ textAlign: "center" }}>{a}</Text>
                    </ListItem>
                )
            })
            return (<Tab heading={"Day " + b.day} key={b.day}>
                    <ScrollView> 
                        <Text style={{textAlign: "center"}}>DAY {b.day}</Text>
                        {renderedPOI}
                    </ScrollView> 
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
                        <ScrollView> 
                            {renderAll}
                        </ScrollView>
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
