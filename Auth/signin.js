import React from 'react'
import {Text, View, StyleSheet, Image} from 'react-native'
import {Button, Header, Left, Right, Icon, Body, Title, Thumbnail} from 'native-base'
import {connect} from 'react-redux'

import Input from '../dummyComponents/input'
import Buttons from '../dummyComponents/Buttons'
import {authenticate} from '../actions/AuthAction'

import firebase from './firebase'

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: '', password: ''}
  }

  // createUserInDatabe = (id, email) => {
  //   const userObject = {userID: id, userEmail: email}
  //   fetch('http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/user/createUser', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(userObject),
  //   })
  //     .then(response => {
  //       console.log('++++++++++++++++success from creteuser in databse++++++++++++++++')
  //       console.log(response)
  //     })
  //     .catch(error => {
  //       console.log(
  //         '++++++++++++++++error from create user in database++++++++++++++++++++++++++++++++++++++++++++++++'
  //       )
  //       console.error(error)
  //     })
  // }

  handleLogin = () => {
    this.props.dispatchAuthenticate(this.state.email, this.state.password)

    // setTimeout(() => {
    //   if (Object.keys(this.props.auth.user).length !== 0) {
    //     const userID = this.props.auth.user.uid

    //     const string = `http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/user/?userid ='${userID}'`
    //     console.log(
    //       `++++++++++++++++here id  '${string}' ++++++++++++++++++++++++++++++++++++++++++++++++`
    //     )
    //     fetch(string)
    //       .then(res => {
    //         res.json()
    //         console.log(
    //           `++++++++++++++++here first then '${res.json()}' ++++++++++++++++++++++++++++++++++++++++++++++++`
    //         )
    //       })
    //       .then(idofUser => {
    //         console.log(
    //           '++++++++++++++++here at then in the login++++++++++++++++++++++++++++++++++++++++++++++++'
    //         )
    //         if (Object.keys(idofUser).length === 0) {
    //           this.createUserInDatabe(userID, this.state.email)
    //         }
    //       })
    //       .catch(error => {
    //         console.log(
    //           '++++++++++++++++error from login++++++++++++++++++++++++++++++++++++++++++++++++'
    //         )
    //         console.error(error)
    //       })
    //   }
    // }, 5300)

    setTimeout(() => {
      if (Object.keys(this.props.auth.user).length !== 0) {
        if (
          Object.keys(this.props.destination.Destination).length !== 0 &&
          Object.keys(this.props.date.dayInfo).length !== 0 &&
          Object.keys(this.props.poi.dayPOI).length !== 0
        ) {
          this.props.navigation.navigate('New Trip')
        } else {
          this.props.navigation.navigate('New Trip')
        }
      }
    }, 2300)
  }

  render() {
    const {
      auth: {signInErrorMessage, isAuthenticating, signInError},
    } = this.props
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
          <Right>{/* <Thumbnail small source={require('../assets/group.png')} /> */}</Right>
        </Header>
        <View style={styles.container}>
          {/* {this.state.errorMessage && <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>} */}
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
          <Buttons isLoading={isAuthenticating} title="Sign In" onPress={this.handleLogin} />
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
  destination: state.home,
  date: state.DayPickerReducer,
  poi: state.DayDetailReducer,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)

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
