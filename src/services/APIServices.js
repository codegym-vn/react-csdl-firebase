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
}