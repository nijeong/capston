import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyD0Gdqqen9FjVc5eIlPDiVutVW-1N-RmiY",
    authDomain: "alrimecapstone.firebaseapp.com",
    projectId: "alrimecapstone",
    storageBucket: "alrimecapstone.appspot.com",
    messagingSenderId: "288395937913",
    appId: "1:288395937913:web:e8bdc55edb0333f34f6ca8",
    measurementId: "G-8D53D8912Y"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { auth, db };