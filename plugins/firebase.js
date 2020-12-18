import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/auth'
if (!firebase.apps.length) {
  const config = {
    apiKey: process.env.FIRESTORE_APIKEY,
    authDomain: process.env.FIRESTORE_AUTHDOMAIN,
    databaseURL: process.env.FIRESTORE_DATABASEURL,
    projectId: process.env.FIRESTORE_PROJECTID,
    storageBucket: process.env.FIRESTORE_STORAGEBUCKET,
    messagingSenderId: process.env.FIRESTORE_MESSAGINGSENDERID,
    appId: process.env.FIRESTORE_APPID,
    measurementId: process.env.FIRESTORE_MEASUREMENTID,
  }

  firebase.initializeApp(config)

  firebase
    .auth()
    .signInAnonymously()
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // eslint-disable-next-line
      console.log(errorCode, errorMessage)
      // ...
    })
  firebase.firestore()
  firebase.analytics()
}
const fireDB = firebase.firestore()
export { fireDB }
