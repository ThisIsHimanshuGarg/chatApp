import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
   apiKey: "AIzaSyB3D8BzDDy4HNsCIZdoKzfrQ-dO32DTNCM",
  authDomain: "chatingapp-df3c5.firebaseapp.com",
  projectId: "chatingapp-df3c5",
  storageBucket: "chatingapp-df3c5.firebasestorage.app",
  messagingSenderId: "683146366202",
  appId: "1:683146366202:web:8fc4e75326da2965008d43",
  measurementId: "G-NS35KL63JC"
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
console.log(auth);

const googleProvider = new GoogleAuthProvider();
console.log(googleProvider);

export const signInWithGoogle = async () => {
    const googleUser = await signInWithPopup(auth, googleProvider)
    console.log("googleUser", googleUser);
    return googleUser.user;
}