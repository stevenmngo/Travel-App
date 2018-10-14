import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {Header, Left, Right, Icon, Item} from 'native-base'

// Redux Import
import { connect } from 'react-redux'
import action from '../actions'

class Home extends Component{
    constructor(props) {
        super(props)
        this.state = { 
            selectedCiti: '',
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
        // this.setState(Object.assign(this.state, { selectedCiti: selectedCiti}))
        this.props.selectCiti(selectedCiti)
    }
    static navigationOptions = {
        drawerIcon: ({tintColor}) =>(
            <Icon name="home" style={{fontSize: 24, color: tintColor}}></Icon>
            )
        }

    render(){
        return (
            <View style = {styles.container}>
                <Header>
                    <Left>
                        <Icon name = "menu" onPress={()=> this.props.navigation.openDrawer()}></Icon>
                    </Left>
                </Header>
                <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
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

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})