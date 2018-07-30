import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, TextInput, Text, TouchableOpacity, Button, Alert, StyleSheet} from 'react-native'
import {login} from "../../services/APIServices"

class LoginForm extends Component {
    state = {
        email: '',
        password: ''
    }

    _handleTextInputChange = (field) => (value) => {
        this.setState({
            [field]: value
        })
    }

    _handlePressLogin = () => {
        const {email, password} = this.state

        if (!email) return Alert.alert('Please enter your email')
        if (!password) return Alert.alert('Please enter your password')

        login({email, password})
            .then(user => {
                this.setState({
                    email: '',
                    password: ''
                })

                this.props.navigation.navigate('Home')
            })
            .catch(error => {
                const {message} = error

                Alert.alert(message)
            })
    }

    _handlePressRegister = () => {
        this.props.onAction('register')
    }

    render() {
        const {email, password} = this.state

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        returnKeyType='done'
                        style={styles.textInput}
                        placeholder='Email'
                        value={email}
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        onChangeText={this._handleTextInputChange('email')}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        value={password}
                        onChangeText={this._handleTextInputChange('password')}
                        secureTextEntry/>

                    <View style={styles.button}>
                        <Button
                            title='Login'
                            onPress={this._handlePressLogin}/>
                    </View>

                    <TouchableOpacity onPress={this._handlePressRegister}>
                        <Text style={styles.goTo}>Or register now!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#eee',
    },

    form: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textInput: {
        borderWidth: 1,
        borderColor: '#999',
        padding: 10,
        marginBottom: 20,
        minWidth: 200,
        textAlign: 'center'
    },

    button: {
        marginBottom: 30
    },

    goTo: {
        color: '#999'
    }
})

LoginForm.propTypes = {
    navigation: PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired,
}

export default LoginForm