import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyA89Z9wx2Mc5cgLRotCGljfxL9LnGauhek",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "vjus-property.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "vjus-property",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "vjus-property.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "860837755070",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:860837755070:web:e329c13519e4913d01c6ef",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-XV6MCM1XN3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
