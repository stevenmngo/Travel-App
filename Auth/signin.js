import React from 'react'
import {Text, View, StyleSheet, Image, Alert} from 'react-native'
import {Button, Header, Left, Right, Icon, Body, Title, Thumbnail} from 'native-base'

import Input from '../dummyComponents/input'
import Buttons from '../dummyComponents/Buttons'

import firebaseApp from './firebase'

export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: '', password: ''}
  }

  handleLogin = () => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => {
        Alert.alert(error.message)
      })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
            </Button>
          </Left>
          <Body>
            <Title>Sign In </Title>
          </Body>
          <Right>
            <Thumbnail small source={require('../assets/group.png')} />
          </Right>
        </Header>
        <View style={styles.container}>
          {this.state.errorMessage && <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>}
          <View style={styles.heading}>
            <Image
              source={require('../assets/shape.png')}
              style={styles.headingImage}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.greeting]}>Welcome back,</Text>
          <Text style={[styles.greeting2]}>sign in to continue</Text>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Email"
              onChangeText={email => this.setState({email})}
              value={this.state.email}
            />
            <Input
              placeholder="Password"
              onChangeText={password => this.setState({password})}
              value={this.state.password}
              secureTextEntry
            />
          </View>

          <Buttons title="Sign In" onPress={this.handleLogin} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
  },
  headingImage: {
    width: 38,
    height: 38,
  },

  inputContainer: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  greeting: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: 'Arial',
  },
  greeting2: {
    color: '#666',
    fontSize: 24,
    marginTop: 5,
    fontFamily: 'Courier New',
  },
})
