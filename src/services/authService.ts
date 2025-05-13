
import { 
  getAuth, 
  signInWithEmailAndPassword as firebaseSignInWithEmail, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { app } from "@/lib/firebase";

// Initialize Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Sign in with email and password
export const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await firebaseSignInWithEmail(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in with email and password:", error);
    throw error;
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};
