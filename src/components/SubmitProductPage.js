import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {createStackNavigator} from 'react-navigation'

class SubmitProductPage extends Component {
    static navigationOptions = {
        title: 'Submit',
        headerStyle: {
            backgroundColor: '#da552f'
        },
        headerTitleStyle: {
            color: '#fff'
        }
    }

    render() {
        return (
            <View>
                <Text>Submit product</Text>
            </View>
        )
    }
}

export default createStackNavigator({
    Submit: {
        screen: SubmitProductPage
    },
})