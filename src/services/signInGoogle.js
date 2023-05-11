import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const googleSignIn = () => {
  return signInWithPopup(getAuth(), new GoogleAuthProvider());
};

export default googleSignIn;
