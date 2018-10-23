import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import allReducers from '../reducer';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { Container, Header, View, Card, CardItem, Text, Left, Body, Icon } from 'native-base';

const store = createStore(allReducers);

class SavedTripScreen extends Component {
    
    render() {
        return (
            <View style={{flex:1}}>
                <Header>
                    <Left>
                        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()}></Icon>
                    </Left>
                </Header>
                <Container>
                    <ScrollView>
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
                                    <Image style={{ height: 300, flex: 1 }} source={item.image}/>
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
