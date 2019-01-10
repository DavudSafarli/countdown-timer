import firebase from 'firebase/app';
import 'firebase/firestore';
  
  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyAz5OLaFhfzqSjEFw8DuXw9LdarsYgNrxk",
    authDomain: "share-countdown.firebaseapp.com",
    databaseURL: "https://share-countdown.firebaseio.com",
    projectId: "share-countdown",
    storageBucket: "share-countdown.appspot.com",
    messagingSenderId: "755534950283"
  };
let app = firebase.initializeApp(config);

export const  db = app.firestore()
  db.settings({
    timestampsInSnapshots: true
})

