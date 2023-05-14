import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLC7GndMGytp_FDD4V2pbs1Y77JU96_Ds",
  authDomain: "fabrication-layout.firebaseapp.com",
  projectId: "fabrication-layout",
  storageBucket: "fabrication-layout.appspot.com",
  messagingSenderId: "797525896836",
  appId: "1:797525896836:web:32a82e0ed0bad8d1dc1cd1",
  measurementId: "G-8TY9YWHTJH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
