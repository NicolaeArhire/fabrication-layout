import { ref, set } from "firebase/database";
import { database } from "../firebase";

const saveUserData = (userId, userData) => {
  const userRef = ref(database, `users/${userId}`);

  return new Promise((resolve, reject) => {
    set(userRef, userData)
      .then(() => {
        resolve(userData);
      })
      .catch((error) => {
        console.error("Error saving user data:", error);
        reject(error);
      });
  });
};

export default saveUserData;
