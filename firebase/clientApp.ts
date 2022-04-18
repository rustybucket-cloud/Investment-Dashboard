import firebase, { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, setDoc } from "firebase/firestore"
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

// initalize db
const db = getFirestore() 

export const auth = getAuth()

export const signUpUser = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)

export const loginUser = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)

export const logOut = () => signOut(auth)

export const addUserData = (userData: {user: string,fName: string, lName: string, experience: string, savingFor: string[]}) => {
    return setDoc(doc(db, "users", userData.user), userData)    
}

export const getUserData = async (user: string) => {
    const docRef = doc(db, "users", user)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data()
    }
}

export const addInvestment = async (user: string | null | undefined, symbol: string, shares: number) => {
    if (typeof user !== "string") return
    return setDoc(doc(db, "users", user, "investments", symbol), { shares })
}

export const getUserInvestments = async (user: string) => {
    if (!user) return
    const docRef = doc(db, "users", user, "investments", "stocks")
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        console.log(docSnap)
        return docSnap.data()
    }
}

export default firebase