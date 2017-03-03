import firebase from 'firebase/app';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyBfokaGrHnRpWotjiFjXORJ4_dUYKp57NQ",
    authDomain: "wb-data-reports.firebaseapp.com",
    databaseURL: "https://wb-data-reports.firebaseio.com",
    storageBucket: "wb-data-reports.appspot.com",
    messagingSenderId: "805356833120"
};

firebase.initializeApp(config);

export const database = firebase.database();


