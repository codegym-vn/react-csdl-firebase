import React, {Component} from 'react'
import {View, Button, StyleSheet} from 'react-native'
import {logout} from "../../services/AuthServices"

class LogoutButton extends Component {
    _handlePressLogout = () => {
        logout()
    }

    render() {
        return (
            <View style={styles.container}>
                <Button color='#999' title='Logout' onPress={this._handlePressLogout}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
})

export default LogoutButton