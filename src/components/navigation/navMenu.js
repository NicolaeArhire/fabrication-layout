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
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faTwitter, faYoutube, faLinkedin, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useRef, useState } from "react";
import { readCart } from "../../services/storageCart";
import ReactModal from "react-modal";
import { readDB, addToDB, passDBToLocal } from "../../services/userAccount";
import { Bars } from "react-loader-spinner";
import emailjs from "@emailjs/browser";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SignUp from "../../signUpPassword";
import SignIn from "../../signInPassword";
import FacebookSignIn from "../../services/signInFacebook";
import googleSignIn from "../../services/signInGoogle";
import facebookSignIn from "../../services/signInFacebook";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState(localStorage.getItem("tab") || "Home");
  const [showModal, setShowModal] = useState(false);
  const [logOption, setLogOption] = useState("");
  const [userID, setUserID] = useState("");
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

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log(user);
  //     } else {
  //       console.log("user is logged out");
  //     }
  //   });
  // }, []);

  useEffect(() => {
    localStorage.setItem("tab", tab);
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
  }, [showModal, isOpen]);

  useEffect(() => {
    setRandomCode(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);

    const fetchDB = async () => {
      const result = await readDB();
      setUserID(result.record.length + 1);
    };

    fetchDB();
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

  const newAccountDate = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
  const newAccountMonth = new Date().getMonth() < 10 ? "0" + new Date().getMonth() : new Date().getMonth();
  const newAccountYear = new Date().getFullYear();

  const dateCreated = `${newAccountDate}-${newAccountMonth}-${newAccountYear}`;

  const newUser = {
    id: userID,
    username: username,
    mail: mail,
    pass: pass,
    created: dateCreated,
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
        pass === result.record.find((user) => user.mail === mail).pass
      ) {
        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>Welcome back, {result.record.find((user) => user.mail === mail).username}!</span>{" "}
              <FontAwesomeIcon icon={faCheck} id="check_icon" />
            </div>
          );
          setAccountCreated(true);
        }, 1000);

        passDBToLocal({
          username: result.record.find((user) => user.mail === mail).username,
          mail: result.record.find((user) => user.mail === mail).mail,
          created: result.record.find((user) => user.mail === mail).created,
        });
      } else if (!result.record.some((element) => Object.values(element)[2] === mail)) {
        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>This is not an existing e-mail address.</span>
            </div>
          );
        }, 1000);
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
              <span>Wrong password. Try again.</span>
            </div>
          );
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfigSignOut = async () => {
    localStorage.removeItem("userAccount");

    setMailCheck(
      <div className="mail_check">
        <Bars height="30" width="30" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
      </div>
    );

    setTimeout(() => {
      setMailCheck(
        <div className="mail_check">
          <span>You've been successfully signed out!</span> <FontAwesomeIcon icon={faCheck} id="check_icon" />
        </div>
      );
    }, 1000);
  };

  const handleConfigDoNotSignOut = async () => {
    setMailCheck(
      <div className="mail_check">
        <span>Smart choice not to sign out!</span> <FontAwesomeIcon icon={faThumbsUp} id="check_icon" />
      </div>
    );
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((userCredential) => {
        // Handle the successful login
        const user = userCredential.user;
        console.log("User logged in:", user);
        // Additional logic here...
      })
      .catch((error) => {
        // Handle login error
        console.log("Login error:", error);
        // Additional error handling here...
      });
  };

  const handleFacebookSignIn = () => {
    facebookSignIn()
      .then((userCredential) => {
        // Handle the successful login
        const user = userCredential.user;
        console.log("User logged in:", user);
        // Additional logic here...
      })
      .catch((error) => {
        // Handle login error
        console.log("Login error:", error);
        // Additional error handling here...
      });
  };

  const handleVisiblePass = () => {
    setVisibilePass((prevState) => !prevState);
  };

  const handleOpenSignInModal = () => {
    setShowModal(true);
    setIsOpen(false);
    setLogOption(1);
  };

  const handleOpenSignUpModal = () => {
    setShowModal(true);
    setIsOpen(false);
    setLogOption(2);
  };

  const handleOpenSignOutModal = () => {
    setShowModal(true);
    setIsOpen(false);
    setLogOption(3);
  };

  const handleMenuStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  const handleAccountTab = () => {
    setTab("My Account");
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
          <span>
            <i onClick={handleCloseModal}>
              <FontAwesomeIcon icon={faTimes} />
            </i>
          </span>
          {logOption === 1 ? (
            <>
              <div id="log_option">
                <span>Sign In.</span>
              </div>
              <div id="google_auth">
                <button onClick={handleGoogleSignIn}>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <g>
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      ></path>
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      ></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </g>
                  </svg>
                  Sign in with Google
                </button>
              </div>
              <div id="facebook_auth">
                <button onClick={handleFacebookSignIn}>
                  <FontAwesomeIcon icon={faFacebook} />
                  Sign in with Facebook
                </button>
              </div>
              <div id="social_login_hint">
                <span>Hint: </span>
                <span> If you use either Google or Facebook, sign in means also sign up.</span>
              </div>
              {/* <SignIn /> */}
              {/* <FacebookSignIn /> */}
              {/* <div>
                <button onClick={handleLogout}>Logout</button>
              </div> */}
              <div id="social_or_credentials">
                <hr />
                <span>OR</span>
              </div>
              <form action="post">
                <div className="user_credentials_content">
                  <input
                    type="text"
                    className="user_credentials_input"
                    id="mail"
                    placeholder=" "
                    autoComplete="email"
                    onChange={handleMailChange}
                    ref={userMailInput}
                  />
                  <label className="user_credentials_label">Your E-mail</label>
                </div>
                <div className="user_credentials_content">
                  <input
                    type={visiblePass ? "text" : "password"}
                    className="user_credentials_input"
                    id="password"
                    placeholder=" "
                    autoComplete="password"
                    onChange={handlePasswordChange}
                    ref={userPassInput}
                  />
                  <FontAwesomeIcon
                    icon={visiblePass ? faEye : faEyeSlash}
                    style={{ width: 20, color: "white", cursor: "pointer", marginLeft: 5 }}
                    onClick={handleVisiblePass}
                  />
                  <label htmlFor="password" className="user_credentials_label">
                    Your Password
                  </label>
                </div>
              </form>
              {mailCheck}
              <button onClick={handleConfigSignIn} disabled={accountCreated} id="sign_in_button">
                Sign In
              </button>
              <div id="sign_up">
                <span>- Don't have an account? </span>
                <span onClick={handleOpenSignUpModal} disabled={localStorage.getItem("userAccount")} id="sign_up_button">
                  Sign up.
                </span>
              </div>
            </>
          ) : logOption === 2 ? (
            <>
              {" "}
              <div id="log_option">
                <span>Sign Up.</span>
              </div>
              <form action="post">
                <div className="user_credentials_content">
                  <input
                    type="text"
                    className="user_credentials_input"
                    id="username"
                    placeholder=" "
                    autoComplete="username"
                    onChange={handleUsernameChange}
                    ref={userNameInput}
                  />
                  <label className="user_credentials_label">Your Username</label>
                </div>
                <div className="user_credentials_content">
                  <input
                    type="text"
                    className="user_credentials_input"
                    id="mail"
                    placeholder=" "
                    autoComplete="email"
                    onChange={handleMailChange}
                    ref={userMailInput}
                  />
                  <label className="user_credentials_label">Your E-mail</label>
                </div>
                <div className="user_credentials_content">
                  <input
                    type={visiblePass ? "text" : "password"}
                    className="user_credentials_input"
                    id="password"
                    placeholder=" "
                    autoComplete="password"
                    onChange={handlePasswordChange}
                    ref={userPassInput}
                  />
                  <FontAwesomeIcon
                    icon={visiblePass ? faEye : faEyeSlash}
                    style={{ width: 20, color: "white", cursor: "pointer", marginLeft: 5 }}
                    onClick={handleVisiblePass}
                  />
                  <label htmlFor="password" className="user_credentials_label">
                    Your Password
                  </label>
                </div>
              </form>
              {mailCheck}
              <button
                onClick={visibileCodeCheck ? handleConfigSignUp : handleCheckSignUpAccount}
                disabled={accountCreated}
                id="sign_in_button"
              >
                Create Account
              </button>
              <div id="sign_up">
                <span>- Back to </span>
                <span onClick={handleOpenSignInModal} disabled={localStorage.getItem("userAccount")} id="sign_up_button">
                  sign in.
                </span>
              </div>
            </>
          ) : logOption === 3 ? (
            <>
              <span style={{ marginTop: 20, marginBottom: 20 }}>Are you sure you want to sign out?</span>
              <div id="signOut_confirm">
                <button onClick={handleConfigSignOut}>Yes</button>
                <button onClick={handleConfigDoNotSignOut}>No</button>
              </div>
              {mailCheck}
            </>
          ) : (
            ""
          )}
        </div>
      </ReactModal>
      <div className="menu_tab">
        <span className="chosen_tab">{tab}</span>
      </div>
      <Menu className={"my-custom-menu"} animation={"stack"} isOpen={isOpen} onStateChange={handleMenuStateChange}>
        <div className="menu_img" style={{ display: "flex" }}>
          <img src="/logo.png" alt="logo.png" className="img_navbar" />
        </div>
        <div id="auth_options" style={{ display: "flex" }}>
          <button onClick={handleOpenSignInModal} disabled={localStorage.getItem("userAccount")}>
            Sign In
          </button>
          <button onClick={handleOpenSignOutModal} disabled={!localStorage.getItem("userAccount")}>
            Sign Out
          </button>
        </div>
        <Link
          to="/my-account"
          onClick={() => {
            setIsOpen(false);
            handleAccountTab();
          }}
          style={{ display: localStorage.getItem("userAccount") ? "flex" : "none" }}
        >
          <FontAwesomeIcon icon={faGear} /> <span style={{ marginLeft: 10 }}>My Account</span>
        </Link>
        <Link
          to="/"
          onClick={() => {
            setIsOpen(false);
            handleHomeTab();
          }}
          style={{ display: "flex" }}
        >
          <FontAwesomeIcon icon={faHome} /> <span style={{ marginLeft: 10 }}>Home</span>
        </Link>
        <Link
          to="/calculator"
          onClick={() => {
            setIsOpen(false);
            handleCalculatorTab();
          }}
          style={{ display: "flex" }}
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
          style={{ display: "flex" }}
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
          style={{ display: "flex" }}
        >
          <FontAwesomeIcon icon={faPhone} />
          <span style={{ marginLeft: 10 }}>Contact</span>
        </Link>
        <div id="menu_footer" style={{ display: "flex" }}>
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
