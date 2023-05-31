const writeCart = (data) => {
  const storedCartStr = localStorage.getItem("products_no_user");
  const storedCart = storedCartStr ? JSON.parse(storedCartStr) : [];
  storedCart.push(data);
  localStorage.setItem("products_no_user", JSON.stringify(storedCart));
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
};

const clearCart = () => {
  const storedCartStr = localStorage.getItem("products_no_user");
  const storedCart = storedCartStr ? JSON.parse(storedCartStr) : [];
  storedCart.splice(0, storedCart.length);
  localStorage.setItem("products_no_user", JSON.stringify(storedCart));
};

export { writeCart, deleteFromCart, clearCart, readCart };
