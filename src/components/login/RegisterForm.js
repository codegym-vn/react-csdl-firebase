import React, {Component} from 'react'
import {View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text} from 'react-native'
import {register} from '../../services/APIServices'
import PropTypes from 'prop-types'
import {authSuccess} from "../../services/AuthServices"

class RegisterForm extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    _handleTextInputChange = (field) => (value) => {
        this.setState({
            [field]: value
        })
    }

    _handlePressRegister = () => {
        const {email, name, password} = this.state

        if (!email) return Alert.alert('Please enter your email')
        if (!password) return Alert.alert('Please enter your password')

        register({email, password, name})
            .then(({user, token}) => {
                authSuccess({user, token})

                this.props.navigation.navigate('Home')
            })
            .catch(error => {
                const {message} = error

                Alert.alert(message)
            })
    }

    _handlePressGoToLogin = () => {
        this.props.onAction('login')
    }

    render() {
        const {email, name, password} = this.state

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        returnKeyType='done'
                        style={styles.textInput}
                        placeholder='Full name'
                        value={name}
                        textContentType='name'
                        onChangeText={this._handleTextInputChange('name')}/>
                    <TextInput
                        returnKeyType='done'
                        style={styles.textInput}
                        placeholder='Email'
                        value={email}
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        onChangeText={this._handleTextInputChange('email')}/>
                    <TextInput
                        returnKeyType='done'
                        style={styles.textInput}
                        placeholder='Password'
                        value={password}
                        onChangeText={this._handleTextInputChange('password')}
                        secureTextEntry/>

                    <View style={styles.button}>
                        <Button
                            title='Register'
                            onPress={this._handlePressRegister}/>
                    </View>

                    <TouchableOpacity onPress={this._handlePressGoToLogin}>
                        <Text style={styles.goTo}>Or login now!</Text>
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

RegisterForm.propTypes = {
    navigation: PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired,
}

export default RegisterForm