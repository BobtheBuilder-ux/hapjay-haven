
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPcSsUQFzOcwle1QyRYI6ZTPTjx9XVI14",
  authDomain: "hapjay-property.firebaseapp.com",
  projectId: "hapjay-property",
  storageBucket: "hapjay-property.appspot.com",
  messagingSenderId: "126642387576",
  appId: "1:126642387576:web:ccf199241cd693b7778b8d",
  measurementId: "G-ZEV1XWQ2PX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, db, storage, analytics };
