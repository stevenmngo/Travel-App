import React from 'react'
import {Text, View, StyleSheet, Image} from 'react-native'
import {Button, Header, Left, Right, Icon, Body, Title, Thumbnail} from 'native-base'
import {connect} from 'react-redux'

import Input from '../dummyComponents/input'
import Buttons from '../dummyComponents/Buttons'
import {authenticate} from '../actions/AuthAction'

import firebase from './firebase'

class signOut extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: '', password: ''}
  }

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch(error => {
        // An error happened.
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
            <Title>Sign Out </Title>
          </Body>
          <Right>
            <Thumbnail small source={require('../assets/group.png')} />
          </Right>
        </Header>
        <View style={styles.container}>
          <View style={styles.heading}>
            <Image
              source={require('../assets/signOut.png')}
              style={styles.headingImage}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.greeting2]}>Are you sure you want to sign out?</Text>

          <Buttons title="No" onPress={this.handleLogin} />
          <Buttons title="Yes" onPress={this.handleLogin} />
          <Text style={[styles.errorMessage, signInError && {color: 'orange'}]}>
            Error logging in. Please try again.
          </Text>
          <Text style={[styles.errorMessage, signInError && {color: 'orange'}]}>
            {signInErrorMessage}
          </Text>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = {
  dispatchAuthenticate: (username, password) => authenticate(username, password),
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(signOut)

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
  },
  headingImage: {
    width: 38,
    height: 38,
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: 'transparent',
    fontFamily: 'Arial',
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
