import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: 'react-firebase-chat-app-ccc30.firebaseapp.com',
  projectId: 'react-firebase-chat-app-ccc30',
  storageBucket: 'react-firebase-chat-app-ccc30.appspot.com',
  messagingSenderId: '194299944384',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: 'G-VHXV01CE1K',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
