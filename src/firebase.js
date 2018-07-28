import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBFWUoHiBdzjsmDc0GL-r8Wo5AD24JCLnY",
    authDomain: "max-ildxxo.firebaseapp.com",
    databaseURL: "https://max-ildxxo.firebaseio.com",
    projectId: "max-ildxxo",
    storageBucket: "max-ildxxo.appspot.com",
    messagingSenderId: "130509062877"
}

firebase.initializeApp(config)

export default firebase