// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD25ESalWlwuCk-creZeopzVePEEVpJreE",
  authDomain: "fir-rn-16ca9.firebaseapp.com",
  databaseURL: "https://fir-rn-16ca9-default-rtdb.firebaseio.com",
  projectId: "fir-rn-16ca9",
  storageBucket: "fir-rn-16ca9.appspot.com",
  messagingSenderId: "877016773233",
  appId: "1:877016773233:web:71010515f63e856dc7a1d0"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
    console.log('Connect successfully !!!')
} else {
    app = firebase.app();
}

const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage };
