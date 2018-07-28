import React from 'react'
import {Image} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation'
import HomePage from './src/components/HomePage'
import Ionicons from "react-native-vector-icons/Ionicons"
import Logo from './src/assets/images/logo.png'
import LoginPage from "./src/components/LoginPage"
import SubmitProductPage from "./src/components/SubmitProductPage"

const iconMap = {
    Home: 'ios-home',
    Login: 'ios-unlock',
    Submit: 'ios-paper-plane'
}

export default createBottomTabNavigator(
    {
        Login: LoginPage,
        Home: HomePage,
        Submit: SubmitProductPage
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state
                const iconName = iconMap[routeName] || 'ios-information'

                if (routeName === 'Home') {
                    return <Image
                        style={{width: 20, height: 20}}
                        source={Logo}/>
                }

                return <Ionicons name={iconName} size={25} color={tintColor}/>;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#da552f',
            inactiveTintColor: '#999',
        },
    }
)