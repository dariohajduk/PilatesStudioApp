// firebase.js – אתחול Firebase
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getFirestore } from "firebase/firestore"; // ✅ נכון
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// קונפיגורציה של Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
/**
 * TODO: תאר את הפונקציה initializeApp
 */
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);