import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const Buttons = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.button}>
      <Text style={[styles.buttonText]}>{title}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    marginTop: 25,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#3e98fa',
    fontFamily: 'Arial',
    fontSize: 22,
    letterSpacing: 0.5,
  },
  activityIndicator: {
    transform: [{scale: 0.7}],
    marginTop: 3.5,
    marginLeft: 5,
  },
})

export default Buttons
