import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  Header,
  Left,
  Right,
  Icon,
  Tab,
  Tabs,
  ScrollableTab,
  Button,
  ActionSheet,
  Content,
  ListItem,
  Body,
  Title,
  Thumbnail,
  TextInput,
  FlatList
} from "native-base";
import { connect } from "react-redux";
import { Alert, TouchableOpacity } from "react-native";
import action from "../actions";

//var BUTTONS = ["Day 1", "Day 2", "Day 3", "Day 4", "Cancel"];
var REMOVE = ["Remove"];
// var CANCEL_INDEX = 4;
//const days = [1, 2, 3, 4, 5, 6]

class DayDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: this.props.savedDayPOI,
      tags: "restaurant",
      buttons: ["Day 1", "Day 2", "Day 3", "Day 4", "Cancel"]
    };
    this.fetchPlaces = this.fetchPlaces.bind(this);
    this.addPOI = this.addPOI.bind(this);
    this.removePOI = this.removePOI.bind(this);
    this.savesTrip = this.savesTrip.bind(this);
  }

  savesTrip = () => {
    console.log("USER:");

    //console.log(this.props.user.user)
    if (this.props.user.user == null) {
      this.props.navigation.navigate("SignIn");
    } else if (this.props.Destination.name === null) {
      this.props.navigation.navigate("Destination");
    } else if (this.props.dayInfo.start === "") {
      this.props.navigation.navigate("DayPicker");
    } else {
      const tripID = Math.floor(Math.random() * 1000000);
      // console.log("PHUC")
      // console.log(tripObject)
      // // Form Object then save
      tripObject = {
        tripName: this.props.tripName,
        destination: this.props.Destination.name,
        destinationImage: this.props.Destination.photos[0].photo_reference,
        destinationID: this.props.Destination.place_id,
        //destinationImage: this.props.Destination.photos[0].photo_reference,
        totalDay: this.props.dayInfo.total,
        tripID: tripID,
        userID: this.props.user.user.uid,
        startDay: this.props.dayInfo.start,
        endDay: this.props.dayInfo.end
      };
      Alert.alert(
        "Successful",
        "Your trip has been saved",
        [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("Saved Trip")
          }
        ],
        { cancelable: false }
      );
      // Check for the flag here and make an update instead of insert new
      fetch(
        "http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/trip/savetrip",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(tripObject)
        }
      ).then(response => {
        console.log(response);
      });
    }
  };

  removePOI = (buttonIndex, poi, day) => {
    console.log(poi.name);
    console.log(buttonIndex);
    days = this.state.days;
    for (thing of days) {
      if (thing.day == day) {
        let newList = [];
        for (let i = 0; i < thing.list.length; i++) {
          console.log(thing.list.length);
          checkResult = thing.list[i];
          console.log(checkResult.name);
          if (checkResult.name != poi.name) {
            //newList = thing.list
            newList.push(checkResult);
          }
        }
        thing.list = newList;
      }
    }

    this.setState({ days });
    this.props.saveDayPOI(days);
  };

  addPOI = (buttonIndex, poi) => {
    days = this.state.days;
    for (thing of days) {
      console.log(thing.day);
      console.log(buttonIndex + 1);
      if (thing.day == buttonIndex + 1) {
        thing.list.push(poi);
        // console.log(thing)
        console.log(poi);
      }
    }

    // select = currentDay[buttonIndex]
    // select.push(poi)
    // day = [...currentDay.slice(0, buttonIndex - 1), select, ...currentDay.slice(buttonIndex + 1, currentDay.length-1) ]
    console.log(days);
    this.setState({ days });
    this.props.saveDayPOI(days);
  };

  fetchPlaces = () => {
    this.props.fetchSuggestionPOI(
      this.state.tags,
      this.props.Destination.geometry.location
    );
  };

  componentWillMount() {
    let days = this.props.savedDayPOI;
    this.setState(days);
    this.fetchPlaces();
  }

  componentDidMount() {
    // let totalDays = 10
    let totalDays = this.props.dayInfo.total;
    days = [];
    for (let count = 1; count <= totalDays; count++) {
      days.push({ day: count, list: [] });
    }
    //console.log(day)
    // this.setState({day})

    buttons = [];
    for (let count = 1; count <= totalDays; count++) {
      // buttons.push({ buttons: "Day " + count})
      buttonday = String("Day " + String(count));
      buttons.push(buttonday);
    }
    buttons.push("Cancel");
    this.setState({ days, buttons });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.Destination.name !== this.props.Destination.name) {
      this.fetchPlaces();
    }
  }

  render() {
    const renderAll = this.props.fetchedPOI.map(b => {
      return (
        <ListItem key={b.id}>
          <Button
            onPress={() =>
              ActionSheet.show(
                {
                  options: this.state.buttons,
                  cancelButtonIndex: this.state.days.length,
                  title: "Select Day to be added"
                },
                buttonIndex => {
                  // this.setState({ clicked: this.state.buttons[buttonIndex] })
                  this.addPOI(buttonIndex, b);
                  // console.log(buttonIndex)
                  // console.log(b)
                }
              )
            }
          >
            <Icon name="add" />
          </Button>
          <Text style={{ textAlign: "center", margin: 10 }}>{b.name}</Text>
        </ListItem>
      );
    });

    const renderedTabs = this.props.savedDayPOI.map((b, i) => {
      const renderedPOI = b.list.map(a => {
        return (
          <ListItem key={a.id}>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: REMOVE,
                    title: "Remove POI"
                  },
                  buttonIndex => {
                    //this.setState({ clicked: this.state.buttons[buttonIndex] })
                    this.removePOI(buttonIndex, a, b.day);
                  }
                )
              }
            >
              <Icon name="remove" />
            </Button>
            <Text style={{ textAlign: "center", marginLeft: 10 }}>
              {a.name}
            </Text>
          </ListItem>
        );
      });
      return (
        <Tab heading={"Day " + String(i + 1)} key={i}>
          <ScrollView>
            {/* <Text style={{textAlign: "center"}}>DAY {i+1}</Text> */}
            {renderedPOI}
          </ScrollView>
        </Tab>
      );
    });

    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Left>
            <Icon
              name="menu"
              onPress={() => this.props.navigation.openDrawer()}
            />
          </Left>
          <Body style={{}}>
            <Title> Planner </Title>
          </Body>
          <Right>
            <Button
              iconRight
              light
              onPress={() => {
                this.savesTrip();
              }}
            >
              <Text style={{ marginRight: 10 }}>Save</Text>
            </Button>
          </Right>
        </Header>

        <Right>
          <Icon
            name="add"
            onPress={() => this.props.navigation.navigate("Home")}
            style={{ marginRight: 20 }}
          />
          <Thumbnail small source={require("../assets/group.png")} />
        </Right>

        {/* render day tab  */}
        <Tabs renderTabBar={() => <ScrollableTab />}>{renderedTabs}</Tabs>

        {/* render All POI  */}
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="ALL">
            <ScrollView>{renderAll}</ScrollView>
          </Tab>
        </Tabs>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  fetchedPOI: state.DayDetailReducer.fetchedPOI,
  Destination: state.home.Destination,
  tripName: state.home.tripName,
  dayInfo: state.DayPickerReducer.dayInfo,
  user: state.auth.user,
  editting: state.savedTrips.editting,
  savedDayPOI: state.DayDetailReducer.dayPOI
});

const mapDispatchToProps = dispatch => ({
  fetchSuggestionPOI: (tags, location) =>
    dispatch(action.DayDetailAction.fetchSuggestionPOI(tags, location)),
  saveDayPOI: dayPOIInput =>
    dispatch(action.DayDetailAction.saveDayPOI(dayPOIInput))
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4ba37b",
    width: 100,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 100
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayDetailScreen);

// export default DayDetailScreen
