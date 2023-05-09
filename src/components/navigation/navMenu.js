import "./navMenu.css";
import { stack as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
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
import { useEffect, useRef, useState } from "react";
import { readCart } from "../../services/storageCart";
import ReactModal from "react-modal";
import { readDB, addToDB, passDBToLocal } from "../../services/userAccount";
import { Bars } from "react-loader-spinner";
import emailjs from "@emailjs/browser";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState(localStorage.getItem("tab") || "Home");
  const [showModal, setShowModal] = useState(false);
  const [accountIntro, setAccountIntro] = useState("");
  const [confirmButton, setConfirmButton] = useState("");
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [mail, setMail] = useState("");
  const [mailCheck, setMailCheck] = useState("");
  const [mailCode, setMailCode] = useState("");
  const [randomCode, setRandomCode] = useState("");
  const [visibileCodeCheck, setVisibileCodeCheck] = useState(false);
  const [visiblePass, setVisibilePass] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const userNameInput = useRef(null);
  const userMailInput = useRef(null);
  const userPassInput = useRef(null);

  useEffect(() => {
    localStorage.setItem("tab", tab);
    tab === "My Account" ? setShowModal(true) : setShowModal(false);
  }, [tab]);

  useEffect(() => {
    if (userNameInput.current) userNameInput.current.value = "";
    if (userMailInput.current) userMailInput.current.value = "";
    if (userPassInput.current) userPassInput.current.value = "";
    setUserName("");
    setMail("");
    setPass("");
    setMailCheck("");
    setVisibilePass(false);
    setVisibileCodeCheck(false);
    setAccountCreated(false);
  }, [confirmButton, showModal]);

  useEffect(() => {
    setRandomCode(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
  }, [mail]);

  const handleCloseModal = () => {
    if (userNameInput.current) userNameInput.current.value = "";
    if (userMailInput.current) userMailInput.current.value = "";
    if (userPassInput.current) userPassInput.current.value = "";
    setUserName("");
    setMail("");
    setPass("");
    setShowModal(false);
    setMailCheck("");
    setVisibilePass(false);
    setVisibileCodeCheck(false);
    setAccountCreated(false);
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

  const newUser = {
    username: username,
    mail: mail,
    pass: pass,
  };

  const emailData = {
    to_name: username,
    new_mail: mail,
    confirmation_code: randomCode,
  };

  const handleCheckSignUpAccount = async () => {
    setMailCheck(
      <div className="mail_check">
        <Bars height="30" width="30" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
      </div>
    );

    try {
      const result = await readDB();

      if (result.record.some((element) => Object.values(element)[2] === mail)) {
        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>Mail already existing. Check again.</span>
            </div>
          );
        }, 1000);
      } else if (username === "" || mail === "" || pass === "") {
        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>Please fill in required fields.</span>
            </div>
          );
        }, 1000);
      } else if (!mail.includes("@")) {
        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>Mail address must include "@"</span>
            </div>
          );
        }, 1000);
      } else if (!mail.includes(".")) {
        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>Mail address must include "."</span>
            </div>
          );
        }, 1000);
      } else {
        setVisibileCodeCheck(true);

        emailData.id = result.record.length + 1;

        const accountDate = new Date().getDate() < 9 ? "0" + new Date().getDate() : new Date().getDate();
        const accountMonth = new Date().getMonth() < 9 ? "0" + new Date().getMonth() : new Date().getMonth();
        const accountYear = new Date().getFullYear();

        emailData.created = `${accountDate}-${accountMonth}-${accountYear}`;

        console.log(emailData);

        emailjs.send(
          process.env.REACT_APP_EMAILJS_SIGNUP_SERVICE,
          process.env.REACT_APP_EMAILJS_SIGNUP_TEMPLATE,
          emailData,
          process.env.REACT_APP_EMAILJS_SIGNUP_KEY
        );

        const handleMailCode = (e) => {
          setMailCode(e.target.value);
        };

        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>Type the code we've sent you:</span>
              <input type="text" onChange={handleMailCode} />
            </div>
          );
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfigSignUp = () => {
    setMailCheck(
      <div className="mail_check">
        <Bars height="30" width="30" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
      </div>
    );

    try {
      if (parseInt(mailCode) === emailData.confirmation_code) {
        addToDB(newUser);
        setAccountCreated(true);

        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>Account created &nbsp;</span> <FontAwesomeIcon icon={faCheck} id="check_icon" />
            </div>
          );
        }, 1000);
      } else {
        const handleMailCode = (e) => {
          setMailCode(e.target.value);
        };

        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>Wrong code. Please try again.</span>
              <input type="text" onChange={handleMailCode} />
            </div>
          );
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfigSignIn = async () => {
    setMailCheck(
      <div className="mail_check">
        <Bars height="30" width="30" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
      </div>
    );

    try {
      const result = await readDB();
      if (
        result.record.some((element) => Object.values(element)[2] === mail) &&
        result.record.some((element) => Object.values(element)[3] === pass)
      ) {
        setAccountCreated(true);

        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>Welcome back, {result.record.find((user) => user.mail === mail).username}!</span>{" "}
              <FontAwesomeIcon icon={faCheck} id="check_icon" />
            </div>
          );
        }, 1000);

        setTimeout(() => {
          setShowModal(false);
        }, 3000);

        passDBToLocal({
          username: result.record.find((user) => user.mail === mail).username,
          mail: result.record.find((user) => user.mail === mail).mail,
          pass: result.record.find((user) => user.mail === mail).pass,
        });
      } else if (mail === "" || pass === "") {
        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>Please fill in required fields.</span>
            </div>
          );
        }, 1000);
      } else if (!(pass === result.record.find((user) => user.mail === mail).pass)) {
        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>
                Wrong password. <span style={{ color: "cyan", textDecoration: "underline" }}>Forgot it?</span>
              </span>
            </div>
          );
        }, 1000);
      } else {
        setVisibileCodeCheck(true);

        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>This is not an existing account.</span>
            </div>
          );
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVisiblePass = () => {
    setVisibilePass((prevState) => !prevState);
  };

  const handleOpenSignInModal = () => {
    setTab("My Account");
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
                <input type="text" ref={userNameInput} id="username" autoComplete="username" onChange={handleUsernameChange} /> <br />
              </>
            ) : (
              ""
            )}
            <label htmlFor="email">E-mail:</label> <br />
            <input type="email" ref={userMailInput} id="mail" autoComplete="email" onChange={handleMailChange} />
            <br />
            <label htmlFor="password">Password:</label> <br />
            <input
              type={visiblePass ? "text" : "password"}
              ref={userPassInput}
              id="password"
              autoComplete="password"
              onChange={handlePasswordChange}
            />{" "}
            <FontAwesomeIcon
              icon={visiblePass ? faEye : faEyeSlash}
              style={{ width: 20, color: "white", cursor: "pointer", marginLeft: 5 }}
              onClick={handleVisiblePass}
            />
            <br />
          </form>
          {mailCheck}
          <button
            onClick={
              confirmButton === "Create Account" ? (visibileCodeCheck ? handleConfigSignUp : handleCheckSignUpAccount) : handleConfigSignIn
            }
            disabled={accountCreated}
          >
            {confirmButton}
          </button>
          {confirmButton === "Create Account" ? (
            <>
              <span style={{ marginTop: 10 }}>
                Go back to{" "}
                <span className="signUp_button" onClick={handleOpenSignInModal}>
                  sign in.
                </span>
              </span>
            </>
          ) : (
            <>
              {" "}
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
      </div>
      <Menu className={"my-custom-menu"} animation={"stack"} isOpen={isOpen} onStateChange={handleMenuStateChange}>
        <div className="menu_img">
          <img src="/logo.png" alt="logo.png" className="img_navbar" />
        </div>
        <Link
          to="/my-account"
          onClick={() => {
            setIsOpen(false);
            if (!localStorage.getItem("userAccount")) {
              handleOpenSignInModal();
            }
          }}
        >
          <FontAwesomeIcon icon={faGear} /> <span style={{ marginLeft: 10 }}>My Account</span>
        </Link>
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
};

export default NavMenu;
