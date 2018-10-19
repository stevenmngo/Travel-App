import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
const cards = [
    {
        text: 'Card One',
        name: 'One',
        image: require('../assets/passanger.png')
    },
    {
        text: 'Card 2',
        name: 'One',
        image: require('../assets/passanger.png')
    },
    {
        text: 'Card 3',
        name: 'One',
        image: require('../assets/passanger.png')
    },
];
class SavedTripScreen extends Component {
    // static navigationOptions = {
    //     drawerIcon: ({ tintColor }) => (
    //         <Icon name="home" style={{ fontSize: 24, color: tintColor }}></Icon>
    //     )
    // }
    render() {
        return (
            <View style={{flex:1}}>
                <Header>
                    <Left>
                        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()}></Icon>
                    </Left>
                </Header>
                {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>SavedTripScreen</Text>
                </View> */}
                <Container>
                    <View>
                        <DeckSwiper
                            dataSource={cards}
                            renderItem={item =>
                                <Card style={{ elevation: 3 }}>
                                    <CardItem>
                                        <Left>
                                            <Thumbnail source={item.image} />
                                            <Body>
                                                <Text>{item.text}</Text>
                                                <Text note>NativeBase</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Image style={{ height: 300, flex: 1 }} source={item.image} />
                                    </CardItem>
                                    <CardItem>
                                        <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                        <Text>{item.name}</Text>
                                    </CardItem>
                                </Card>
                            }
                        />
                    </View>
                </Container>
            </View>
        )
    }
}

export default SavedTripScreen
