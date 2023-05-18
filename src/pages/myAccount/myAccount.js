import "bootstrap/dist/css/bootstrap.min.css";
import "./myAccount.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faThumbsUp, faTimes, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import deleteUserAccount from "../../services/deleteAccount";
import saveUserData from "../../services/saveUserData";
import readUserData from "../../services/readUserData";
import ReactModal from "react-modal";
import { Bars, InfinitySpin } from "react-loader-spinner";
import lookup from "country-code-lookup";
import { getCities } from "../../services/shipping";

const MyAccount = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [mailCheck, setMailCheck] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [citiesList, setCitiesList] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientHome, setClientHome] = useState("");
  const [addressSaveCheck, setAddressSaveCheck] = useState("");

  const refInputPhone = useRef(null);
  const refSavePhone = useRef(null);

  const userData = JSON.parse(localStorage.getItem("userSignedIn")) || "";

  const userExtraData = {
    phoneNumber: phoneNumber || "",
    billingAddress: billingAddress || "",
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userSignedIn"))
      readUserData(userData.userID)
        .then((data) => {
          setPhoneNumber(data?.phoneNumber);

          setBillingAddress(data?.billingAddress || "---");
        })
        .catch((err) => {
          console.log(err);
        });
  }, [userData.userID]);

  useEffect(() => {
    getCities(lookup.byCountry(clientCountry)?.iso2).then((result) =>
      setCitiesList(result.sort((a, b) => a.name.localeCompare(b.name)).map((city) => city.name))
    );
  }, [clientCountry]);

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

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEditPhoneNumber = () => {
    refInputPhone.current.style.pointerEvents = "auto";
    refInputPhone.current.style.border = "1px solid white";
    refInputPhone.current.style.borderRadius = "5px";
    refSavePhone.current.style.display = "block";
  };

  const handleSavePhoneNumber = () => {
    if (localStorage.getItem("userSignedIn")) saveUserData(userData.userID, userExtraData);

    refInputPhone.current.style.pointerEvents = "none";
    refInputPhone.current.style.border = "none";
    refInputPhone.current.style.borderRadius = "5px";
    refSavePhone.current.style.display = "none";
  };

  const handleEditAddress = () => {
    setShowAddressModal(true);
    setClientCity("");
    setClientCountry("");
    setClientHome(
      userExtraData.billingAddress
        ? billingAddress
            .split(",")
            .map((item) => item.trim())
            .reverse()
            .slice(2)
            .join(",")
            .split(",")
            .reverse()
            .join(", ")
        : ""
    );
  };

  const handleCloseAddressModal = () => {
    setShowAddressModal(false);
    setAddressSaveCheck("");
    saveUserData(userData.userID, userExtraData);
  };

  const handleCountryChange = (e) => {
    setClientCountry(e.target.value);
  };

  const handleCityChange = (e) => {
    setClientCity(e.target.value);
  };

  const handleHomeChange = (e) => {
    setClientHome(e.target.value);
  };

  const handleSaveAddress = () => {
    if (clientCountry === "" || clientCity === "" || clientHome === "") {
      setAddressSaveCheck("Please fill in required fields.");
    } else {
      setBillingAddress(`${clientHome}, ${clientCity}, ${clientCountry}`);
      setAddressSaveCheck(<FontAwesomeIcon icon={faCheck} id="check_icon" />);
    }
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
      <ReactModal isOpen={showAddressModal} onRequestClose={handleCloseAddressModal} className="address_modal" ariaHideApp={false}>
        <div className="address_modal_content">
          <span>
            <i onClick={handleCloseAddressModal}>
              <FontAwesomeIcon icon={faTimes} />
            </i>
          </span>
          <div id="address_title">
            <span>Set your billing address.</span>
          </div>
          <div className="address_content">
            <div className="billing_address_info">
              <select className="billing_address_country" onChange={handleCountryChange}>
                <option value="Your Country..." style={{ background: "#47574b", color: "white" }}>
                  Your Country...
                </option>
                {lookup.countries
                  .sort((a, b) => a.country.localeCompare(b.country))
                  .map((item, index) => (
                    <option key={index + 1}>{item.country}</option>
                  ))}
              </select>
              <select className="billing_address_city" onChange={handleCityChange}>
                <option value="Your City..." style={{ background: "#47574b", color: "white" }}>
                  Your City...
                </option>
                {citiesList && citiesList.map((city, index) => <option key={index + 1}>{city}</option>)}
              </select>
              <input
                id="billing_address_home"
                defaultValue={
                  userExtraData.billingAddress &&
                  userExtraData.billingAddress
                    .split(",")
                    .map((item) => item.trim())
                    .reverse()
                    .slice(2)
                    .join(",")
                    .split(",")
                    .reverse()
                    .join(", ")
                }
                placeholder="Your address..."
                onChange={handleHomeChange}
              />
            </div>
            <input id="save_billing_address" defaultValue={"Save"} readOnly onClick={handleSaveAddress} />
            <span id="address_save_check">{addressSaveCheck}</span>
          </div>
        </div>
      </ReactModal>
      <div className="page_loading" style={{ display: isLoading ? "flex" : "none" }}>
        <InfinitySpin width="200" color="#4fa94d" />{" "}
      </div>
      <div className="account_container" style={{ display: isLoading ? "none" : "flex" }}>
        <div className="account_content">
          <div className="user_details">
            <div className="user_name">
              <span>Welcome back, {userData.name || "---"}!</span>
              <span>You can manage your profile and orders from here.</span>
            </div>
          </div>
          <div className="user_info">
            <div className="account_info">
              <div className="account_info_title">
                <span>Account Details</span>
              </div>
              <div className="account_info_content">
                <div className="account_info_props">
                  <span style={{ color: "cyan" }}>E-mail:</span>
                  <span>{userData.mail || "---"}</span>
                </div>
                <div className="account_info_props">
                  <span style={{ color: "cyan" }}>Created:</span>
                  <span>
                    {userData.dateCreated ? `${userData.dateCreated.slice(5, -13)},${userData.dateCreated.slice(16, -7)} GMT` : "---"}
                  </span>
                </div>
                <div className="account_info_props">
                  <span style={{ color: "cyan" }}>Phone Number:</span>
                  <div className="account_info_props_phone">
                    {userData.userID ? (
                      <input
                        ref={refInputPhone}
                        type="text"
                        placeholder="Your number..."
                        value={phoneNumber}
                        className="user_phone"
                        style={{ pointerEvents: "none" }}
                        onChange={handlePhoneNumber}
                      />
                    ) : (
                      "---"
                    )}
                    <FontAwesomeIcon icon={faPencil} onClick={handleEditPhoneNumber} id="edit_phone" />
                    <input
                      ref={refSavePhone}
                      id="save_phone"
                      onClick={handleSavePhoneNumber}
                      style={{ display: "none" }}
                      defaultValue={"Save"}
                    />
                  </div>
                </div>
                <div className="account_info_props">
                  <span style={{ color: "cyan" }}>Address:</span>
                  <div className="account_info_props_address">
                    {userData.userID ? <span className="user_address">{billingAddress}</span> : "---"}
                    <FontAwesomeIcon icon={faPencil} onClick={handleEditAddress} id="edit_address" />
                  </div>
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
