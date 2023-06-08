const writeCart = (data) => {
  const storedCartStr = localStorage.getItem("products_no_user");
  const storedCart = storedCartStr ? JSON.parse(storedCartStr) : [];
  storedCart.push(data);
  localStorage.setItem("products_no_user", JSON.stringify(storedCart));
  localStorage.setItem("display_cart_guest", JSON.stringify(storedCart.length));
};

const readCart = () => {
  const storedCartStr = localStorage.getItem("products_no_user");
  return storedCartStr ? JSON.parse(storedCartStr) : [];
};

const deleteFromCart = (index) => {
  const storedCartStr = localStorage.getItem("products_no_user");
  const storedCart = storedCartStr ? JSON.parse(storedCartStr) : [];
  storedCart.splice(index, 1);
  localStorage.setItem("products_no_user", JSON.stringify(storedCart));
  localStorage.setItem("display_cart_guest", JSON.stringify(storedCart.length));
};

const clearCart = () => {
  const storedCartStr = localStorage.getItem("products_no_user");
  const storedCart = storedCartStr ? JSON.parse(storedCartStr) : [];
  storedCart.splice(0, storedCart.length);
  localStorage.setItem("products_no_user", JSON.stringify(storedCart));
  localStorage.setItem("display_cart_guest", 0);
};

export { writeCart, deleteFromCart, clearCart, readCart };
