import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCTzEux8f1sfq2xjcDs_ErdNreZeHJKdvw",
  authDomain: "calculator-8afef.firebaseapp.com",
  projectId: "calculator-8afef",
  storageBucket: "calculator-8afef.appspot.com",
  messagingSenderId: "882956807261",
  appId: "1:882956807261:web:b421f4637fb151445331b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const db = getFirestore(app)
export {auth, provider, db}

