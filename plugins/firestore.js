import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
  const config = {
    apiKey: '***REMOVED***',
    authDomain: 'pokego-codes.firebaseapp.com',
    databaseURL: 'https://pokego-codes.firebaseio.com',
    projectId: 'pokego-codes',
    storageBucket: 'pokego-codes.appspot.com',
    messagingSenderId: '136869508515',
    appId: '1:136869508515:web:8cb0a817f1948e44089616',
    measurementId: 'G-BXL4T7PDHM'
  }
  firebase.initializeApp(config)
  firebase.firestore()
}
const fireDB = firebase.firestore()
export { fireDB }
