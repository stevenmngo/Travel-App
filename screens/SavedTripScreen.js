import React, { Component } from 'react';
import { ScrollView, Image, TouchableHighlight} from 'react-native';
import allReducers from '../reducer';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { Container, Header, View, Card, CardItem, Text, Left, Right, Body, Icon } from 'native-base';

const store = createStore(allReducers);

class SavedTripScreen extends Component {
    
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
                    <ScrollView >
                        {this.props.savedTrips.map(item => (
                            <Card style={{ elevation: 3 }}>
                                <CardItem>
                                    <Left>
                                        <Body>
                                            <Text>{item.trip_name}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                             <View>
                                <TouchableHighlight onPress={() => this.props.navigation.navigate('DayDetail')}>
                                    <Image style={{flex: 1,height: 150, width: 390, resizeMode: 'contain'  }} source={item.image}/>
                                </TouchableHighlight>
                                </View>   
                                </CardItem>
                                <CardItem>
                                    <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                    <Text>{item.destination}</Text>
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
