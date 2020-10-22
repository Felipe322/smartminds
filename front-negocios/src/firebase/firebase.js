import firebase from 'firebase/app';
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAAyMzLoLfleFuM26MnBpXcAIbsHR0LLLQ",
    authDomain: "empresas-tsp.firebaseapp.com",
    databaseURL: "https://empresas-tsp.firebaseio.com",
    projectId: "empresas-tsp",
    storageBucket: "empresas-tsp.appspot.com",
    messagingSenderId: "654849844510",
    appId: "1:654849844510:web:199d2f2a167ec448a0550f",
    measurementId: "G-ERN31QSQ8M"
  };

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export {storage, firebase as default}