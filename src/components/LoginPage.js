import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {createStackNavigator} from 'react-navigation'
import FormLogin from "./login/FormLogin"
import {login} from "../services/APIServices"

class LoginPage extends Component {
    static navigationOptions = {
        title: 'Login',
        headerStyle: {
            backgroundColor: '#da552f'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }

    _handleSubmit = (name) => {
        login(name)
            .then(response => {
                this.props.navigation.navigate('Home')
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <FormLogin onSubmit={this._handleSubmit}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: '100%'
    },
})

export default createStackNavigator({
    Login: {
        screen: LoginPage
    },
})