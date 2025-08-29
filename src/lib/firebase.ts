import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// (İstersen analytics)
// import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE,
  messagingSenderId: import.meta.env.VITE_FB_MSG_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID, // opsiyonel
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// (Analytics istersen)
// if (typeof window !== "undefined") {
//   isSupported().then((ok) => { if (ok) getAnalytics(app); });
// }
