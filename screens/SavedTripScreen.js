import React, { Component } from 'react';
import { ScrollView, Image,Button, TouchableHighlight} from 'react-native';
import allReducers from '../reducer';
// import { createStore } from 'redux';
import { connect } from 'react-redux';
import { Container, Header, View, Card, CardItem, Text, Left, Right, Body, Icon, Title, Thumbnail } from 'native-base';
import action from '../actions'
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
// const store = createStore(allReducers);

class SavedTripScreen extends Component {
    constructor(props) {
        super(props);
        this.onTripClick = this.onTripClick.bind(this)
    }
    componentWillMount() {
        if (this.props.user.user != null) {
            this.props.fetchSavedTrip(this.props.user.user.uid)
        }
      }

    onTripClick = (tripID) =>{
        // Fetch the choosen Trip and put all info into the store.
        // console.log(tripID)
        this.props.fetchChoosenTrip(String(tripID))

        // this.props.setDate()
        // this.props.saveDayPOI()

        // Write route to the choosen trip set the "Edit" flag to true, 
        // When hit newtrip then the "Edit" flag is false
        // One more variable in store callled "currentTripID" contain the current edit tripID

        // Navigation to DayDetail
        // if (!this.props.fetching){
        //     this.props.navigation.navigate('DayDetail')
        // }
    }
    
    // componentDidUpdate(prevProps) {
    //     if(this.props.fetching){
    //         console.log("here!!")
    //         this.props.navigation.navigate('DayDetail')
    //     }
    // }


    render() {
        // console.log(this.state.savedTrips);
        if (Object.keys(this.props.auth.user).length !== 0){
        return (
            <View style={{flex:1}}>
                <Header>
                    <Left>
                        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()}></Icon>
                    </Left>
                    <Body>
                        <Title> My Trips </Title>
                    </Body>
                    <Right>
                        <Icon name="add" onPress={() => this.props.navigation.navigate('Home')} style ={{marginRight: 20}}></Icon>
                    </Right>
                </Header>
                <Container>
                    <ScrollView>
                        {this.props.savedTrips.map(item => (
                            <Card style={{ elevation: 3 }} key={item.tripID}>
                                <CardItem>
                                    <Left>
                                        <Body>
                                            <Text>{item.tripName}</Text>
                                            <Text>{item.totalDay.toString().concat(" days   ").concat(item.startDay.substring(0, 10).concat(" to ").concat(item.endDay.substring(0, 10)))}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <TouchableHighlight onPress={() => this.onTripClick(item.tripID)}>
                                    <Image style={{ height: 150, width: 390, resizeMode: 'cover',  flex: 1 }} source={{uri: 
                                        'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=' +
                                        item.destinationImage +
                                        '&key=AIzaSyD7Oa99Y264n7KesaO7LWB-OGmSUntkPHI'
                                    }}/>
                                    </TouchableHighlight>
                                    
                                </CardItem>
                                <CardItem>
                                    <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                    <Text>{item.destination}</Text>
                                    {/* <Button onPress={() => this.ignoreTrip(item.tripID)} */}
                                    <Button onPress={() => this.props.removeSavedTrip(item.tripID, this.props.user.user.uid)}
                                    title="Delete"
                                    color="#841584"
                                    />
                                </CardItem>
                                
                            </Card>
                        ))}
                        }

                    </ScrollView>
                </Container>
            </View>
        )
    }
    else{
        return(
            <View>
            <Header>
                    <Left>
                        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()}></Icon>
                    </Left>
                    <Body>
                        <Title> My Trips </Title>
                    </Body>
                    <Right>
                        <Icon name="add" onPress={() => this.props.navigation.navigate('Home')} style ={{marginRight: 20}}></Icon>
                        
                    </Right>
                </Header>
            <View>
            <Image source={require('../assets/fatty.png')} style={{width:"100%"}} />
            
        </View>
        <View>
            <Text style={{fontSize: 24, fontWeight: "bold", textAlign: "center", margin:20}}>You must sign in first!</Text>
            <RaisedTextButton color= "#2196f3" title="Sign in" onPress={()=> this.props.navigation.navigate('SignIn')}/>
        </View>
        </View>
        )
    }
}
}
    
const mapDispatchToProps = dispatch => ({
    fetchSavedTrip: uid => dispatch(action.SavedTripAction.fetchSavedTrip(uid)),
    fetchChoosenTrip: tripID => dispatch(action.SavedTripAction.fetchChoosenTrip(tripID)),
    removeSavedTrip: (tripID, uid)  => { dispatch(action.SavedTripAction.removeSavedTrip(tripID)), dispatch(action.SavedTripAction.fetchSavedTrip(uid))},
    // setDate: (dayInfo) => dispatch(action.DayPickerAction.setDate(dayInfo)),
    // saveDayPOI: (dayPOIInput) => dispatch(action.DayDetailAction.saveDayPOI(dayPOIInput))
})

const mapStateToProps = state => ({
    savedTrips: state.savedTrips.savedTrips,
    currentTrip: state.savedTrips.currentTrip,
    fetching: state.savedTrips.fetching,
    user: state.auth.user,
    auth: state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedTripScreen)
