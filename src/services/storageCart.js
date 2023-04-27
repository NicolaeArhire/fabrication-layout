const writeCart = (data) => {
  const storedCartStr = sessionStorage.getItem("cart");
  const storedCart = storedCartStr ? JSON.parse(storedCartStr) : [];
  storedCart.push(data);
  sessionStorage.setItem("cart", JSON.stringify(storedCart));
};

const readCart = () => {
  const storedCartStr = sessionStorage.getItem("cart");
  return storedCartStr ? JSON.parse(storedCartStr) : [];
};

const deleteFromCart = (index) => {
  const storedCartStr = sessionStorage.getItem("cart");
  const storedCart = storedCartStr ? JSON.parse(storedCartStr) : [];
  const removedItemFromCart = storedCart.splice(index, 1);
  sessionStorage.setItem("cart", JSON.stringify(storedCart));
};

export { writeCart, deleteFromCart, readCart };
