import { ref, remove } from "firebase/database";
import { database } from "../firebase";
import { auth } from "../../src/firebase";

const deleteAllUserProducts = () => {
  const userRef = ref(database, `users/${auth.currentUser.uid}/products`);

  return new Promise((resolve, reject) => {
    remove(userRef)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error("Error deleting user data:", error);
        reject(error);
      });
  });
};

export default deleteAllUserProducts;
