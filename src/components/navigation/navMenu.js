import "./navMenu.css";
import photo from "../../assets/logo.png";
import { stack as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart, faPhone, faSquareRootAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState(localStorage.getItem("tab") || "Home");

  useEffect(() => {
    localStorage.setItem("tab", tab);
  }, [tab]);

  const handleMenuStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  const handleHomeTab = () => {
    setTab("Home");
  };

  const handleCalculatorTab = () => {
    setTab("Shape Calculator");
  };

  const handleCartTab = () => {
    setTab("Cart");
  };

  const handleContactTab = () => {
    setTab("Contact");
  };

  return (
    <div>
      <div className="menu_tab">
        <span className="chosen_tab">{tab}</span>
        <Link
          to="/cart"
          onClick={() => {
            setIsOpen(false);
            handleCartTab();
          }}
        >
          <span className="products_in_cart"></span>
        </Link>
      </div>
      <Menu className={"my-custom-menu"} animation={"stack"} isOpen={isOpen} onStateChange={handleMenuStateChange}>
        <div className="menu_img">
          <img src={photo} alt="logo.png" className="img_navbar" />
        </div>
        <Link
          to="/"
          onClick={() => {
            setIsOpen(false);
            handleHomeTab();
          }}
        >
          <FontAwesomeIcon icon={faHome} /> <span style={{ marginLeft: 10 }}>Home</span>
        </Link>
        <Link
          to="/calculator"
          onClick={() => {
            setIsOpen(false);
            handleCalculatorTab();
          }}
        >
          <FontAwesomeIcon icon={faSquareRootAlt} />
          <span style={{ marginLeft: 10 }}>Shape Calculator</span>
        </Link>
        <Link
          to="/cart"
          onClick={() => {
            setIsOpen(false);
            handleCartTab();
          }}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          <span style={{ marginLeft: 10 }}>Cart</span>
          <span className="no_of_products_in_cart">{sessionStorage.getItem("description") ? 1 : 0}</span>
        </Link>
        <Link
          to="/contact"
          onClick={() => {
            setIsOpen(false);
            handleContactTab();
          }}
        >
          <FontAwesomeIcon icon={faPhone} />
          <span style={{ marginLeft: 10 }}>Contact</span>
        </Link>
      </Menu>
    </div>
  );
}

export default NavMenu;
