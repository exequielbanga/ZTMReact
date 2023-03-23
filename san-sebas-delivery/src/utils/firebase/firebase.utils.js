// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth"

import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'


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

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) =>{
    const collectionReference = collection(db,collectionKey)
    const batch = writeBatch(db)

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionReference,object.title.toLowerCase())
        batch.set(docRef,object)
    });
    await batch.commit()
    console.log('done')
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories')
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q) 
    const categoryMap = querySnapshot.docs.reduce((accumulator,docSnapshot)=>{
        const  {title, items} = docSnapshot.data()
        accumulator[title.toLowerCase()] = items
        return accumulator
    },{})
    return categoryMap
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) =>{
    const userDocRef = doc(db,'users',userAuth.uid) 

    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()){
        const {displayName, email} = userAuth
        const createAt = Date()

        try{
            setDoc(userDocRef,{
              displayName,
              email,
              createAt,
              ...additionalInformation  
            })
        }catch(error){
            console.log('Error creating the user',error.message)
        }
    }
    
    return userDocRef
};

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth,email,password)
} 

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if (!email || !password) return
    return await signInWithEmailAndPassword(auth,email,password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback ) 



