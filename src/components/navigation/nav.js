import "./nav.css";
import { Link } from "react-router-dom";
import photo from "../../assets/logo.png";
import { useState, useEffect, useRef } from "react";

const Navigation = () => {
  const homeRef = useRef(null);
  const plateCalculatorRef = useRef(null);
  const cartRef = useRef(null);
  const contactRef = useRef(null);

  const [currentButton, setCurrentButton] = useState("");
  const [homeClicked, setHomeClicked] = useState(true);
  const [calculatorClicked, setCalculatorClicked] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);
  const [contactClicked, setContactClicked] = useState(false);
  const [homeToggle, setHomeToggle] = useState(true);
  const [calculatorToggle, setCalculatorToggle] = useState(false);
  const [cartToggle, setCartToggle] = useState(false);
  const [contactToggle, setContactToggle] = useState(false);

  useEffect(() => {
    if (currentButton === "home") {
      const text = homeRef.current;
      const letters = text.innerText.split("");
      text.innerText = "";

      for (let i = 0; i < letters.length; i++) {
        const span = document.createElement("span");
        span.innerText = letters[i];
        span.style.animationDelay = i * 0.1 + "s";
        text.appendChild(span);
      }
      text.style.display = "inline-block";
    }
  }, [homeToggle, currentButton]);

  useEffect(() => {
    if (currentButton === "calculator") {
      const text = plateCalculatorRef.current;
      const letters = text.innerText.split("");
      text.innerText = "";

      for (let i = 0; i < letters.length; i++) {
        const span = document.createElement("span");
        span.innerText = letters[i];
        span.style.animationDelay = i * 0.05 + "s";
        text.appendChild(span);
      }
      text.style.display = "inline-block";
    }
  }, [calculatorToggle, currentButton]);

  useEffect(() => {
    if (currentButton === "cart") {
      const text = cartRef.current;
      const letters = text.innerText.split("");
      text.innerText = "";

      for (let i = 0; i < letters.length; i++) {
        const span = document.createElement("span");
        span.innerText = letters[i];
        span.style.animationDelay = i * 0.1 + "s";
        text.appendChild(span);
      }
      text.style.display = "inline-block";
    }
  }, [cartToggle, currentButton]);

  useEffect(() => {
    if (currentButton === "contact") {
      const text = contactRef.current;
      const letters = text.innerText.split("");
      text.innerText = "";

      for (let i = 0; i < letters.length; i++) {
        const span = document.createElement("span");
        span.innerText = letters[i];
        span.style.animationDelay = i * 0.1 + "s";
        text.appendChild(span);
      }
      text.style.display = "inline-block";
    }
  }, [contactToggle, currentButton]);

  const handleHomeClick = () => {
    setCurrentButton("home");
    setHomeToggle(true);
    setCalculatorToggle(false);
    setCartToggle(false);
    setContactToggle(false);
    setHomeClicked(true);
    setCalculatorClicked(false);
    setCartClicked(false);
    setContactClicked(false);
  };

  const handleCalculatorClick = () => {
    setCurrentButton("calculator");
    setHomeToggle(false);
    setCalculatorToggle(true);
    setCartToggle(false);
    setContactToggle(false);
    setHomeClicked(false);
    setCalculatorClicked(true);
    setCartClicked(false);
    setContactClicked(false);
  };

  const handleCartClick = () => {
    setCurrentButton("cart");
    setHomeToggle(false);
    setCalculatorToggle(false);
    setCartToggle(true);
    setContactToggle(false);
    setHomeClicked(false);
    setCalculatorClicked(false);
    setCartClicked(true);
    setContactClicked(false);
  };

  const handleContactClick = () => {
    setCurrentButton("contact");
    setHomeToggle(false);
    setCalculatorToggle(false);
    setCartToggle(false);
    setContactToggle(true);
    setHomeClicked(false);
    setCalculatorClicked(false);
    setCartClicked(false);
    setContactClicked(true);
  };

  return (
    <div className="nav_container">
      <div>
        <div className="navbar_menu">
          <div className="navbar_menu_left">
            <Link to="#" className="img_nav">
              <img src={photo} alt="logo.png" className="img_navbar" />
            </Link>
          </div>
          <div>
            <Link to="/" className={homeClicked ? "nav_link clicked" : "nav_link"} ref={homeRef} onClick={handleHomeClick}>
              Home
            </Link>
            <Link
              to="/calculator"
              className={calculatorClicked ? "nav_link clicked" : "nav_link"}
              ref={plateCalculatorRef}
              onClick={handleCalculatorClick}
            >
              Calculator
            </Link>
            <Link to="/cart" className={cartClicked ? "nav_link clicked" : "nav_link"} ref={cartRef} onClick={handleCartClick}>
              Cart
            </Link>
            <Link to="/contact" className={contactClicked ? "nav_link clicked" : "nav_link"} ref={contactRef} onClick={handleContactClick}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
