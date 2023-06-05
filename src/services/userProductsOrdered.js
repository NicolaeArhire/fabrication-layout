import { ref, get, set, remove } from "firebase/database";
import { database } from "../firebase";
import { auth } from "../../src/firebase";

const userProductsOrdered = () => {
  const userRef = ref(database, `users/${auth.currentUser.uid}/productsInCart`);

  return new Promise((resolve, reject) => {
    get(userRef)
      .then((snapshot) => {
        const orderDate = new Date()
          .toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })
          .split("/")
          .reverse();

        const temp = orderDate[1];
        orderDate[1] = orderDate[2];
        orderDate[2] = temp;
        const orderTime = new Date().toLocaleString("en-US", { timeZone: "Europe/Bucharest", hour12: false }).slice(10, 15);
        const orderWeight = (sessionStorage.getItem("orderWeight") * 100).toFixed(0); //Firebase does not accept dots in folder name (logic)
        const orderCost = (sessionStorage.getItem("orderCost") * 100).toFixed(0); //Firebase does not accept dots in folder name (logic)

        const data = snapshot.val();
        const copiedUserRef = ref(
          database,
          `users/${auth.currentUser.uid}/productsOrdered_${orderDate.join("~")}_${orderTime}_${orderWeight}_${orderCost}`
        );

        set(copiedUserRef, data)
          .then(() => {
            remove(userRef)
              .then(() => {
                resolve();
              })
              .catch((error) => {
                console.error("Error deleting original folder:", error);
                reject(error);
              });
          })
          .catch((error) => {
            console.error("Error copying user data:", error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error("Error retrieving user data:", error);
        reject(error);
      });
  });
};

export default userProductsOrdered;
