import "./navMenu.css";
import { auth } from "../../firebase";
import { stack as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAlt,
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
import { Bars } from "react-loader-spinner";
import emailjs from "@emailjs/browser";
import passwordSignIn from "../../services/signInPassword";
import passwordSignUp from "../../services/signUpPassword";
import googleSignIn from "../../services/signInGoogle";
import facebookSignIn from "../../services/signInFacebook";
import signOutUser from "../../services/signOutUser";
import deleteUserAccount from "../../services/deleteAccount";
import forgotPassword from "../../services/forgotPassword";
import readUserData from "../../services/readUserData";

const NavMenu = ({ setModalIsOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [logOption, setLogOption] = useState("");
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [mail, setMail] = useState("");
  const [mailCheck, setMailCheck] = useState("");
  const [mailCode, setMailCode] = useState("");
  const [wrongMailCode, setWrongMailCode] = useState(false);
  const [randomCode, setRandomCode] = useState("");
  const [visibileCodeCheck, setVisibileCodeCheck] = useState(false);
  const [visiblePass, setVisibilePass] = useState(false);
  const [socialLoginCheck, setSocialLoginCheck] = useState("");
  const [isForgotPass, setIsForgotPass] = useState(false);
  const [userCartProducts, setUserCartProducts] = useState(0);

  const userNameInput = useRef(null);
  const userMailInput = useRef(null);
  const userPassInput = useRef(null);

  const loggedUser = auth.currentUser || "";

  const location = window.location.href;

  useEffect(() => {
    if (location.includes("/my")) {
      setTab("My Account");
    } else if (location.includes("/calculator")) {
      setTab("Shape Calculator");
    } else if (location.includes("/cart")) {
      setTab("Cart");
    } else if (location.includes("/contact")) {
      setTab("Contact");
    } else {
      setTab("Home");
    }
  }, [location]);

  useEffect(() => {
    if (loggedUser) {
      readUserData(loggedUser.uid)
        .then((data) => {
          setUserCartProducts(data && data.productsInCart ? data.productsInCart.length : 0);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setUserCartProducts(0);
    }
  }, [showModal, isOpen, loggedUser]);

  useEffect(() => {
    if (userNameInput.current) userNameInput.current.value = "";
    if (userMailInput.current) userMailInput.current.value = "";
    if (userPassInput.current) userPassInput.current.value = "";
    setUserName("");
    setMail("");
    setPass("");
    setSocialLoginCheck("");
    setMailCheck("");
    setWrongMailCode(false);
    setVisibilePass(false);
    setVisibileCodeCheck(false);
    setIsForgotPass(false);
  }, [showModal, isOpen]);

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
    setSocialLoginCheck("");
    setShowModal(false);
    setMailCheck("");
    setWrongMailCode(false);
    setVisibilePass(false);
    setVisibileCodeCheck(false);
    setIsForgotPass(false);
    setModalIsOpen(false);

    if (tab === "My Account" && !loggedUser) {
      window.location.href = "/";
      setIsOpen(false);
    } else if (tab === "Cart") {
      window.location.reload();
    }
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

  const emailData = {
    to_name: username,
    new_mail: mail,
    confirmation_code: randomCode,
  };

  const handleSignUpChecking = async (e) => {
    e.preventDefault();

    setMailCheck(
      <div className="mail_check">
        <Bars height="30" width="30" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
      </div>
    );

    if (mail && pass && username) {
      try {
        await passwordSignUp(mail, pass, username);

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
        }, 500);
      } catch (error) {
        if (error.code === "auth/invalid-email") {
          setTimeout(() => {
            setMailCheck(
              <div className="mail_check">
                <span>This is not a valid e-mail address.</span>
              </div>
            );
          }, 500);
        } else if (error.code === "auth/weak-password") {
          setTimeout(() => {
            setMailCheck(
              <div className="mail_check">
                <span>Password has to be at least 6 characters.</span>
              </div>
            );
          }, 500);
        } else if (error.code === "auth/email-already-in-use") {
          setTimeout(() => {
            setMailCheck(
              <div className="mail_check">
                <span>E-mail address already registered.</span>
              </div>
            );
          }, 500);
        } else if (error.code === "app/no-options") {
          setTimeout(() => {
            setMailCheck(
              <div className="mail_check">
                <span>Error {"->"} app/no-options</span>
              </div>
            );
          }, 500);
        }
      }
    } else {
      setTimeout(() => {
        setMailCheck(
          <div className="mail_check">
            <span>Please fill in required fields.</span>
          </div>
        );
      }, 500);
    }
  };

  const handleSignUpCreate = async () => {
    setMailCheck(
      <div className="mail_check">
        <Bars height="30" width="30" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
      </div>
    );

    try {
      if (parseInt(mailCode) === emailData.confirmation_code) {
        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>Account created. Please sign in. &nbsp;</span> <FontAwesomeIcon icon={faCheck} id="check_icon" />
            </div>
          );
        }, 500);
      } else {
        setWrongMailCode(true);
        deleteUserAccount();

        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>Wrong code. Please submit again.</span>
            </div>
          );
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordSignIn = async () => {
    setMailCheck(
      <div className="mail_check">
        <Bars height="30" width="30" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
      </div>
    );

    if (mail && pass) {
      try {
        const user = await passwordSignIn(mail, pass);

        if (user.displayName) {
          setTimeout(() => {
            setMailCheck(
              <div className="mail_check">
                <span>Welcome back, {user.displayName}! &nbsp;</span> <FontAwesomeIcon icon={faCheck} id="check_icon" />
              </div>
            );
          }, 500);
        }
      } catch (error) {
        if (error.code === "auth/missing-email") {
          setTimeout(() => {
            setMailCheck(
              <div className="mail_check">
                <span>E-mail address not registered.</span>
              </div>
            );
          }, 500);
        } else if (error.code === "auth/invalid-email") {
          setTimeout(() => {
            setMailCheck(
              <div className="mail_check">
                <span>Wrong e-mail address.</span>
              </div>
            );
          }, 500);
        } else if (error.code === "auth/wrong-password") {
          setTimeout(() => {
            setMailCheck(
              <div className="mail_check">
                <span>Wrong password.</span>
              </div>
            );
          }, 500);
        } else if (error.code === "app/no-options") {
          setTimeout(() => {
            setMailCheck(
              <div className="mail_check">
                <span>Error {"->"} app/no-options</span>
              </div>
            );
          }, 500);
        }
      }
    } else {
      setTimeout(() => {
        setMailCheck(
          <div className="mail_check">
            <span>Please fill in required fields.</span>
          </div>
        );
      }, 500);
    }
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((userCredential) => {
        const user = userCredential.user;

        setMailCheck(
          <div className="mail_check">
            <span>Welcome back, {user.displayName}! &nbsp;</span> <FontAwesomeIcon icon={faCheck} id="check_icon" />
          </div>
        );
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          setSocialLoginCheck("E-mail address already existing.");
        } else if (error.code === "app/no-options") {
          setSocialLoginCheck("Error -> app/no-options.");
        } else {
          setSocialLoginCheck("");
        }
      });
  };

  const handleFacebookSignIn = () => {
    facebookSignIn()
      .then((userCredential) => {
        const user = userCredential.user;

        setMailCheck(
          <div className="mail_check">
            <span>Welcome back, {user.displayName}! &nbsp;</span> <FontAwesomeIcon icon={faCheck} id="check_icon" />
          </div>
        );
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          setSocialLoginCheck("E-mail address already existing.");
        } else if (error.code === "app/no-options") {
          setSocialLoginCheck("Error -> app/no-options.");
        } else {
          setSocialLoginCheck("");
        }
      });
  };

  const handleForgotPassword = async () => {
    setMailCheck(
      <div className="mail_check">
        <Bars height="30" width="30" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
      </div>
    );

    if (mail) {
      try {
        await forgotPassword(mail);

        setIsForgotPass(true);
        setTimeout(() => {
          setMailCheck(
            <div className="mail_check">
              <span>We've sent a reset link on your e-mail.</span>
            </div>
          );
        }, 500);
      } catch (error) {
        if (error.code === "auth/missing-email" || error.code === "auth/invalid-email" || error.code === "auth/user-not-found") {
          setTimeout(() => {
            setMailCheck(
              <div className="mail_check">
                <span>This is not an existing e-mail.</span>
              </div>
            );
          }, 500);
        }
      }
    } else if (mail === "") {
      setTimeout(() => {
        setMailCheck(
          <div className="mail_check">
            <span>Please fill in your e-mail.</span>
          </div>
        );
      }, 500);
    }
  };

  const handleSignOut = async () => {
    signOutUser();

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
    }, 500);
  };

  const handleDoNotSignOut = async () => {
    setMailCheck(
      <div className="mail_check">
        <span>Smart choice not to sign out!</span> <FontAwesomeIcon icon={faThumbsUp} id="check_icon" />
      </div>
    );
  };

  const handleVisiblePass = () => {
    setVisibilePass((prevState) => !prevState);
  };

  const handleOpenSignInModal = () => {
    setShowModal(true);
    setIsOpen(false);
    setLogOption(1);
    setMailCheck("");
    setModalIsOpen(true);
  };
  const handleOpenSignUpModal = () => {
    setShowModal(true);
    setIsOpen(false);
    setLogOption(2);
    setMailCheck("");
    setSocialLoginCheck("");
    setModalIsOpen(true);
  };

  const handleOpenSignOutModal = () => {
    setShowModal(true);
    setIsOpen(false);
    setLogOption(3);
    setMailCheck("");
    setModalIsOpen(true);
  };

  const handleOpenForgotPassModal = async () => {
    setShowModal(true);
    setIsOpen(false);
    setLogOption(4);
    setMailCheck("");
    setModalIsOpen(true);
  };

  const handleMenuStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  return (
    <div>
      <div className="menu_tab">
        <span className="chosen_tab">{tab}</span>
      </div>
      <div className="login_modal_content" style={{ display: showModal ? "flex" : "none" }}>
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
              <button onClick={handleGoogleSignIn} disabled={loggedUser}>
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
              <button onClick={handleFacebookSignIn} disabled={loggedUser}>
                <FontAwesomeIcon icon={faFacebook} />
                Sign in with Facebook
              </button>
            </div>
            <div className="social_login_checking">
              <span>{socialLoginCheck}</span>
            </div>
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
            <button onClick={handlePasswordSignIn} disabled={loggedUser} id="sign_in_button">
              Sign In
            </button>
            <button onClick={handleOpenForgotPassModal} disabled={loggedUser} id="forgot_pass_button">
              Forgot password?
            </button>
            <div id="sign_up">
              <span>- Don't have an account? </span>
              <span
                onClick={loggedUser ? () => {} : handleOpenSignUpModal}
                id="sign_up_button"
                style={{ cursor: loggedUser ? "auto" : "pointer" }}
              >
                Sign up.
              </span>
            </div>
          </>
        ) : logOption === 2 ? (
          <>
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
            <button onClick={visibileCodeCheck ? handleSignUpCreate : handleSignUpChecking} disabled={loggedUser} id="sign_in_button">
              Create Account
            </button>
            <div id="sign_up">
              <span>- Back to </span>
              <span
                onClick={handleOpenSignInModal}
                disabled={loggedUser}
                style={{ pointerEvents: wrongMailCode ? "none" : "auto" }}
                id="sign_up_button"
              >
                sign in.
              </span>
            </div>
          </>
        ) : logOption === 3 ? (
          <>
            <div id="log_option">
              <span>Sign Out.</span>
            </div>
            <span style={{ marginTop: 20, marginBottom: 20 }}>Are you sure you want to sign out?</span>
            <div id="signOut_confirm">
              <button onClick={handleSignOut} disabled={!loggedUser}>
                Yes
              </button>
              <button onClick={handleDoNotSignOut} disabled={!loggedUser}>
                No
              </button>
            </div>
            {mailCheck}
          </>
        ) : logOption === 4 ? (
          <>
            <div id="log_option">
              <span>Reset your password.</span>
            </div>
            <span style={{ marginTop: 20, marginBottom: 10, fontSize: 16 }}>Please type your e-mail address.</span>
            <div id="new_pass">
              <input type="text" onChange={handleMailChange} />
            </div>
            {mailCheck}
            <div id="new_pass" style={{ marginTop: 20 }}>
              <button onClick={handleForgotPassword} disabled={isForgotPass}>
                Next
              </button>
            </div>
            <div id="sign_up">
              <span>- Back to </span>
              <span
                onClick={handleOpenSignInModal}
                disabled={loggedUser}
                style={{ pointerEvents: wrongMailCode ? "none" : "auto" }}
                id="sign_up_button"
              >
                sign in.
              </span>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <Menu className={"my-custom-menu"} animation={"stack"} isOpen={isOpen} onStateChange={handleMenuStateChange}>
        <div className="menu_img" style={{ display: "flex" }}>
          <img src="/logo.png" alt="logo.png" className="img_navbar" />
        </div>
        <div id="auth_options" style={{ display: "flex" }}>
          <button onClick={handleOpenSignInModal} disabled={loggedUser}>
            Sign In
          </button>
          <button onClick={handleOpenSignOutModal} disabled={!loggedUser}>
            Sign Out
          </button>
        </div>
        <Link
          to="/my-account"
          onClick={() => {
            setIsOpen(false);
          }}
          style={{ display: loggedUser ? "flex" : "none" }}
        >
          <FontAwesomeIcon icon={faUserAlt} /> <span style={{ marginLeft: 10 }}>My Account</span>
        </Link>
        <Link
          to="/"
          onClick={() => {
            setIsOpen(false);
          }}
          style={{ display: "flex" }}
        >
          <FontAwesomeIcon icon={faHome} /> <span style={{ marginLeft: 10 }}>Home</span>
        </Link>
        <Link
          to="/calculator"
          onClick={() => {
            setIsOpen(false);
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
          }}
          style={{ display: "flex" }}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          <span style={{ marginLeft: 10 }}>Cart</span>
          <span className="no_of_products_in_cart">{loggedUser ? userCartProducts : readCart().length > 0 ? readCart().length : 0}</span>
        </Link>
        <Link
          to="/contact"
          onClick={() => {
            setIsOpen(false);
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
