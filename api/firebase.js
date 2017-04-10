import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import firebaseui from 'firebaseui';

firebase.initializeApp({
  apiKey: 'AIzaSyBfokaGrHnRpWotjiFjXORJ4_dUYKp57NQ',
  authDomain: 'wb-data-reports.firebaseapp.com',
  databaseURL: 'https://wb-data-reports.firebaseio.com',
  storageBucket: 'wb-data-reports.appspot.com',
  messagingSenderId: '805356833120',
});

const database = firebase.database();
const auth = firebase.auth();

export {firebase, auth, database, firebaseui};
