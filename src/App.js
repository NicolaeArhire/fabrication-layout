import React, { createContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { auth } from "./firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import PlateCalculator from "./pages/plateCalculator/plateCalculator";
import Cart from "./pages/cart/cart";
import Contact from "./pages/contact/contact";
import NavMenu from "./components/navigation/navMenu";
import MyAccount from "./pages/myAccount/myAccount";

export const MyContext = createContext();

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [displayCartProducts, setDisplayCartProducts] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setDisplayCartProducts(user ? localStorage.getItem("display_cart_user") || 0 : localStorage.getItem("display_cart_guest") || 0);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="app">
      <MyContext.Provider value={{ modalIsOpen, setModalIsOpen, displayCartProducts, setDisplayCartProducts }}>
        <Router>
          <div className="fixed-nav">
            <NavMenu setModalIsOpen={setModalIsOpen} />
          </div>
          <Routes>
            <Route path="/my-account" element={<MyAccount />} className="page_account" />
            <Route index element={<Home />} className="page_home" />
            <Route path="/calculator" element={<PlateCalculator />} className="page_calculator" />
            <Route path="/cart" element={<Cart />} className="page_cart" />
            <Route path="/contact" element={<Contact />} className="page_contact" />
          </Routes>
        </Router>
      </MyContext.Provider>
    </div>
  );
}

export default App;
