// import firebase from 'firebase/app';
// import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC7u-9hq27kASmDbVRvsc14jzsgqBsjp90",
    authDomain: "vedbjorn.firebaseapp.com",
    projectId: "vedbjorn",
    storageBucket: "vedbjorn.appspot.com",
    messagingSenderId: "1033598986909",
    appId: "1:1033598986909:web:2ad21409a11e7532388274",
    measurementId: "G-9VJDWZJQ3G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// firebase.initializeApp(firebaseConfig);
// export const auth = firebase.auth();
