import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';  
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCUmHmONRtKdNtsmus4eErhw3KebDZ7ypg",
    authDomain: "coverly-3d81c.firebaseapp.com",
    projectId: "coverly-3d81c",
    storageBucket: "coverly-3d81c.firebasestorage.app",
    messagingSenderId: "444561061995",
    appId: "1:444561061995:web:f68690656665989a8ed92e",
    measurementId: "G-MYGK3T77XH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup };