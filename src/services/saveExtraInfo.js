import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";

const database = getDatabase();

const userData = {
  birthDate: "1990-01-01",
  phoneNumber: "1234567890",
};

const saveUserData = (userId, userData) => {
  const userRef = ref(database, `users/${userId}`);
  set(userRef, userData)
    .then(() => {
      console.log("User data saved successfully");
    })
    .catch((error) => {
      console.error("Error saving user data:", error);
    });
};

const passwordSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    saveUserData(userCredential.user.uid, userData);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export default passwordSignIn;
