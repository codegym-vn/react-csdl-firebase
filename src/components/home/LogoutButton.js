import React, {Component} from 'react'
import {View, Button, StyleSheet} from 'react-native'
import {logout} from "../../services/AuthServices"

class LogoutButton extends Component {
    _handlePressLogout = () => {
        logout()
    }

    render() {
        return (
            <View>
                <Button title='Logout' onPress={this._handlePressLogout}/>
            </View>
        )
    }
}

export default LogoutButton