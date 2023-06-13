import "bootstrap/dist/css/bootstrap.min.css";
import "./myAccount.css";
import { Table } from "react-bootstrap";
import { auth } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faThumbsUp, faTimes, faPencil, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect, useContext } from "react";
import deleteUserAccount from "../../services/deleteAccount";
import saveUserData from "../../services/saveUserData";
import readUserData from "../../services/readUserData";
import deleteUserData from "../../services/deleteUserData";
import storeUserFiles from "../../services/storeUserFiles";
import deleteUserFiles from "../../services/deleteUserFiles";
import readUserFiles from "../../services/readUserFiles";
import ReactModal from "react-modal";
import { Bars } from "react-loader-spinner";
import lookup from "country-code-lookup";
import { getCities } from "../../services/shipping";
import { MyContext } from "../../App";
import generateInvoice from "../../services/generateInvoice";

const MyAccount = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [mailCheck, setMailCheck] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [orders, setOrders] = useState([]);
  const [citiesList, setCitiesList] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientHome, setClientHome] = useState("");
  const [addressSaveCheck, setAddressSaveCheck] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  const { modalIsOpen } = useContext(MyContext);

  const refInputPhone = useRef(null);
  const refSavePhone = useRef(null);

  const loggedUserName = auth.currentUser?.displayName || "";
  const loggedUserEmail = auth.currentUser?.email || "";
  const loggedUserCreation = auth.currentUser?.metadata.creationTime || "";
  const loggedUserID = auth.currentUser?.uid || "";

  const userExtraData = {
    phoneNumber: phoneNumber || "",
    billingAddress: billingAddress || "",
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const photoURL = await readUserFiles();
          setUserPhoto(photoURL);
        } catch (error) {
          console.error("Error fetching user photo:", error);
        }
      } else {
        setUserPhoto("");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loggedUserID)
      readUserData(loggedUserID)
        .then((data) => {
          setPhoneNumber(data?.info?.phoneNumber);
          setOrders(Object.keys(data).filter((item) => item.includes("Order")));

          setBillingAddress(data?.info?.billingAddress || "---");
        })
        .catch((err) => {
          console.log(err);
        });
  }, [loggedUserID]);

  useEffect(() => {
    getCities(lookup.byCountry(clientCountry)?.iso2).then((result) =>
      setCitiesList(result.sort((a, b) => a.name.localeCompare(b.name)).map((city) => city.name))
    );
  }, [clientCountry]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleDeleteAccount = async () => {
    await deleteUserData();
    await deleteUserFiles();
    await deleteUserAccount();

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
    if (!loggedUserID) {
      window.location.href = "/";
    }
    setMailCheck("");
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
    if (loggedUserID) saveUserData(loggedUserID, userExtraData);

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
    saveUserData(loggedUserID, userExtraData);
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

  const handleSelectedFile = (e) => {
    const onFileUpload = (downloadURL) => {
      setUserPhoto(downloadURL);
    };

    storeUserFiles(e.target.files[0], onFileUpload);
  };

  const handleInvoice = (index) => {
    const invoiceDate = `${new Date()
      .toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })
      .split("/")
      .reverse()
      .join("/")} ${new Date().toLocaleString("en-US", { timeZone: "Europe/Bucharest", hour12: false }).slice(11, 16)}`;

    generateInvoice(index, invoiceDate);
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
            <button onClick={handleDeleteAccount} disabled={!loggedUserID}>
              Yes
            </button>
            <button onClick={handleDoNotDeleteAccount} disabled={!loggedUserID}>
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
                  userExtraData.billingAddress
                    .split(",")
                    .map((item) => item.trim())
                    .reverse()
                    .slice(2)
                    .join(",")
                    .split(",")
                    .reverse()
                    .join(", ") || ""
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
        <Bars color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
      </div>
      <div className="account_container" style={{ display: isLoading || modalIsOpen ? "none" : "flex" }}>
        <div className="account_content">
          <div className="user_details">
            <div className="user_name">
              <span>Welcome back, {loggedUserName || "---"}!</span>
              <span>You can manage your profile and orders from here.</span>
            </div>
            <div className="user_photo">
              <img src={userPhoto || "/default_photo.png"} alt="user_photo" />
              <div className="photo_upload">
                <abbr title="Choose Photo">
                  <FontAwesomeIcon icon={faPencil} />
                  <input type="file" accept="image/*" onChange={handleSelectedFile} />
                </abbr>
              </div>
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
                  <span>{loggedUserEmail || "---"}</span>
                </div>
                <div className="account_info_props">
                  <span style={{ color: "cyan" }}>Created:</span>
                  <span>{loggedUserCreation ? `${loggedUserCreation.slice(5, -13)},${loggedUserCreation.slice(16, -7)} GMT` : "---"}</span>
                </div>
                <div className="account_info_props">
                  <span style={{ color: "cyan" }}>Phone Number:</span>
                  <div className="account_info_props_phone">
                    {loggedUserID ? (
                      <input
                        ref={refInputPhone}
                        type="text"
                        placeholder="---"
                        name="phone-input"
                        value={phoneNumber || ""}
                        className="user_phone"
                        style={{ pointerEvents: "none" }}
                        onChange={handlePhoneNumber}
                      />
                    ) : (
                      "---"
                    )}
                    <abbr title="Edit Phone">
                      <FontAwesomeIcon icon={faPencil} onClick={handleEditPhoneNumber} id="edit_phone" />
                    </abbr>
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
                    {loggedUserID ? <span className="user_address">{billingAddress}</span> : "---"}
                    <abbr title="Edit Address">
                      <FontAwesomeIcon icon={faPencil} onClick={handleEditAddress} id="edit_address" />
                    </abbr>
                  </div>
                </div>
                <div className="delete_account">
                  <button onClick={handleOpenModal} disabled={!loggedUserID}>
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
                <Table className="orders_head">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Weight</th>
                      <th>Cost</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                </Table>
                <div className="orders_body">
                  <Table bordered variant="dark">
                    <tbody>
                      {orders.length > 0 ? (
                        orders.map((item, index) => (
                          <tr key={item} className="orders_main">
                            <td>
                              {index + 1}
                              <abbr title="Download Invoice">
                                <FontAwesomeIcon icon={faDownload} onClick={() => handleInvoice(index)} />
                              </abbr>
                            </td>
                            {item.split("_").map((element, elementIndex) => {
                              if (elementIndex === 0) {
                                return (
                                  <td key={element} style={{ display: "none" }}>
                                    {element}
                                  </td>
                                );
                              } else if (elementIndex === 1) {
                                return <td key={element}>{element.replaceAll("~", "-")}</td>;
                              } else if (elementIndex === 2) {
                                return <td key={element}>{element}</td>;
                              } else if (elementIndex === 3) {
                                return <td key={element}>{Number(element) / 100} kg</td>;
                              } else if (elementIndex === 4) {
                                return (
                                  <td key={element} style={{ display: "none" }}>
                                    {element}
                                  </td>
                                );
                              } else if (elementIndex === 5) {
                                return <td key={element}>{Number(element) / 100} $</td>;
                              } else {
                                return null;
                              }
                            })}
                            <td>Delivered</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="no_previous_order" contains="Empty">
                            No previous orders.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
