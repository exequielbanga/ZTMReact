// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from "firebase/auth"

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwXkHrikZVx4doLLCuTq-K6PYfQ0lktgk",
  authDomain: "san-sebas-delivery.firebaseapp.com",
  projectId: "san-sebas-delivery",
  storageBucket: "san-sebas-delivery.appspot.com",
  messagingSenderId: "815917687670",
  appId: "1:815917687670:web:e272a26333c8e6017e5057",
  measurementId: "G-TVJSX2JZCR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth,provider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db,'users',userAuth.uid) 

    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()){
        const {displayName, email} = userAuth
        const createAt = Date()

        try{
            setDoc(userDocRef,{
              displayName,
              email,
              createAt  
            })
        }catch(error){
            console.log('Error creating the user',error.message)
        }
    }
    
    return userDocRef
}