import React from 'react'
import {View, SafeAreaView, ScrollView, Dimensions, Image} from 'react-native'
import {createDrawerNavigator, createSwitchNavigator, DrawerItems} from 'react-navigation'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {Provider} from 'react-redux'
import {Root} from 'native-base'
import {StackNavigator} from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import AboutScreen from './screens/AboutScreen'
import SavedTripScreen from './screens/SavedTripScreen'
import DayDetailScreen from './screens/DayDetailScreen'
import DayPickerScreen from './screens/DayPickerScreen'
import reduxStore from './store'
import Tab from './Auth/Tab'
import loading from './Auth/loading'
import SignIn from './Auth/signin'

const {width} = Dimensions.get('window')

export default class App extends React.Component {
  render() {
    return (
      <Provider store={reduxStore}>
      <Root>
        <AppDrawNavigator />
      </Root>
      </Provider>
    )
  }
}

// This is the Drawer Navigator
const CustomDrawComponent = props => (
  <SafeAreaView style={{flex: 1}}>
    <View
      style={{
        height: 150,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image source={require('./assets/passanger.png')} style={{height: 80, width: 80}} />
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
const AppDrawNavigator = createDrawerNavigator(
  {
    Home: HomeScreen,
    SignIn: Tab,
    SavedTrip: SavedTripScreen,
    NewTrip: TabNavigation,
    About: AboutScreen,
  },

  {
    contentComponent: CustomDrawComponent,
    // drawerWidth: width
    contentOptions: {
      activeTintColor: '#2196f3',
    },
  }
)
// const AppSwitchNavigator = createSwitchNavigator(
//   {
//     drawer: AppDrawNavigator,
//     tab: Tab,
//     load: loading,
//     signin: SignIn,
//   },
//   {
//     initialRouteName: 'drawer',
//   }
// )
