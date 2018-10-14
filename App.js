import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image} from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';
import HomeScreen from './screens/HomeScreen'
import SettingScreen from './screens/SettingScreen'
import SavedTripScreen from './screens/SavedTripScreen'
import DayDetailScreen from './screens/DayDetailScreen'

// Redux Import
import reduxStore from './store'
import { Provider } from 'react-redux'

const {width} = Dimensions.get('window')

export default class App extends React.Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <AppDrawNavigator />
      </Provider>
    );
  }
}


const CustomDrawComponent = (props) => (
  <SafeAreaView style = {{flex: 1}}>
    <View style = {{height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent:'center'}}>
      <Image source = {require('./assets/passanger.png')} style = {{height: 80, width: 80}}></Image>
    </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)

const AppDrawNavigator = createDrawerNavigator({
  Home: HomeScreen,
  Setting: SettingScreen,
  DayDetail: DayDetailScreen,
  SavedTrip: SavedTripScreen
},{
  contentComponent: CustomDrawComponent,
  // drawerWidth: width
  contentOptions: {
    activeTintColor: "orange"
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
