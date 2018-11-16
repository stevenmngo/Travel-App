import {Alert} from 'react-native'

import firebaseApp from '../Auth/firebase'
import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../reducer/AuthReducer'

function signUp() {
  return {
    type: SIGN_UP,
  }
}

function signUpSuccess(user) {
  return {
    type: SIGN_UP_SUCCESS,
    user,
  }
}

function signUpFailure(err) {
  return {
    type: SIGN_UP_FAILURE,
    error: err,
  }
}

export function createUser(email, password) {
  return dispatch => {
    dispatch(signUp())

    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        dispatch(signUpSuccess(data))
        this.props.navigation.navigate('SignIn')
      })
      .catch(error => {
        dispatch(signUpFailure(error))
        // Alert.alert(error.message)
      })
  }
}

function logIn() {
  return {
    type: LOG_IN,
  }
}

export function logOut() {
  return {
    type: LOG_OUT,
  }
}

function logInSuccess(user) {
  return {
    type: LOG_IN_SUCCESS,
    user,
  }
}

function logInFailure(err) {
  return {
    type: LOG_IN_FAILURE,

    error: err,
  }
}

export function authenticate(email, password) {
  return dispatch => {
    dispatch(logIn())

    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(logInSuccess(user))
      })
      .catch(error => {
        dispatch(logInFailure(error))
        // Alert.alert(error.message)
      })
  }
}
