import "bootstrap/dist/css/bootstrap.min.css";
import "./myAccount.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faThumbsUp, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import deleteUserAccount from "../../services/deleteAccount";
import ReactModal from "react-modal";
import { Bars } from "react-loader-spinner";

const MyAccount = () => {
  const [showModal, setShowModal] = useState(false);
  const [mailCheck, setMailCheck] = useState("");

  const userData = JSON.parse(localStorage.getItem("userSignedIn")) || "";

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleDeleteAccount = async () => {
    localStorage.removeItem("userSignedIn");
    deleteUserAccount();

    setMailCheck(
      <div className="mail_check">
        <Bars height="30" width="30" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
      </div>
    );

    setTimeout(() => {
      setMailCheck(
        <div className="mail_check">
          <span>Account successfully deleted!</span> <FontAwesomeIcon icon={faCheck} id="check_icon" />
        </div>
      );
    }, 500);
  };

  const handleDoNotDeleteAccount = async () => {
    setMailCheck(
      <div className="mail_check">
        <span>Smart choice!</span> <FontAwesomeIcon icon={faThumbsUp} id="check_icon" />
      </div>
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <ReactModal isOpen={showModal} onRequestClose={handleCloseModal} className="login_modal" ariaHideApp={false}>
        <div className="login_modal_content">
          <span>
            <i onClick={handleCloseModal}>
              <FontAwesomeIcon icon={faTimes} />
            </i>
          </span>
          <div id="log_option">
            <span>Delete Account.</span>
          </div>
          <span style={{ marginTop: 20, marginBottom: 20 }}>This is a one time action. Are you sure?</span>
          <div id="signOut_confirm">
            <button onClick={handleDeleteAccount}>Yes</button>
            <button onClick={handleDoNotDeleteAccount} disabled={!localStorage.getItem("userSignedIn")}>
              No
            </button>
          </div>
          {mailCheck}
        </div>
      </ReactModal>
      <div className="account_container">
        <div className="account_content">
          <div className="user_details">
            <div className="user_name">
              <span>Welcome back, {userData.name || "---"}!</span>
              <span>You can manage your profile and orders from here.</span>
            </div>
            <div className="user_photo">{userData.photo ? <img src={userData.photo} alt="user_photo" srcSet="" /> : <span></span>}</div>
          </div>
          <div className="user_info">
            <div className="account_info">
              <div className="account_info_title">
                <span>Account Details</span>
              </div>
              <div className="account_info_content">
                <div className="account_info_props">
                  <span>E-mail:</span>
                  <span>{userData.mail || "---"}</span>
                </div>
                <div className="account_info_props">
                  <span>Created:</span>
                  <span>
                    {userData.dateCreated ? `${userData.dateCreated.slice(5, -13)},${userData.dateCreated.slice(16, -7)} GMT` : "---"}
                  </span>
                </div>
                <div className="delete_account">
                  <button onClick={handleOpenModal} disabled={!localStorage.getItem("userSignedIn")}>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
            <div className="account_orders">
              <div className="account_orders_title">
                <span>My Orders</span>
              </div>
              <div className="account_orders_content">
                <span>No previous orders.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
