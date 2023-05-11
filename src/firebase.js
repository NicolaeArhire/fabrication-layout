// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLC7GndMGytp_FDD4V2pbs1Y77JU96_Ds",
  authDomain: "fabrication-layout.firebaseapp.com",
  projectId: "fabrication-layout",
  storageBucket: "fabrication-layout.appspot.com",
  messagingSenderId: "797525896836",
  appId: "1:797525896836:web:32a82e0ed0bad8d1dc1cd1",
  measurementId: "G-8TY9YWHTJH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
