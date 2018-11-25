import React, { Component } from 'react';
import { ScrollView, Image,Button, TouchableHighlight} from 'react-native';
import allReducers from '../reducer';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { Container, Header, View, Card, CardItem, Text, Left, Right, Body, Icon, Title, Thumbnail } from 'native-base';

const store = createStore(allReducers);

class SavedTripScreen extends Component {
    state = {savedTrips: [], ignore: []}
    componentDidMount() {
        let userid = 12; // fix me!
        fetch(`http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/trip/savedtrips?userid=${userid}`)
          .then(res => res.json())
          .then(trips =>
            this.setState({
              savedTrips: trips
            })
          );
      }


    ignoreTrip(tripID) {
        var ignoreList = this.state.ignore;
        ignoreList.push(tripID);
        this.setState({
            ignore: ignoreList
        });
        fetch("http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/trip/deletetrip", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tripID: tripID,
            })
          }).then(response => {
          });
    }
    render() {
        console.log(this.state.savedTrips);
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
                        <Thumbnail small source={require('../assets/group.png')} />
                    </Right>
                </Header>
                <Container>
                    <ScrollView>
                        {this.state.savedTrips.filter(item => this.state.ignore.indexOf(item.tripID) === -1).map(item => (
                            <Card style={{ elevation: 3 }}>
                                <CardItem>
                                    <Left>
                                        <Body>
                                            <Text>{item.tripName}</Text>
                                            <Text>{item.totalDay.toString().concat(" days   ").concat(item.startDay.substring(0, 10).concat(" to ").concat(item.endDay.substring(0, 10)))}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                             
                                <TouchableHighlight onPress={() => this.props.navigation.navigate('DayDetail')}>
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
                                    <Button onPress={() => this.ignoreTrip(item.tripID)}
                                    title="Delete"
                                    color="#841584"
                                    />
                                </CardItem>
                                
                            </Card>
                        ))}
                    </ScrollView>
                </Container>
            </View>
        )
    }
}


const mapStateToProps = state => ({
    oldSavedTrips: state.savedTrips
})

export default connect(mapStateToProps)(SavedTripScreen)
