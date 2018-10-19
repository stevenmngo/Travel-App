import React from 'react'
import {Text, View, StyleSheet, Image, Alert} from 'react-native'
import firebase from 'react-native-firebase'

import Input from '../dummyComponents/input'
import Button from '../dummyComponents/Button'

export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  handleLogin = () => {
    const {email, password} = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('drawer'))
      .catch(error => {
        Alert.alert(error.message)
      })
  }

  render() {
    return (
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

        <Button title="Sign In" onPress={this.handleLogin} />
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
})
