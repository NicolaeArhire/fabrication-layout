import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

const facebookSignIn = () => {
  return signInWithPopup(getAuth(), new FacebookAuthProvider());
};

export default facebookSignIn;
