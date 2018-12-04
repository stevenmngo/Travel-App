import React, {Component} from 'react'
import {View, Text, StyleSheet, Styles} from 'react-native'
import {Header, Left, Right, Body, Icon, Thumbnail, Title} from 'native-base'

class AboutScreen extends Component {
  static navigationOption = {
    drawerIcon: ({tintColor}) => <Icon name="settings" style={{fontSize: 24, color: tintColor}} />,
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header>
          <Left>
            <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
            <Title> About </Title>
            {/* <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 20}}> About Let's Travel </Text> */}
          </Body>
          <Right>{/* <Thumbnail small source={require('../assets/group.png')} /> */}</Right>
        </Header>
        <View style={styles.container}>
          <Title style={{fontSize: 25, textAlign: 'center'}}> Let's Travel </Title>
          <Text style={styles.paragraph}>
            {`      Let’s Travel allows you to create and plan your own trips in an organize and effective manner.\n`}
            {`      It provides a list of suggestions on destinations and let's user adds to their planner.\n`}
            {`      Let’s Travel focuses on helping everyone to plan their trip from A to Z with a touch of a button.\n`}
            {`      With Let's Travel, you will have a better trip and never miss any hidden attraction no more.\n`}
          </Text>
          <Text style={{fontSize: 20, textAlign: 'center'}}>
            {`Enjoy, pack your bags and let's travel!\n`}
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center'}}> Version 1.0.0 </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    backgroundColor: '#F5F6FA',
  },
  paragraph: {
    margin: 20,
    fontSize: 18,

    textAlign: 'left',
    color: '#142354',
  },
})

export default AboutScreen
