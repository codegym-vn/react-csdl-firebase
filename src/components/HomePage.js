import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {createStackNavigator} from 'react-navigation'
import {
    getCurrentUser,
    isAuthenticated,
    subscribeAuthentication,
    unsubscribeAuthentication
} from "../services/AuthServices"
import WelcomeMessage from "./home/WelcomeMessage"
import LogoutButton from "./home/LogoutButton"

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

    state = {
        isAuthenticated: isAuthenticated(),
        user: getCurrentUser()
    }

    componentDidMount() {
        subscribeAuthentication(this._handleOnChangeAuth)
    }

    componentWillUnmount() {
        unsubscribeAuthentication(this._handleOnChangeAuth)
    }

    _handleOnChangeAuth = () => {
        this.setState({
            isAuthenticated: isAuthenticated(),
            user: getCurrentUser()
        })
    }

    render() {
        const {isAuthenticated} = this.state

        return (
            <View style={styles.container}>
                <WelcomeMessage {...this.state}/>

                {
                    isAuthenticated && <LogoutButton/>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: '100%'
    }
})

export default createStackNavigator({
    Home: {
        screen: HomePage
    },
})