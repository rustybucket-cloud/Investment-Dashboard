import firebase, { initializeApp } from "firebase/app"
import "firebase/app"
import "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "@firebase/auth";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export const signUpUser = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)

export const loginUser = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)

export const logOut = () => signOut(auth)

export default firebase