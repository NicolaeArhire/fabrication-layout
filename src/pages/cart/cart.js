import "./cart.css";
import { Table } from "react-bootstrap";
import lookup from "country-code-lookup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faTruck, faLock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { getCities, getPoints, getDistance } from "../../services/shipping";
import { clearCart, deleteFromCart, readCart } from "../../services/storageCart";
import readUserData from "../../services/readUserData";
import { Bars } from "react-loader-spinner";

const Cart = () => {
  const shippingRef = useRef();
  const shippingCostRef = useRef();

  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState(readCart());
  const [citiesList, setCitiesList] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [cityPoints, setCityPoints] = useState([]);
  const [shipping, setShipping] = useState("-");
  const [arrival, setArrival] = useState("");

  const userData = JSON.parse(localStorage.getItem("userSignedIn")) || "";

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  useEffect(() => {
    if (userData) {
      readUserData(userData.userID)
        .then((data) => {
          setClientCountry(
            data?.billingAddress
              .split(",")
              .map((item) => item.trim())
              .reverse()[0]
          );
          setClientCity(
            data?.billingAddress
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
      setClientCountry("");
    }
  }, [userData, userData.userID]);

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

  useEffect(() => {
    if (clientCountry === "" || clientCity === "") {
      setShipping("-");
      setArrival("See shipping");
    } else if (cityPoints.length > 0) {
      getDistance(cityPoints).then((result) => {
        result.routes
          ? setShipping(((result.routes[0].distance / 1000) * 0.1).toFixed(2) + " $")
          : setShipping("Sorry. We don't go there.");

        result.routes ? setArrival((result.routes[0].distance / 1000 / 80).toFixed(0) + " hours") : setArrival("See shipping");
      });
    }
  }, [clientCountry, clientCity, cityPoints]);

  const handleCountryChange = (e) => {
    setClientCountry(e.target.value);
  };

  const handleCityChange = (e) => {
    setClientCity(e.target.value);
  };

  const handleDeleteItem = (index) => {
    deleteFromCart(index);
    setCartItems(readCart());
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems(readCart());
  };

  const handleShipping = () => {
    shippingRef.current.style.display = "flex";
  };

  const handleCheckOut = () => {
    window.alert("Relax, we'll not take your money. For now.");
  };

  const handleDoneShipping = () => {
    shippingRef.current.style.display = "none";
  };

  return (
    <>
      <div className="cart_loading" style={{ display: isLoading ? "flex" : "none" }}>
        <Bars color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
      </div>
      <div className="cart_container" style={{ display: isLoading ? "none" : "flex" }}>
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
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              onClick={() => handleDeleteItem(index)}
                              style={{ marginLeft: 10, cursor: "pointer" }}
                            />
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
              <button disabled={cartItems.length <= 0} onClick={handleClearCart}>
                Clear Cart
              </button>
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
                    <th
                      onClick={handleShipping}
                      style={{ cursor: "pointer", pointerEvents: localStorage.getItem("userSignedIn") ? "none" : "auto" }}
                    >
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
            <button className="payment_button" onClick={handleCheckOut}>
              Check Out <FontAwesomeIcon icon={faLock} style={{ cursor: "pointer" }} />
            </button>
          </div>
          <div className="shipping_info" ref={shippingRef}>
            <div className="address_info">
              <select className="address_country" onChange={handleCountryChange}>
                <option value="Your Country..." style={{ background: "#47574b", color: "white" }}>
                  Your Country...
                </option>
                {lookup.countries
                  .sort((a, b) => a.country.localeCompare(b.country))
                  .map((item, index) => (
                    <option key={index + 1}>{item.country}</option>
                  ))}
              </select>
              <select className="address_city" onChange={handleCityChange}>
                <option value="Your City..." style={{ background: "#47574b", color: "white" }}>
                  Your City...
                </option>
                {citiesList && citiesList.map((city, index) => <option key={index + 1}>{city}</option>)}
              </select>
            </div>
            <button className="shipping_done" onClick={handleDoneShipping}>
              Done
            </button>
          </div>
          <div className="cart_intro"></div>
        </div>
      </div>
    </>
  );
};

export default Cart;
