import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyDQaOq80_xPEEeAg4jf3M4qlfqUqGiGLP4",
  authDomain: "fastburgerifsc.firebaseapp.com",
  projectId: "fastburgerifsc",
  storageBucket: "fastburgerifsc.appspot.com",
  messagingSenderId: "254478053909",
  appId: "1:254478053909:web:b804c530e7e7e7911a941c"
};


if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

firebase.firestore();
export default firebase;