import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";

const passwordSignUp = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
    await updateProfile(userCredential.user, { displayName: username });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export default passwordSignUp;
