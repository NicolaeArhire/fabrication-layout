import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "fabrication-layout.firebaseapp.com",
  projectId: "fabrication-layout",
  storageBucket: "fabrication-layout.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: "1:797525896836:web:32a82e0ed0bad8d1dc1cd1",
  measurementId: "G-8TY9YWHTJH",
  databaseURL: "https://fabrication-layout-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

export default app;
