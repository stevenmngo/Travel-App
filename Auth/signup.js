import React from 'react'
import {StyleSheet, Text, Image, View, Alert} from 'react-native'
import firebase from 'react-native-firebase'

import Input from '../dummyComponents/input'
import Button from '../dummyComponents/Button'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: '', password: '', confirmedPassword: ''}
  }

  handleSignUp = () => {
    if (this.state.password !== this.state.passwordConfirm) {
      Alert.alert('Passwords do not match')
      return
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('tab'))
      .catch(error => {
        Alert.alert(error.message)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image
            source={require('../assets/boomboxcropped.png')}
            style={styles.headingImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.greeting}>Welcome,</Text>
        <Text style={styles.greeting2}>sign up to continue</Text>
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
          <Input
            placeholder="Confirmed Password"
            onChangeText={confirmedPassword => this.setState({confirmedPassword})}
            value={this.state.confirmedPassword}
            secureTextEntry
          />
        </View>
        <Button title="Sign In" onPress={this.handleLogin} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
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
  heading: {
    flexDirection: 'row',
  },
  headingImage: {
    width: 38,
    height: 38,
  },
})
