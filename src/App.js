import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import PlateCalculator from "./pages/plateCalculator/plateCalculator";
import Cart from "./pages/cart/cart";
import Contact from "./pages/contact/contact";
import NavMenu from "./components/navigation/navMenu";

function App() {
  return (
    <div className="app">
      <Router>
        <div className="fixed-nav">
          <NavMenu />
        </div>
        <Routes>
          <Route index element={<Home />} className="page_home"></Route>
          <Route path="/calculator" element={<PlateCalculator />} className="page_calculator"></Route>
          <Route path="/cart" element={<Cart />} className="page_cart"></Route>
          <Route path="/contact" element={<Contact />} className="page_contact"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
