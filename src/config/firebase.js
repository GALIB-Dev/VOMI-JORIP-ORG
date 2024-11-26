import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA89Z9wx2Mc5cgLRotCGljfxL9LnGauhek",
  authDomain: "vjus-property.firebaseapp.com",
  projectId: "vjus-property",
  storageBucket: "vjus-property.appspot.com",
  messagingSenderId: "860837755070",
  appId: "1:860837755070:web:e329c13519e4913d01c6ef",
  measurementId: "G-XV6MCM1XN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Export initialized services
export { db, storage };
