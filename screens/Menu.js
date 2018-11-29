import React from 'react'
import {View, SafeAreaView, ScrollView, Text, Image, StyleSheet} from 'react-native'
import {createDrawerNavigator, DrawerItems} from 'react-navigation'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {connect} from 'react-redux'

import Tab from '../Auth/Tab'
import signOut from '../Auth/signout'

import HomeScreen from './HomeScreen'
import AboutScreen from './AboutScreen'
import SavedTripScreen from './SavedTripScreen'
import DayDetailScreen from './DayDetailScreen'
import DayPickerScreen from './DayPickerScreen'

class Menu extends React.Component {
  render() {
    if (Object.keys(this.props.auth.user).length !== 0) {
      return <AppDrawNavigator02 />
    }

    return <AppDrawNavigator01 />
  }
}

// This is the Drawer Navigator
const CustomDrawComponent02 = props => (
  <SafeAreaView style={{flex: 1}}>
    <View
      style={{
        height: 150,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image source={require('../assets/passanger.png')} style={{height: 80, width: 80}} />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)
const CustomDrawComponent01 = props => (
  <SafeAreaView style={{flex: 1}}>
    <View
      style={{
        height: 150,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image source={require('../assets/passanger.png')} style={{height: 80, width: 80}} />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

// This is the tab Navigator for NewTrip
const TabNavigation = createMaterialBottomTabNavigator({
  Destination: {screen: HomeScreen},
  DayPicker: {screen: DayPickerScreen},
  DayDetail: {screen: DayDetailScreen},
})

// This is the main Navigator for the app
const AppDrawNavigator01 = createDrawerNavigator(
  {
    "Home": HomeScreen,
    "New Trip": TabNavigation,
    "Saved Trip": SavedTripScreen,
    "Sign In": Tab,
    "About": AboutScreen,
  },

  {
    contentComponent: CustomDrawComponent01,
    // drawerWidth: width
    contentOptions: {
      activeTintColor: '#2196f3',
    },
  }
)

const AppDrawNavigator02 = createDrawerNavigator(
  {
    "Home": HomeScreen,
    "New Trip": TabNavigation,
    "Saved Trip": SavedTripScreen,
    "Sign Out": signOut,
    "About": AboutScreen,
  },

  {
    contentComponent: CustomDrawComponent02,
    // drawerWidth: width
    contentOptions: {
      activeTintColor: '#2196f3',
    },
  }
)

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
})
