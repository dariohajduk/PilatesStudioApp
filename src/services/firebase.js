// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyBgRjJShNJqWB2nq931kKobLRHUeejW0vo",
//   authDomain: "milan-studio-b8b4b.firebaseapp.com",
//   projectId: "milan-studio-b8b4b",
//   storageBucket: "milan-studio-b8b4b.appspot.com",
//   messagingSenderId: "961084768524",
//   appId: "1:961084768524:web:2cdbc3a67dc018d8058929",
//   measurementId: "G-8XF83E9KQY"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// console.log('🔥 Firebase init DONE');

// export { auth, db };
// ייבוא SDK מ-Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// קונפיגורציה מתוך משתני סביבה (Vercel)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// אתחול האפליקציה
const app = initializeApp(firebaseConfig);

// שירותים זמינים מה-Firebase
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

