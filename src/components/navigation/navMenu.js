import "./navMenu.css";
import photo from "../../assets/logo.png";
import { stack as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart, faPhone, faSquareRootAlt, faPhoneSquare } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faTwitter, faYoutube, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { readCart } from "../../services/storageCart";

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
          <span className="no_of_products_in_cart">{readCart().length > 0 ? readCart().length : 0}</span>
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
        <div className="menu_footer">
          <span style={{ fontSize: 16, color: "white", marginRight: 0, textDecoration: "underline" }}>nicolae.arhire10@gmail.com</span>
          <div>
            <FontAwesomeIcon icon={faPhoneSquare} style={{ color: "white", marginRight: 5 }} />
            <span style={{ fontSize: 16, color: "white", marginRight: 15, textDecoration: "underline" }}>0712345678</span>
          </div>
          <div className="footer_icons">
            <a href="https://www.freecodecamp.org" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGoogle} className="icon_google" />
            </a>
            <a href="https://twitter.com/freeCodeCamp" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="icon_twitter" />
            </a>
            <a href="https://www.youtube.com/c/Freecodecamp" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} className="icon_youtube" />
            </a>
            <a href="https://www.linkedin.com/school/free-code-camp" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="icon_linkedIn" />
            </a>
            <a href="https://www.freecodecamp.org" target="_blank" rel="noopener noreferrer">
              <span className="google"></span>
            </a>
          </div>
          <span>© {new Date().getFullYear()} All rights reserved</span>
        </div>
      </Menu>
    </div>
  );
}

export default NavMenu;
