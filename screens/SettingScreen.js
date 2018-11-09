import React, { Component } from 'react'
import { View, Text, StyleSheet, Styles } from 'react-native'
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
                <View> 
                <View style={styles.container}>
                    <Text style={styles.paragraph}>
                    {`       Let’sTravel promosises to let users create and plan their own trips effectively and organizedly.\n`}
                    {`      It gives suggestions on destinations and estimated time that they should spend at a certain location.\n`}
                    {`      Let’s Travel that helps everyone plans their holiday from A to Z with a touch of a button.\n`}
                    {`      With Let's Travel, you will have a better trip and never miss any attraction no more.\n`}
                    {`      The application is still under developing.\n`}
                    {`              Version: 1.0.0 \n`}
                    </Text>
                    <Text style={{fontSize: 25, textAlign: 'center'}}>
                        {`Enjoy, pack your bags and let's travel!\n`}
                    </Text>
                </View>
            </View>
            </View>
           
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 40,
        marginLeft:20,
        marginRight: 20,
        padding: 20,
        backgroundColor: '#F5F6FA',
    },
    paragraph: {
        margin: 20,
        fontSize: 18,
        
        textAlign: 'left',
        color: '#142354',
    }
});

export default Setting
