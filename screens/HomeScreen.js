import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native'
import {Header, Left, Right, Icon, Item} from 'native-base'

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
            ]
        }
        this.setSelected = this.setSelected.bind(this)
    }

    setSelected = (selectedCiti) =>{
        this.props.selectCiti(selectedCiti)
    }
    static navigationOptions = {
        drawerIcon: ({tintColor}) =>(
            <Icon name="home" style={{fontSize: 24, color: tintColor}}></Icon>
            )
        }

    render(){
        return (
            <View style = {{flex :1}}>
                <Header>
                    <Left>
                        <Icon name = "menu" onPress={()=> this.props.navigation.openDrawer()}></Icon>
                    </Left>
                </Header>
                <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <TextInput
                        placeholder = 'Search Places...'
                        style={{ width: '50%', height: 40, alignItems: 'center', justifyContent: 'center'}}
                        onChangeText={(stateCity) => this.setState({ stateCity })}
                        value={this.state.stateCity}
                    />
                    <Text>Current Selected City</Text>
                    <Text>{this.props.selectedCiti}</Text>
                </View>
                <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <FlatList
                        data={this.state.Cities}
                        renderItem={({ item }) => <Text onPress={() => this.setSelected(item.key)} style={{ padding: 10, fontSize: 18, height: 44 }}>{item.key}</Text>}
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
