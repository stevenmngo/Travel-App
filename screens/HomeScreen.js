import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, Image} from 'react-native'
import {Button, Header, Left, Right, Icon, Item, Body, Title, Thumbnail} from 'native-base'

// Redux Import
import {connect} from 'react-redux'

import action from '../actions'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stateCity: '',
      Cities: [
        {key: 'San Jose'},
        {key: 'San Francisco'},
        {key: 'San Diego'},
        {key: 'San Mateo'},
        {key: 'San Bernanio'},
      ],
      APIResult: [],
    }
    this.setSelected = this.setSelected.bind(this)
    this.realTimeSearch = this.realTimeSearch.bind(this)
  }

  setSelected = stateCity =>{
      this.props.selectCiti(stateCity)
      this.props.navigation.navigate('DayPicker')
  }
  realTimeSearch = stateCity => {
    // Set the current state value
    this.setState({stateCity})
    this.props.requestResult(stateCity)
  }

  static navigationOptions = {
    drawerIcon: ({tintColor}) => <Icon name="home" style={{fontSize: 24, color: tintColor}} />,
  }

    render(){
        // const uri = "../assets/IMG_4640.JPG";
        // const photo = this.props.Destination.photos[0].html_attributions[0] || "../assets/lasvegas.jpg" 
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

                <View style = {styles.container}>
                    <Item searchBar rounded>
                        <Icon name = "ios-search" /> 
                        <TextInput
                            placeholder = 'Search Places'
                            style={{ width: '100%', height: 40, alignItems: 'center', justifyContent: 'center'}}
                            onChangeText={(stateCity) => this.realTimeSearch(stateCity)}
                            value={this.state.stateCity}
                        />
                    </Item>
                </View>

                <View style = {{flex:1, alignItems:'center', justifyContent:'center', height: 5}}>
                    <FlatList
                        data={this.props.searchResult}
                        renderItem={({ item }) => <Text id={item.structured_formatting.main_text} onPress={() => this.setSelected(item)} style={{ padding: 10, fontSize: 18, height: 44 }}>{item.structured_formatting.main_text}</Text>}
                    />
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ marginTop: 10, marginBottom: 10, textAlign: 'center' }}>
                        Selected City
                    </Text>
                    <Text style={{ marginTop: 0, marginBottom: 10, textAlign: 'center' }}>
                        {this.props.selectedCiti.structured_formatting.main_text}
                    </Text>
                    {/* <Image
                        style={{ width: 50, height: 50 }}
                        // source={require("../assets/lasvegas.jpg")}
                        source={{ uri: photo }}
                    /> */}
                    {/* <Text style={{ marginTop: 0, marginBottom: 10, textAlign: 'center' }}>
                        {this.props.Destination.photos[0].html_attributions[0] || "hello"}
                    </Text> */}
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    selectedCiti: state.home.SelectedDestination,
    searchResult: state.home.searchResult,
    Destination: state.home.Destination
})

const mapDispatchToProps = dispatch => ({
    selectCiti: citi => { dispatch(action.HomeAction.selectDestination(citi)), dispatch(action.HomeAction.fetchDestination(citi)) },
    requestResult: input => dispatch(action.HomeAction.fetchSuggestionDestination(input))
})

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        padding: 2,
    }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

//style = {{flex:1, alignItems:'center', justifyContent:'center'}}