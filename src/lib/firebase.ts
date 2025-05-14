
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPcSsUQFzOcwle1QyRYI6ZTPTjx9XVI14",
  authDomain: "hapjay-property.firebaseapp.com",
  projectId: "hapjay-property",
  storageBucket: "hapjay-property.firebasestorage.app",
  messagingSenderId: "126642387576",
  appId: "1:126642387576:web:ccf199241cd693b7778b8d",
  measurementId: "G-ZEV1XWQ2PX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Initialize Analytics conditionally
let analytics = null;
isSupported().then(yes => yes && (analytics = getAnalytics(app)));

// For development environments, you can uncomment this to use local emulators
// if (process.env.NODE_ENV === 'development') {
//   connectAuthEmulator(auth, 'http://localhost:9099');
//   connectFirestoreEmulator(db, 'localhost', 8080);
//   connectStorageEmulator(storage, 'localhost', 9199);
// }

export { app, db, storage, auth, analytics };
