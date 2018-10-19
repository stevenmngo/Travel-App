import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native'
import { Button, Header, Left, Right, Icon, Item, Body, Title, Thumbnail} from 'native-base'

// Redux Import
import { connect } from 'react-redux'
import action from '../actions'

class Home extends Component{
    constructor(props) {
        super(props)
        this.state = { 
            stateCity: '',
            Cities: [
                { key: "San Jose" },
                { key: "San Francisco" },
                { key: "San Diego" },
                { key: "San Mateo" },
                { key: "San Bernanio" },
            ],
            APIResult: []
        }
        this.setSelected = this.setSelected.bind(this)
        this.realTimeSearch = this.realTimeSearch.bind(this)
    }

    realTimeSearch = (stateCity) => {

        // Set the current state value
        this.setState({ stateCity })

        // Set get suggested places from API
        APItoFectch = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + this.state.stateCity + '&inputtype=textquery&key=AIzaSyD7Oa99Y264n7KesaO7LWB-OGmSUntkPHI'
        fetch(APItoFectch, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                result = responseJson.predictions
                APIResult = []
                for (thing of result){
                    APIResult.push(thing.structured_formatting.main_text)
                }
                this.setState({ APIResult })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    setSelected = (selectedCiti) =>{
        this.props.selectCiti(selectedCiti)
        this.props.navigation.navigate('DayPicker')
    }
    static navigationOptions = {
        drawerIcon: ({tintColor}) =>(
            <Icon name="home" style={{fontSize: 24, color: tintColor}}></Icon>
            )
        }

    render(){
        const uri = "../assets/IMG_4640.JPG";
        return (
            <View style = {{flex :1}}>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name = "menu" onPress={()=> this.props.navigation.openDrawer()}></Icon>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Destination</Title>
                    </Body>
                    <Right>
                        <Thumbnail small source={require('../assets/group.png')} />
                    </Right>
                </Header>
                <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <TextInput
                        placeholder = 'Search Places...'
                        style={{ width: '50%', height: 40, alignItems: 'center', justifyContent: 'center'}}
                        onChangeText={(stateCity) => this.realTimeSearch(stateCity)}
                        value={this.state.stateCity}
                    />
                    <Text style={{marginTop:0, marginBottom: 10}}>Current Selected City</Text>
                    <Text>{this.props.selectedCiti}</Text>
                </View>
                <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <FlatList
                        data={this.state.APIResult}
                        renderItem={({ item }) => <Text id={item} onPress={() => this.setSelected(item)} style={{ padding: 10, fontSize: 18, height: 44 }}>{item}</Text>}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    selectedCiti: state.HomeReducer.SelectedDestination
})

const mapDispatchToProps = dispatch => ({
    selectCiti: citi => dispatch(action.HomeAction.selectDestination(citi))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
