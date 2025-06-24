// client/src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config from environment
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Initialize app safely (singleton)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Google provider for OAuth
const googleProvider = new GoogleAuthProvider();

// Helper: Password reset
const sendResetEmail = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

// Exports
export {
  auth,
  db,
  googleProvider,
  sendResetEmail,
};
