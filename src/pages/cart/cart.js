import "./cart.css";
import { auth } from "../../firebase";
import { Table } from "react-bootstrap";
import lookup from "country-code-lookup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faTruck, faLock, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState, useContext } from "react";
import { getCities, getPoints, getDistance } from "../../services/shipping";
import { clearCart, deleteFromCart, readCart } from "../../services/storageCart";
import readUserData from "../../services/readUserData";
import deleteAllUserProducts from "../../services/deleteAllUserProducts";
import deleteSpecificUserProducts from "../../services/deleteSpecificUserProducts";
import { Bars } from "react-loader-spinner";
import ReactModal from "react-modal";
import Payment from "../../services/payment";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../App";

const Cart = () => {
  const shippingCostRef = useRef();

  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentLoading, setPaymentIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [citiesList, setCitiesList] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientHome, setClientHome] = useState("");
  const [addressSaveCheck, setAddressSaveCheck] = useState("");
  const [cityPoints, setCityPoints] = useState([]);
  const [shipping, setShipping] = useState("-");
  const [arrival, setArrival] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [userProductRemoved, setUserProductRemoved] = useState(false);
  const [showClearCartConfirmation, setShowClearCartConfirmation] = useState(false);

  const { modalIsOpen, setDisplayCartProducts } = useContext(MyContext);

  const loggedUser = auth.currentUser || "";

  useEffect(() => {
    const orderWeight = cartItems.length > 0 ? cartItems.reduce((prev, item) => prev + parseFloat(item.weight), 0).toFixed(2) : 0;
    const orderCost =
      cartItems.length > 0 ? (cartItems.reduce((prev, item) => prev + parseFloat(item.price), 0) + parseFloat(shipping)).toFixed(2) : 0;

    sessionStorage.setItem("orderWeight", orderWeight);
    sessionStorage.setItem("orderCost", orderCost);
  }, [cartItems, shipping]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  useEffect(() => {
    if (loggedUser) {
      readUserData(loggedUser.uid)
        .then((data) => {
          localStorage.setItem("display_cart_user", data && data.productsInCart ? data.productsInCart.length : 0);
          setDisplayCartProducts(localStorage.getItem("display_cart_user"));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setDisplayCartProducts(localStorage.getItem("display_cart_guest"));
    }
  }, [loggedUser, setDisplayCartProducts, cartItems]);

  useEffect(() => {
    if (loggedUser) {
      readUserData(loggedUser.uid)
        .then((data) => {
          setClientCountry(
            data?.info?.billingAddress
              .split(",")
              .map((item) => item.trim())
              .reverse()[0]
          );
          setClientCity(
            data?.info?.billingAddress
              .split(",")
              .map((item) => item.trim())
              .reverse()[1]
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setClientCountry("");
    }
  }, [loggedUser]);

  useEffect(() => {
    if (loggedUser) {
      readUserData(loggedUser.uid)
        .then((data) => {
          setCartItems(data && data.productsInCart ? data.productsInCart : []);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setCartItems(readCart());
    }

    setUserProductRemoved(false);
  }, [showModal, loggedUser, userProductRemoved]);

  useEffect(() => {
    getCities(lookup.byCountry(clientCountry)?.iso2).then((result) =>
      setCitiesList(result.sort((a, b) => a.name.localeCompare(b.name)).map((city) => city.name))
    );

    if (clientCity) {
      getPoints(clientCity).then((result) => {
        setCityPoints([result[0].lon, result[0].lat]);
      });
    }
  }, [clientCountry, clientCity]);

  const pricePerKm = 0.1; //in USD
  const estimatedSpeed = 80; // in KM/hour
  const logisticsTime = 48; // in hours

  useEffect(() => {
    if (clientCountry === "" || clientCity === "") {
      setShipping("-");
      setArrival("See shipping");
    } else if (cityPoints.length > 0) {
      getDistance(cityPoints).then((result) => {
        result.routes
          ? setShipping(((result.routes[0].distance / 1000) * pricePerKm).toFixed(2) + " $")
          : setShipping("Sorry. We don't go there.");

        const geoDistanceInHours = (result.routes[0].distance / 1000 / estimatedSpeed).toFixed(0);

        result.routes
          ? setArrival(
              new Date(new Date().getTime() + (parseInt(geoDistanceInHours) + logisticsTime) * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]
                .replaceAll("-", "/")
                .split("/")
                .reverse()
                .join("/")
            )
          : setArrival("See shipping");
      });
    }
  }, [clientCountry, clientCity, cityPoints]);

  const handleCountryChange = (e) => {
    setClientCountry(e.target.value);
  };

  const handleCityChange = (e) => {
    setClientCity(e.target.value);
  };

  const handleHomeChange = (e) => {
    setClientHome(e.target.value);
  };

  const handleDeleteItem = (index) => {
    if (loggedUser) {
      deleteSpecificUserProducts(index);
      setUserProductRemoved(true);
    } else {
      deleteFromCart(index);
      setCartItems(readCart());
    }
  };

  const handleClearCart = () => {
    setShowClearCartConfirmation(false);

    if (loggedUser) {
      deleteAllUserProducts();
      setCartItems([]);
    } else {
      clearCart();
      setCartItems(readCart());
    }
  };

  const handleShipping = () => {
    setShowAddressModal(true);
  };

  const handleCheckOut = () => {
    setShowModal(true);
    setPaymentIsLoading(true);
    setTimeout(() => {
      setPaymentIsLoading(false);
    }, 1500);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  const handleSaveAddress = () => {
    if (clientCountry === "" || clientCity === "" || clientHome === "") {
      setAddressSaveCheck("Please fill in required fields.");
    } else {
      setAddressSaveCheck(<FontAwesomeIcon icon={faCheck} id="check_icon" />);
    }
  };

  const handleCloseAddressModal = () => {
    setShowAddressModal(false);
    setAddressSaveCheck("");
  };

  return (
    <>
      <ReactModal isOpen={showModal} className="pay_modal" ariaHideApp={false}>
        <div className="payment_loading" style={{ display: isPaymentLoading ? "flex" : "none" }}>
          <Bars color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        </div>
        <div className="pay_modal_container">
          <div className="pay_modal_content" style={{ display: isPaymentLoading ? "none" : "flex" }}>
            <span>
              <i onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faTimes} />
              </i>
            </span>
            <div id="payment_details">
              <span>Total Order: </span>
              <span>{(cartItems.reduce((prev, item) => prev + parseFloat(item.price), 0) + parseFloat(shipping)).toFixed(2)} $</span>
            </div>
            <Payment amount={(cartItems.reduce((prev, item) => prev + parseFloat(item.price), 0) + parseFloat(shipping)).toFixed(2)} />
          </div>
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
              <select value={clientCountry} className="billing_address_country" onChange={handleCountryChange}>
                <option value="Your Country..." style={{ background: "#47574b", color: "white" }}>
                  Your Country...
                </option>
                {lookup.countries
                  .sort((a, b) => a.country.localeCompare(b.country))
                  .map((item, index) => (
                    <option key={index + 1}>{item.country}</option>
                  ))}
              </select>
              <select value={clientCity} className="billing_address_city" onChange={handleCityChange}>
                <option value="Your City..." style={{ background: "#47574b", color: "white" }}>
                  Your City...
                </option>
                {citiesList && citiesList.map((city, index) => <option key={index + 1}>{city}</option>)}
              </select>
              <input value={clientHome} id="billing_address_home" placeholder="Your address..." onChange={handleHomeChange} />
            </div>
            <input id="save_billing_address" defaultValue={"Save"} readOnly onClick={handleSaveAddress} />
            <span id="address_save_check">{addressSaveCheck}</span>
          </div>
        </div>
      </ReactModal>
      <div className="cart_loading" style={{ display: isLoading ? "flex" : "none" }}>
        <Bars color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
      </div>
      <div className="cart_container" style={{ display: isLoading || modalIsOpen || showAddressModal ? "none" : "flex" }}>
        <div className="cart_content">
          <div className="cart_head_plus_items">
            <Table className="cart_table_head">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Size (mm)</th>
                  <th>Length (m)</th>
                  <th>Qty (pcs)</th>
                  <th>Weight</th>
                  <th>Price</th>
                </tr>
              </thead>
            </Table>
            <div className="cart_items">
              <Table bordered variant="dark" className="cart_table">
                <tbody>
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {index + 1}.
                            <abbr title="Delete Item">
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                onClick={() => handleDeleteItem(index)}
                                style={{ marginLeft: 10, cursor: "pointer" }}
                              />
                            </abbr>
                          </td>
                          <td>{item.description}</td>
                          <td>{item.size}</td>
                          <td>{item.length}</td>
                          <td>{item.quantity}</td>
                          <td>{item.weight} kg</td>
                          <td>{item.price} $</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="empty_cart" contains="Empty">
                        Your cart is empty.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="table_totals">
            <div className="clear_all_items">
              {showClearCartConfirmation ? (
                <>
                  <span>Are you sure?</span>{" "}
                  <button onClick={handleClearCart} style={{ width: 60, marginRight: 20 }}>
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setShowClearCartConfirmation(false);
                    }}
                    style={{ width: 60 }}
                  >
                    No
                  </button>
                </>
              ) : (
                <button
                  disabled={cartItems.length <= 0}
                  onClick={() => {
                    setShowClearCartConfirmation(true);
                  }}
                >
                  Clear Cart
                </button>
              )}
            </div>
            <div className="order_totals">
              <Table bordered variant="dark" className="cart_table2">
                <thead>
                  <tr>
                    <th>Total Weight</th>
                    {cartItems.length > 0 ? (
                      <th key="1">{cartItems.reduce((prev, item) => prev + parseFloat(item.weight), 0).toFixed(2)} kg</th>
                    ) : (
                      <th>-</th>
                    )}
                  </tr>
                </thead>
              </Table>
              <Table bordered variant="dark" className="cart_table2A">
                <thead>
                  <tr>
                    <th>Subtotal Cost</th>
                    {cartItems.length > 0 ? (
                      <th key="2">{cartItems.reduce((prev, item) => prev + parseFloat(item.price), 0).toFixed(2)} $</th>
                    ) : (
                      <th>-</th>
                    )}
                  </tr>
                </thead>
              </Table>
              <Table bordered variant="dark" className="cart_table3">
                <thead>
                  <tr>
                    <th onClick={handleShipping} style={{ cursor: "pointer", pointerEvents: loggedUser ? "none" : "auto" }}>
                      Shipping <FontAwesomeIcon icon={faTruck} style={{ marginLeft: 10 }} />
                    </th>
                    <td ref={shippingCostRef}>{cartItems.length > 0 ? shipping : "-"}</td>
                  </tr>
                </thead>
              </Table>
              <Table bordered variant="dark" className="cart_table4">
                <thead>
                  <tr>
                    <th>E.T.A.</th>
                    <th>{cartItems.length > 0 ? arrival : "See shipping"}</th>
                  </tr>
                </thead>
              </Table>
              <Table bordered variant="dark" className="cart_table5">
                <thead>
                  <tr>
                    <th>Total Order</th>
                    <th key="3">
                      {shipping === "Sorry. We don't go there." || shipping === "-" || cartItems.length <= 0
                        ? "See shipping"
                        : `${(cartItems.reduce((prev, item) => prev + parseFloat(item.price), 0) + parseFloat(shipping)).toFixed(2)} $`}
                    </th>
                  </tr>
                </thead>
              </Table>
            </div>
          </div>
          <div className="check_out">
            <span>
              <img src="/cards.png" alt="cards" />
            </span>
            <button
              className="payment_button"
              disabled={shipping === "Sorry. We don't go there." || shipping === "-" || cartItems.length <= 0}
              onClick={handleCheckOut}
            >
              Check Out
              <FontAwesomeIcon
                icon={faLock}
                style={{
                  cursor: shipping === "Sorry. We don't go there." || shipping === "-" || cartItems.length <= 0 ? "auto" : "pointer",
                  paddingLeft: 5,
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
