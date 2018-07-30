import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {createStackNavigator} from 'react-navigation'
import LoginForm from "./login/LoginForm"
import RegisterForm from "./login/RegisterForm"

class LoginPage extends Component {
    static navigationOptions = {
        title: 'Account',
        headerStyle: {
            backgroundColor: '#da552f'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }

    state = {
        action: 'login'
    }

    _handleChangeAction = action => {
        this.setState({
            action,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.action === 'login'
                        ? <LoginForm {...this.props} onAction={this._handleChangeAction}/>
                        : <RegisterForm {...this.props} onAction={this._handleChangeAction}/>

                }
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