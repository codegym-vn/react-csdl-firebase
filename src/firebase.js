import firebase from 'firebase'
import configFirebase from './config/firebase.json'

const config = configFirebase || {}
firebase.initializeApp(config)

export default () => firebase