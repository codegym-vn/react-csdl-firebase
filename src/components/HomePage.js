import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {createStackNavigator} from 'react-navigation'

class HomePage extends Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#da552f'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }

    render() {
        return (
            <View>
                <Text>Home</Text>
            </View>
        )
    }
}

export default createStackNavigator({
    Home: {
        screen: HomePage
    },
})