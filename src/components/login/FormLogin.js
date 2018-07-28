import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, TextInput, StyleSheet, Text, Button, Alert} from 'react-native'

class FormLogin extends Component {
    state = {
        name: ''
    }

    _handleOnChangeName = name => {
        this.setState({
            name
        })
    }

    _handlePressButton = () => {
        this._submit()
    }

    _submit = () => {
        const {name} = this.state
        if (!name) {
            return Alert.alert('Please enter your name', () => {
                console.log('showed')
            })
        }

        this.props.onSubmit(name)
    }

    render() {
        const {name} = this.state

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        placeholder="Your name"
                        onChangeText={this._handleOnChangeName}
                        value={name}
                    />
                    <Button title="Submit" onPress={this._handlePressButton}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    form: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },

    textInput: {
        color: '#333',
        borderColor: '#999',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 5,
        maxWidth: 50
    }
})

FormLogin.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default FormLogin