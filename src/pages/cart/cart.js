import "./cart.css";
import cards from "../../assets/cards.png";
import { Table } from "react-bootstrap";
import lookup from "country-code-lookup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faTruck, faLock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getCities, getPoints, getDistance } from "../../services/api";

const Cart = () => {
  const shippingRef = useRef();
  const shippingCostRef = useRef();

  const [cartItems, setCartItems] = useState([
    "Stainless Steel Rectangular Tubes",
    "Steel Flat Bars",
    "Aluminium Bulbs",
    "Stainless Steel Rectangular Tubes",
    "Steel Flat Bars",
    "Aluminium Bulbs",
  ]);
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(125);
  const [weight, setWeight] = useState(220);
  const [citiesList, setCitiesList] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [cityPoints, setCityPoints] = useState([]);
  const [shipping, setShipping] = useState("-");
  const [arrival, setArrival] = useState("");

  useEffect(() => {
    getCities(lookup.byCountry(clientCountry)?.iso2).then((result) =>
      setCitiesList(result.sort((a, b) => a.name.localeCompare(b.name)).map((city) => city.name))
    );

    getPoints(clientCity).then((result) => {
      setCityPoints([result[0].lon, result[0].lat]);
    });
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

  const handleDeleteItem = () => {
    setCartItems(cartItems.slice(0, -1));
  };

  const handleQtyChange = (e) => {
    setQty(e.target.value);
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
    <div className="cart_container">
      <div className="cart_content">
        <Table bordered variant="dark" className="cart_table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item description</th>
              <th>Size (mm)</th>
              <th>Quantity (pcs)</th>
              <th>Weight</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    {index + 1}.
                    <FontAwesomeIcon icon={faTrashAlt} onClick={handleDeleteItem} style={{ marginLeft: 10, cursor: "pointer" }} />
                  </td>
                  <td>{item}</td>
                  <td>L600xW400xT25</td>
                  <td>
                    <input type="number" min={1} defaultValue={1} className="product_qty" onChange={handleQtyChange} />
                  </td>
                  <td>{weight * qty} kg</td>
                  <td>{price} $</td>
                  <td>{qty * price} $</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty_cart">
                  Your cart is empty.{" "}
                  <Link to="/" style={{ color: "white" }}>
                    Let's do some shopping
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="table_totals">
          <Table bordered variant="dark" className="cart_table2">
            <thead>
              <tr>
                <th>Subtotal</th>
                <th>{qty * price} $</th>
              </tr>
            </thead>
          </Table>
          <Table bordered variant="dark" className="cart_table3">
            <thead>
              <tr>
                <th>
                  Shipping <FontAwesomeIcon icon={faTruck} onClick={handleShipping} style={{ cursor: "pointer" }} />
                </th>
                <td ref={shippingCostRef}>{shipping}</td>
              </tr>
            </thead>
          </Table>
          <Table bordered variant="dark" className="cart_table4">
            <thead>
              <tr>
                <th>E.T.A.</th>
                <th>{arrival}</th>
              </tr>
            </thead>
          </Table>
          <Table bordered variant="dark" className="cart_table5">
            <thead>
              <tr>
                <th>Total Order</th>
                <th>
                  {shipping === "Sorry. We don't go there." || shipping === "-"
                    ? "See shipping"
                    : `${(qty * price + parseFloat(shipping)).toFixed(2)} $`}
                </th>
              </tr>
            </thead>
          </Table>
        </div>
        <div className="check_out">
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
        <div className="cart_intro">
          <span>
            <img src={cards} alt="cards" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
