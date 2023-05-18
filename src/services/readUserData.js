import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

const readUserData = (userId) => {
  const userRef = ref(database, `users/${userId}`);

  return new Promise((resolve, reject) => {
    onValue(
      userRef,
      (snapshot) => {
        const userData = snapshot.val();
        resolve(userData);
      },
      (error) => {
        reject(error);
        console.error("Error reading user data:", error);
      },
      {
        onlyOnce: true,
      }
    );
  });
};

export default readUserData;
