import { ref, set, get } from "firebase/database";
import { database } from "../firebase";

const saveUserProducts = (userId, userData) => {
  const userRef = ref(database, `users/${userId}/productsInCart`);

  return new Promise((resolve, reject) => {
    const userProductsRef = userRef;
    get(userProductsRef)
      .then((snapshot) => {
        const userProducts = snapshot.val() || [];
        userProducts.push(userData);
        return set(userRef, userProducts);
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error("Error saving user data:", error);
        reject(error);
      });
  });
};

export default saveUserProducts;
