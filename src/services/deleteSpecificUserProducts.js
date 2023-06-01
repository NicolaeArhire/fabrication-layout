import { ref, get, set } from "firebase/database";
import { database } from "../firebase";
import { auth } from "../../src/firebase";

const deleteSpecificUserProducts = (index) => {
  const userRef = ref(database, `users/${auth.currentUser.uid}/products`);

  return new Promise((resolve, reject) => {
    get(userRef)
      .then((snapshot) => {
        const productList = snapshot.val();
        productList.splice(index, 1);
        const updatedProductList = productList.map((product, newIndex) => {
          return { ...product, index: newIndex };
        });
        set(userRef, updatedProductList)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            console.error("Error updating product list:", error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error("Error retrieving product list:", error);
        reject(error);
      });
  });
};

export default deleteSpecificUserProducts;
