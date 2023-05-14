import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../src/firebase";

const googleSignIn = () => {
  return signInWithPopup(auth, new GoogleAuthProvider());
};

export default googleSignIn;
