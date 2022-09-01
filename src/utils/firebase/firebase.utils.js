import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCibTSDveDJxMPzehIv_E_OicEo4iEBf1o",
    authDomain: "crwn-clothing-db-8ef9a.firebaseapp.com",
    projectId: "crwn-clothing-db-8ef9a",
    storageBucket: "crwn-clothing-db-8ef9a.appspot.com",
    messagingSenderId: "635853202449",
    appId: "1:635853202449:web:f9ef41d471823d8cbd7db0"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    //see if there is an existing document reference
    //doc() just returns a document reference, not the acutal data
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef)

    //get the actual data from the object with getDoc
    const userSnapShot = await getDoc(userDocRef);
  

    //check if user data exists
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }
        catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;



    //if user data doesn't exist, create and set the document with the data from userAuth in my collection

    //return userDocRef if it exists
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

     return await createUserWithEmailAndPassword(auth, email, password);


}

export const signInAuthUserWithEmailAndPassword = async ( email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);


}
