import React, { createContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
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

  return (
    <div className="app">
      <MyContext.Provider value={{ modalIsOpen, setModalIsOpen }}>
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
