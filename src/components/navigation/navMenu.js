import "./navMenu.css";
import { stack as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingCart,
  faPhone,
  faSquareRootAlt,
  faPhoneSquare,
  faTimes,
  faEye,
  faEyeSlash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faTwitter, faYoutube, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { readCart } from "../../services/storageCart";
import ReactModal from "react-modal";
import { readDB, addToDB } from "../../services/userAccount";
import { Bars } from "react-loader-spinner";

function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState(localStorage.getItem("tab") || "Home");
  const [showModal, setShowModal] = useState(false);
  const [accountIntro, setAccountIntro] = useState("");
  const [confirmButton, setConfirmButton] = useState("");
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [mail, setMail] = useState("");
  const [mailCheck, setMailCheck] = useState("");
  const [visiblePass, setVisibilePass] = useState(false);

  useEffect(() => {
    localStorage.setItem("tab", tab);
    setShowModal(false);
  }, [tab]);

  const handleCloseModal = () => {
    setShowModal(false);
    setMailCheck("");
    setVisibilePass(false);
  };

  const handleConfigSignUp = async () => {
    const newUser = {
      username: username,
      mail: mail,
      pass: pass,
    };

    setMailCheck(<Bars height="30" width="30" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />);

    try {
      const result = await readDB();
      if (result.record.some((element) => Object.values(element)[1] === mail)) {
        setTimeout(() => {
          setMailCheck("Mail already existing. Check again.");
        }, 2000);
      } else {
        await addToDB(newUser);
        setMailCheck(<FontAwesomeIcon icon={faCheck} style={{ color: "green", width: 35, height: 35 }} />);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfigSignIn = () => {
    console.log(`mail - ${mail}`);
    console.log(`pass - ${pass}`);
  };

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPass(e.target.value);
  };
  const handleMailChange = (e) => {
    setMail(e.target.value);
  };

  const handleVisiblePass = () => {
    setVisibilePass((prevState) => !prevState);
  };

  const handleOpenSignInModal = () => {
    setShowModal(true);
    setIsOpen(false);
    setConfirmButton("Sign In");
    setAccountIntro("Please type your e-mail and password.");
  };
  const handleOpenSignUpModal = () => {
    setShowModal(true);
    setIsOpen(false);
    setConfirmButton("Create Account");
    setAccountIntro("Please set the credentials for your account.");
  };

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
      <ReactModal isOpen={showModal} onRequestClose={handleCloseModal} className="login_modal" ariaHideApp={false}>
        <div className="login_modal_content">
          <span style={{ marginBottom: 20 }}>
            <i onClick={handleCloseModal}>
              <FontAwesomeIcon icon={faTimes} />
            </i>
          </span>
          <span>{accountIntro}</span>
          <form action="post">
            {confirmButton === "Create Account" ? (
              <>
                <label htmlFor="username">Username:</label> <br />
                <input type="text" id="username" autoComplete="username" onChange={handleUsernameChange} /> <br />
              </>
            ) : (
              ""
            )}
            <label htmlFor="email">E-mail:</label> <br />
            <input type="email" id="mail" autoComplete="email" onChange={handleMailChange} />
            <br />
            <label htmlFor="password">Password:</label> <br />
            <input type={visiblePass ? "text" : "password"} id="password" autoComplete="password" onChange={handlePasswordChange} />{" "}
            <FontAwesomeIcon
              icon={visiblePass ? faEye : faEyeSlash}
              style={{ width: 20, color: "white", cursor: "pointer", marginLeft: 5 }}
              onClick={handleVisiblePass}
            />
            <br />
          </form>
          <button
            onClick={confirmButton === "Create Account" ? handleConfigSignUp : handleConfigSignIn}
            disabled={confirmButton === "Create Account" ? username === "" || mail === "" || pass === "" : mail === "" || pass === ""}
          >
            {confirmButton}
          </button>
          {confirmButton === "Create Account" ? (
            <>
              {" "}
              <span>{mailCheck}</span>
              <span style={{ marginTop: 10 }}>
                Go back to{" "}
                <span className="signUp_button" onClick={handleOpenSignInModal}>
                  sign in.
                </span>
              </span>
            </>
          ) : (
            <>
              <span>Don't have an account yet?</span>
              <span>
                Simply create one{" "}
                <span className="signUp_button" onClick={handleOpenSignUpModal}>
                  here.
                </span>
              </span>
            </>
          )}
        </div>
      </ReactModal>
      <div className="menu_tab">
        <span className="chosen_tab">{tab}</span>
        <Link
          to="/cart"
          onClick={() => {
            setIsOpen(false);
            handleCartTab();
          }}
        ></Link>
      </div>
      <Menu className={"my-custom-menu"} animation={"stack"} isOpen={isOpen} onStateChange={handleMenuStateChange}>
        <div className="menu_img">
          <img src="/logo.png" alt="logo.png" className="img_navbar" />
        </div>
        <div className="login_menu">
          <button onClick={handleOpenSignInModal} disabled={tab === "Shape Calculator"}>
            Access your account
          </button>
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
