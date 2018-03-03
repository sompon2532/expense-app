import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyChHm9vAOqmPtOFK294ga4RKMa9gfUOUfY",
    authDomain: "expense-30c5e.firebaseapp.com",
    databaseURL: "https://expense-30c5e.firebaseio.com",
    projectId: "expense-30c5e",
    storageBucket: "",
    messagingSenderId: "627031391043"
}

firebase.initializeApp(config);

export default firebase