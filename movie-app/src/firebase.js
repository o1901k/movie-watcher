import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, 
onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyDuo9IZc233qUcqKPZ0iR0oc2KFu9jWlV0",
authDomain: "movie-app-react-2bb51.firebaseapp.com",
projectId: "movie-app-react-2bb51",
storageBucket: "movie-app-react-2bb51.appspot.com",
messagingSenderId: "1014172892277",
appId: "1:1014172892277:web:35915cffc037733c540c3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const registerUser = async(email, password, displayName) => {
try{
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {displayName});
    console.log(auth.currentUser);
} catch(err) {
    return err.message.replace('Firebase:', '');
}
};
export const login = async(email, password) => {
    try{
        const useCredentials = await signInWithEmailAndPassword(auth, email, password);
        console.log(useCredentials);
    } catch(err) {
        return err.message.replace('Firebase:', '');
    }
};
export const userObserver = (setLogInUser) => {
    onAuthStateChanged(auth, (user)=> {
        user ? setLogInUser(user): setLogInUser(null);
    })
};
export const logout = () => {
    signOut(auth);
};
export const signUpProvider = async() => {
const provider = new GoogleAuthProvider();
await signInWithPopup(auth, provider);
};
export const forgotPassword = async(email) => {
try {
    await sendPasswordResetEmail(auth, email);
    return 'Please, check your email';
} catch(err) {
    return err.message.replace('Firebase:', '');
}
};