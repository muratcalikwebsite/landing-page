// src/lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

function must(name: string, val: string | undefined) {
  if (!val) {
    // Bu log prod console'da net uyarı verir; 400 spam'ini görmeden hatayı yakalarsın
    console.error(`⚠️ Missing env: ${name}. Vercel > Settings > Environment Variables'a ekleyin.`);
    throw new Error(`Missing env: ${name}`);
  }
  return val;
}

const firebaseConfig = {
  apiKey: must("VITE_FIREBASE_API_KEY", import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: must("VITE_FIREBASE_AUTH_DOMAIN", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: must("VITE_FIREBASE_PROJECT_ID", import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: must("VITE_FIREBASE_STORAGE_BUCKET", import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: must("VITE_FIREBASE_MESSAGING_SENDER_ID", import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: must("VITE_FIREBASE_APP_ID", import.meta.env.VITE_FIREBASE_APP_ID),
  // measurementId opsiyonel
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
