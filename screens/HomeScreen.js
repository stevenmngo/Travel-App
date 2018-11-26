import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList, TextInput, Image} from 'react-native'
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
    this._keyExtractor = this._keyExtractor.bind(this)
  }

  setSelected = stateCity => {
    this.props.selectCiti(stateCity)
    this.props.navigation.navigate('DayPicker')
  }

  realTimeSearch = stateCity => {
    // Set the current state value
    this.setState({stateCity})
    this.props.requestResult(stateCity)
  }

  _keyExtractor = (item, index) => item.place_id

  static navigationOptions = {
    drawerIcon: ({tintColor}) => <Icon name="home" style={{fontSize: 24, color: tintColor}} />,
  }

  render() {
    let uri_ = ''
    if (this.props.Destination.photos) {
      uri_ =
        'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=' +
        this.props.Destination.photos[0].photo_reference +
        '&key=AIzaSyD7Oa99Y264n7KesaO7LWB-OGmSUntkPHI'
    } else {
      uri_ =
        'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9f4033e517acff897a1536ed69fc9dab&auto=format&fit=crop&w=3289&q=80'
    }
    // const photo = this.props.Destination.photos[0].html_attributions[0] || "../assets/lasvegas.jpg"
    return (
      <View style={{flex: 1}}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
            </Button>
          </Left>
          <Body>
            <Title>Destination</Title>
          </Body>
          <Right>
            {/* <Thumbnail small source={require('../assets/group.png')} /> */}
            <Button iconRight light onPress={() => { this.props.navigation.navigate('DayPicker')}}>
              <Text style={{ marginRight: 10 }}>  Next</Text>
              <Icon name='arrow-forward' />
            </Button>
          </Right>
        </Header>

        <View
          style={{alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20, backgroundColor: '#E7EEF4'}}
        >
          <Text> Trip Name: </Text>
          <TextInput
            placeholder="Enter Trip Name"
            style={{ width: '100%', height: 40, alignItems: 'center', justifyContent: 'center' }}
            onChangeText={tripName => this.props.setTripName(tripName)}
            value={this.props.tripName}
          />
          {/* <TextInput placeholder="Enter Trip Name" placeholderTextColor = "#333D46" /> */}
        </View>

        <Image
          resizeMode="cover"
          style={{width: '100%', height: 200, marginTop: 0, marginBottom: 0}}
          source={{uri: uri_}}
        />
        <Text style={{marginTop: 0, marginBottom: 0, textAlign: 'center'}}>
          {this.props.selectedCiti.structured_formatting.main_text}
        </Text>
        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ marginTop: 0, marginBottom: 0, textAlign: 'center' }}>
                        Selected City
                    </Text>
                </View> */}
        <View style={styles.container}>
          <Item searchBar rounded>
            <Icon name="ios-search" />
            <TextInput
              placeholder="Search Places"
              style={{width: '100%', height: 40, alignItems: 'center', justifyContent: 'center'}}
              onChangeText={stateCity => this.realTimeSearch(stateCity)}
              value={this.state.stateCity}
            />
          </Item>
        </View>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <FlatList
            keyExtractor={this._keyExtractor}
            data={this.props.searchResult}
            renderItem={({item}) => (
              <Text
                id={item.structured_formatting.main_text}
                onPress={() => this.setSelected(item)}
                style={{padding: 2, fontSize: 12, height: 20}}
              >
                {item.structured_formatting.main_text}
              </Text>
            )}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  selectedCiti: state.home.SelectedDestination,
  searchResult: state.home.searchResult,
  Destination: state.home.Destination,
  tripName: state.home.tripName,
})

const mapDispatchToProps = dispatch => ({
  selectCiti: citi => {
    dispatch(action.HomeAction.selectDestination(citi)),
    dispatch(action.HomeAction.fetchDestination(citi))
  },
  requestResult: input => dispatch(action.HomeAction.fetchSuggestionDestination(input)),
  setTripName: name => dispatch(action.HomeAction.setTripName(name)),
})

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 2,
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

// style = {{flex:1, alignItems:'center', justifyContent:'center'}}
