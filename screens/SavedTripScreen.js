import React, { Component } from 'react';
import { ScrollView, Image,Button, TouchableHighlight} from 'react-native';
import allReducers from '../reducer';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { Container, Header, View, Card, CardItem, Text, Left, Right, Body, Icon } from 'native-base';

const store = createStore(allReducers);

class SavedTripScreen extends Component {
    state = {ignore: []}
    ignoreTrip(trip_name) {
        var ignoreList = this.state.ignore;
        ignoreList.push(trip_name);
        this.setState({
            ignore: ignoreList
        })
    }
    render() {
        return (
            <View style={{flex:1}}>
                <Header>
                    <Left>
                        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()}></Icon>
                    </Left>
                    <Right>
                        <Icon name="add" onPress={() => this.props.navigation.navigate('Home')}></Icon>
                    </Right>
                </Header>
                <Container>
                    <ScrollView>
                        {this.props.savedTrips.filter(item => this.state.ignore.indexOf(item.trip_name) === -1).map(item => (
                            <Card style={{ elevation: 3 }}>
                                <CardItem>
                                    <Left>
                                        <Body>
                                            <Text>{item.trip_name}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                             
                                <TouchableHighlight onPress={() => this.props.navigation.navigate('DayDetail')}>
                                    <Image style={{ height: 150, width: 390, resizeMode: 'contain',  flex: 1 }} source={item.image}/>
                                    </TouchableHighlight>
                                    
                                </CardItem>
                                <CardItem>
                                    <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                    <Text>{item.destination}</Text>
                                    <Button onPress={() => this.ignoreTrip(item.trip_name)}
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
    savedTrips: state.savedTrips
})

export default connect(mapStateToProps)(SavedTripScreen)
