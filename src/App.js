import React, { createContext, useState, useEffect, lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { auth } from "./firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavMenu from "./components/navigation/navMenu";
import ParticlesBackground from "./services/particles";

const Home = lazy(() => import("./pages/home/home"));
const PlateCalculator = lazy(() => import("./pages/plateCalculator/plateCalculator"));
const Cart = lazy(() => import("./pages/cart/cart"));
const Contact = lazy(() => import("./pages/contact/contact"));
const MyAccount = lazy(() => import("./pages/myAccount/myAccount"));

export const MyContext = createContext();

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [displayCartProducts, setDisplayCartProducts] = useState(0);
  const [cartCoordinates, setCartCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setDisplayCartProducts(user ? localStorage.getItem("display_cart_user") || 0 : localStorage.getItem("display_cart_guest") || 0);
    });

    return () => unsubscribe();
  }, []); // display cart products based on logged in status

  return (
    <div className="app">
      <ParticlesBackground />
      <MyContext.Provider
        value={{ modalIsOpen, setModalIsOpen, displayCartProducts, setDisplayCartProducts, cartCoordinates, setCartCoordinates }}
      >
        <Router>
          <div className="fixed-nav">
            <NavMenu setModalIsOpen={setModalIsOpen} />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/my-account" element={<MyAccount />} className="page_account" />
              <Route index element={<Home />} className="page_home" />
              <Route path="/calculator" element={<PlateCalculator />} className="page_calculator" />
              <Route path="/cart" element={<Cart />} className="page_cart" />
              <Route path="/contact" element={<Contact />} className="page_contact" />
            </Routes>
          </Suspense>
        </Router>
      </MyContext.Provider>
    </div>
  );
}

export default App;
