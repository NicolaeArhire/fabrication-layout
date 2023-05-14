import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth } from "../../src/firebase";

const facebookSignIn = () => {
  return signInWithPopup(auth, new FacebookAuthProvider());
};

export default facebookSignIn;
