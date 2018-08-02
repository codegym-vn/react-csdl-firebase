# Sử dụng Firebase để xây dựng chức năng đăng ký, đăng nhập

## Mục tiêu

- Hiểu được cách sử dụng các chức năng trong Firsebase.
- Sử dụng **Firebase Authentication** để tạo xử lý các tác vục đăng nhập, đăng ký người dùng.

## Nội dung

- Đăng ký tài khoản trên: [Firebase](https://firebase.google.com).
- Tạo 2 screen là `Account` và `Home` để demo tính năng đăng nhập và đăng ký.
- Trong screen `Account` sẽ cho phép người dùng đăng nhập và đăng ký.
- Trong screen `Home` sẽ tạo 1 message để hiện thông là người dùng đã đăng nhập hay chưa đăng nhập (guest).

## Hướng dẫn

### Bước 1

- Đăng ký tài khoản free tại: [Firebase](https://firebase.google.com).

- Trong phần `Authentication`, bật tính năng xác thực với **email/password**

![Auth password](/demo/auth-password.png)

### Bước 2

- Khởi tạo project với `create-react-native-app`

- Copy config của firebase vào file: `src/config/firebase.json` như sau:
```
{
  "apiKey": "xxxxx",
  "authDomain": "project-xxx.firebaseapp.com",
  "databaseURL": "https://project-xxx.firebaseio.com",
  "projectId": "project-xxx",
  "storageBucket": "project-xxx.appspot.com",
  "messagingSenderId": "xxx"
}
```

![Config demo](/demo/firebase-config.png)

```

### Bước 3

- Cài đặt package `firebase`
```bash
npm i --save firebase
```

- Tạo 1 file `fire` để kết nối tới **firebase**
```javascript
import firebase from 'firebase'
import configFirebase from './config/firebase.json'

const config = configFirebase || {}
firebase.initializeApp(config)

export default () => firebase
```

### Bước 4

- Tạo 1 file `APIServices.js` để tạo các function `register` và `login` bằng cách sử dụng `Authentication` của **firebase**
```javascript
import firebase from '../firebase'

const firebaseInstant = firebase()
const auth = firebaseInstant.auth()

export const register = ({email, password = '', name = ''}) => {
    return auth.createUserWithEmailAndPassword(email, password)
        .then(({user}) => {
            return Promise.all([
                user.getIdToken(),
                user.updateProfile({displayName: name})
            ]).then(([accessToken]) => {
                const {refreshToken} = user

                const {providerData} = user
                const userData = Array.isArray(providerData) && providerData.length ? providerData[0] : {}

                return {
                    user: {
                        ...userData,
                        displayName: name
                    },
                    token: {
                        accessToken,
                        refreshToken
                    }
                }
            })
        })
}

export const login = ({email, password = ''}) => {
    return auth.signInWithEmailAndPassword(email, password)
        .then(({user}) => {
            return user.getIdToken()
                .then(accessToken => {
                    const {refreshToken} = user

                    const {providerData} = user
                    const userData = Array.isArray(providerData) && providerData.length ? providerData[0] : {}

                    return {
                        user: userData,
                        token: {
                            accessToken,
                            refreshToken
                        }
                    }
                })
        })
}
```

### Bước 5

- Tạo 1 file `AuthServices.js` để quản lý state khi người dùng đã đăng nhập hoặc thoát.

```javascript
const _store = {
    isAuthenticated: false,
    user: {},
    token: {
        accessToken: '',
        refreshToken: ''
    },
    subscribers: []
}

export const logout = () => {
    _store.isAuthenticated = false;
    _store.user = {}

    _broadcast()
}

export const loginSuccess = ({user, token}) => {
    _store.user = {
        ...user
    }
    _store.token = {
        ...token
    }
    _store.isAuthenticated = true
    _broadcast()

    return Promise.resolve(true)
}

const _broadcast = () => {
    _store.subscribers.forEach(subscriber => {
        typeof subscriber === 'function' && subscriber(_store.user)
    })
}

export const isAuthenticated = () => _store.isAuthenticated

export const getCurrentUser = () => _store.user

export const subscribeAuthentication = subscriber => {
    if (typeof subscriber !== 'function') return
    if (_store.subscribers.indexOf(subscriber) !== -1) return

    _store.subscribers = [].concat(_store.subscribers, [subscriber])
}

export const unsubscribeAuthentication = subscriber => {
    _store.subscribers = _store.subscribers.filter(_sub => _sub !== subscriber)
}
```

### Bước 6

- Tạo 1 screens là `Account` và `Home`

    * `Account`: Xử lý các tác vụ đăng nhập/đăng ký
    * `Home`: Hiển thị một message và cho phép người dùng `logout`

- Trong `Account` sẽ tạo 2 component:
    * `LoginForm` xử lý tác vụ đăng nhập
    ```javascript
    import React, {Component} from 'react'
    import PropTypes from 'prop-types'
    import {View, TextInput, Text, TouchableOpacity, Button, Alert, StyleSheet} from 'react-native'
    import {login} from "../../services/APIServices"
    import {loginSuccess} from "../../services/AuthServices"

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
                .then(({user, token}) => {
                    this.setState({
                        email: '',
                        password: ''
                    })

                    return loginSuccess({user, token})
                })
                .then(() => {
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
                            returnKeyType='done'
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
    ```

    * `RegisterForm` xử lý tác vụ đăng ký
    ```javascript
    import React, {Component} from 'react'
    import {View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text} from 'react-native'
    import {register} from '../../services/APIServices'
    import PropTypes from 'prop-types'
    import {loginSuccess} from "../../services/AuthServices"

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
                    return loginSuccess({user, token})
                })
                .then(() => {
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
    ```

- Trong `Home` component sẽ xử lý tác vụ `logout` và hiển thị **welcome message**

```javascript
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
        minHeight: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default createStackNavigator({
    Home: {
        screen: HomePage
    },
})
```

Note: Trong `Home` component sẽ chia thành 1 component nhỏ hơn là `WelcomeMessage` và `LogoutButton` để xử lý riêng biệt (tham khảo code mẫu).


### Bước 7

- Chạy chương trình và xem kết quả.

## Code mẫu

Tham khảo tại: https://github.com/tutv/rn-firebase-authentication

## Ảnh demo

![Login](/demo/login.jpeg)

![Register](/demo/register.jpeg)

![Home page](/demo/home.jpeg)