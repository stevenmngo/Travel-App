import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Header, Left, Right, Icon } from 'native-base'

class Setting extends Component{
    static navigationOption = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="settings" style={{ fontSize: 24, color: tintColor }}></Icon>
        )
    }
    render(){
        return (
            <View style={{flex:1}}>
                <Header>
                    <Left>
                        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()}></Icon>
                    </Left>
                </Header>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Setting</Text>
                </View>
            </View>
        )
    }
}

export default Setting
