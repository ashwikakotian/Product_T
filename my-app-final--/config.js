import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
  apiKey: 'AIzaSyClL7E_Ei-ZSiCK0FIE29rPipCB-lz6IZA',
  authDomain: 'product--t.firebaseapp.com',
  projectId: 'product--t',
  storageBucket: 'product--t.appspot.com',
  messagingSenderId: '914488140232',
  appId: '1:914488140232:web:934a364cd12b0a768ce0fd',
};
if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
