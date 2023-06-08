import "./eccentricFrustum.css";
import { useEffect, useRef, useState, useContext } from "react";
import { auth } from "../../firebase";
import saveUserProducts from "../../services/saveUserProducts";
import readUserData from "../../services/readUserData";
import makerjs from "makerjs";
import { writeCart } from "../../services/storageCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../App";

const EccentricFrustum = () => {
  const [addToCartAnimation, setAddToCartAnimation] = useState(false);
  const [cartItemsNo, setCartItemsNo] = useState(0);
  const [diam1, setDiam1] = useState("");
  const [diam2, setDiam2] = useState("");
  const [height, setHeight] = useState("");
  const [thickness, setThickness] = useState("");
  const [material, setMaterial] = useState("---");
  const [density, setDensity] = useState("");
  const [price, setPrice] = useState("");
  const [points, setPoints] = useState([
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
    [100, 100],
  ]);

  const [isScaledImg, setIsScaledImg] = useState(false);
  const [isScaled, setIsScaled] = useState(false);

  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const { setDisplayCartProducts } = useContext(MyContext);

  const loggedUserID = auth.currentUser?.uid || "";

  useEffect(() => {
    if (loggedUserID) {
      readUserData(loggedUserID)
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
  }, [loggedUserID, setDisplayCartProducts, cartItemsNo]);

  useEffect(() => {
    function handleClickOutsideImg(event) {
      if (imgRef.current && !imgRef.current.contains(event.target)) {
        setIsScaledImg(false);
      }
    }
    window.addEventListener("click", handleClickOutsideImg);
    return () => {
      window.removeEventListener("click", handleClickOutsideImg);
    };
  }, [imgRef]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (canvasRef.current && !canvasRef.current.contains(event.target)) {
        setIsScaled(false);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [canvasRef]);

  useEffect(() => {
    const L1 = Math.sqrt((diam2 / ((diam2 - diam1) / height)) ** 2 + (diam2 * Math.sin((0 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const L2 = Math.sqrt((diam2 / ((diam2 - diam1) / height)) ** 2 + (diam2 * Math.sin((1 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const L3 = Math.sqrt((diam2 / ((diam2 - diam1) / height)) ** 2 + (diam2 * Math.sin((2 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const L4 = Math.sqrt((diam2 / ((diam2 - diam1) / height)) ** 2 + (diam2 * Math.sin((3 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const L5 = Math.sqrt((diam2 / ((diam2 - diam1) / height)) ** 2 + (diam2 * Math.sin((4 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const L6 = Math.sqrt((diam2 / ((diam2 - diam1) / height)) ** 2 + (diam2 * Math.sin((5 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const L7 = Math.sqrt((diam2 / ((diam2 - diam1) / height)) ** 2 + (diam2 * Math.sin((6 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const L8 = Math.sqrt((diam2 / ((diam2 - diam1) / height)) ** 2 + (diam2 * Math.sin((7 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const L9 = Math.sqrt((diam2 / ((diam2 - diam1) / height)) ** 2 + (diam2 * Math.sin((8 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const L10 = Math.sqrt((diam2 / ((diam2 - diam1) / height)) ** 2 + (diam2 * Math.sin((9 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const L11 = Math.sqrt((diam2 / ((diam2 - diam1) / height)) ** 2 + (diam2 * Math.sin((10 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const L12 = Math.sqrt((diam2 / ((diam2 - diam1) / height)) ** 2 + (diam2 * Math.sin((11 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const L13 = Math.sqrt((diam2 / ((diam2 - diam1) / height)) ** 2 + (diam2 * Math.sin((12 * 15 * (Math.PI / 180)) / 2)) ** 2);

    const S1 = Math.sqrt((diam2 / ((diam2 - diam1) / height) - height) ** 2 + (diam1 * Math.sin((0 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const S2 = Math.sqrt((diam2 / ((diam2 - diam1) / height) - height) ** 2 + (diam1 * Math.sin((1 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const S3 = Math.sqrt((diam2 / ((diam2 - diam1) / height) - height) ** 2 + (diam1 * Math.sin((2 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const S4 = Math.sqrt((diam2 / ((diam2 - diam1) / height) - height) ** 2 + (diam1 * Math.sin((3 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const S5 = Math.sqrt((diam2 / ((diam2 - diam1) / height) - height) ** 2 + (diam1 * Math.sin((4 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const S6 = Math.sqrt((diam2 / ((diam2 - diam1) / height) - height) ** 2 + (diam1 * Math.sin((5 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const S7 = Math.sqrt((diam2 / ((diam2 - diam1) / height) - height) ** 2 + (diam1 * Math.sin((6 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const S8 = Math.sqrt((diam2 / ((diam2 - diam1) / height) - height) ** 2 + (diam1 * Math.sin((7 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const S9 = Math.sqrt((diam2 / ((diam2 - diam1) / height) - height) ** 2 + (diam1 * Math.sin((8 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const S10 = Math.sqrt((diam2 / ((diam2 - diam1) / height) - height) ** 2 + (diam1 * Math.sin((9 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const S11 = Math.sqrt((diam2 / ((diam2 - diam1) / height) - height) ** 2 + (diam1 * Math.sin((10 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const S12 = Math.sqrt((diam2 / ((diam2 - diam1) / height) - height) ** 2 + (diam1 * Math.sin((11 * 15 * (Math.PI / 180)) / 2)) ** 2);
    const S13 = Math.sqrt((diam2 / ((diam2 - diam1) / height) - height) ** 2 + (diam1 * Math.sin((12 * 15 * (Math.PI / 180)) / 2)) ** 2);

    const coneAngle1 = (Math.acos((L1 ** 2 + L2 ** 2 - ((Math.PI * diam2) / 24) ** 2) / (2 * L1 * L2)) * 180) / Math.PI;
    const coneAngle2 = (Math.acos((L2 ** 2 + L3 ** 2 - ((Math.PI * diam2) / 24) ** 2) / (2 * L2 * L3)) * 180) / Math.PI;
    const coneAngle3 = (Math.acos((L3 ** 2 + L4 ** 2 - ((Math.PI * diam2) / 24) ** 2) / (2 * L3 * L4)) * 180) / Math.PI;
    const coneAngle4 = (Math.acos((L4 ** 2 + L5 ** 2 - ((Math.PI * diam2) / 24) ** 2) / (2 * L4 * L5)) * 180) / Math.PI;
    const coneAngle5 = (Math.acos((L5 ** 2 + L6 ** 2 - ((Math.PI * diam2) / 24) ** 2) / (2 * L5 * L6)) * 180) / Math.PI;
    const coneAngle6 = (Math.acos((L6 ** 2 + L7 ** 2 - ((Math.PI * diam2) / 24) ** 2) / (2 * L6 * L7)) * 180) / Math.PI;
    const coneAngle7 = (Math.acos((L7 ** 2 + L8 ** 2 - ((Math.PI * diam2) / 24) ** 2) / (2 * L7 * L8)) * 180) / Math.PI;
    const coneAngle8 = (Math.acos((L8 ** 2 + L9 ** 2 - ((Math.PI * diam2) / 24) ** 2) / (2 * L8 * L9)) * 180) / Math.PI;
    const coneAngle9 = (Math.acos((L9 ** 2 + L10 ** 2 - ((Math.PI * diam2) / 24) ** 2) / (2 * L9 * L10)) * 180) / Math.PI;
    const coneAngle10 = (Math.acos((L10 ** 2 + L11 ** 2 - ((Math.PI * diam2) / 24) ** 2) / (2 * L10 * L11)) * 180) / Math.PI;
    const coneAngle11 = (Math.acos((L11 ** 2 + L12 ** 2 - ((Math.PI * diam2) / 24) ** 2) / (2 * L11 * L12)) * 180) / Math.PI;
    const coneAngle12 = (Math.acos((L12 ** 2 + L13 ** 2 - ((Math.PI * diam2) / 24) ** 2) / (2 * L12 * L13)) * 180) / Math.PI;

    const longLineX1 = L1 * Math.cos((0 * coneAngle1 * Math.PI) / 180);
    const longLineX2 = L2 * Math.cos((coneAngle1 * Math.PI) / 180);
    const longLineX3 = L3 * Math.cos(((coneAngle1 + coneAngle2) * Math.PI) / 180);
    const longLineX4 = L4 * Math.cos(((coneAngle1 + coneAngle2 + coneAngle3) * Math.PI) / 180);
    const longLineX5 = L5 * Math.cos(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4) * Math.PI) / 180);
    const longLineX6 = L6 * Math.cos(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5) * Math.PI) / 180);
    const longLineX7 = L7 * Math.cos(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6) * Math.PI) / 180);
    const longLineX8 =
      L8 * Math.cos(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6 + coneAngle7) * Math.PI) / 180);

    const longLineX9 =
      L9 *
      Math.cos(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6 + coneAngle7 + coneAngle8) * Math.PI) / 180);

    const longLineX10 =
      L10 *
      Math.cos(
        ((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6 + coneAngle7 + coneAngle8 + coneAngle9) * Math.PI) /
          180
      );

    const longLineX11 =
      L11 *
      Math.cos(
        ((coneAngle1 +
          coneAngle2 +
          coneAngle3 +
          coneAngle4 +
          coneAngle5 +
          coneAngle6 +
          coneAngle7 +
          coneAngle8 +
          coneAngle9 +
          coneAngle10) *
          Math.PI) /
          180
      );

    const longLineX12 =
      L12 *
      Math.cos(
        ((coneAngle1 +
          coneAngle2 +
          coneAngle3 +
          coneAngle4 +
          coneAngle5 +
          coneAngle6 +
          coneAngle7 +
          coneAngle8 +
          coneAngle9 +
          coneAngle10 +
          coneAngle11) *
          Math.PI) /
          180
      );

    const longLineX13 =
      L13 *
      Math.cos(
        ((coneAngle1 +
          coneAngle2 +
          coneAngle3 +
          coneAngle4 +
          coneAngle5 +
          coneAngle6 +
          coneAngle7 +
          coneAngle8 +
          coneAngle9 +
          coneAngle10 +
          coneAngle11 +
          coneAngle12) *
          Math.PI) /
          180
      );

    const longLineY1 = L1 * Math.sin((0 * coneAngle1 * Math.PI) / 180);
    const longLineY2 = L2 * Math.sin((coneAngle1 * Math.PI) / 180);
    const longLineY3 = L3 * Math.sin(((coneAngle1 + coneAngle2) * Math.PI) / 180);
    const longLineY4 = L4 * Math.sin(((coneAngle1 + coneAngle2 + coneAngle3) * Math.PI) / 180);
    const longLineY5 = L5 * Math.sin(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4) * Math.PI) / 180);
    const longLineY6 = L6 * Math.sin(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5) * Math.PI) / 180);
    const longLineY7 = L7 * Math.sin(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6) * Math.PI) / 180);
    const longLineY8 =
      L8 * Math.sin(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6 + coneAngle7) * Math.PI) / 180);

    const longLineY9 =
      L9 *
      Math.sin(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6 + coneAngle7 + coneAngle8) * Math.PI) / 180);

    const longLineY10 =
      L10 *
      Math.sin(
        ((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6 + coneAngle7 + coneAngle8 + coneAngle9) * Math.PI) /
          180
      );

    const longLineY11 =
      L11 *
      Math.sin(
        ((coneAngle1 +
          coneAngle2 +
          coneAngle3 +
          coneAngle4 +
          coneAngle5 +
          coneAngle6 +
          coneAngle7 +
          coneAngle8 +
          coneAngle9 +
          coneAngle10) *
          Math.PI) /
          180
      );

    const longLineY12 =
      L12 *
      Math.sin(
        ((coneAngle1 +
          coneAngle2 +
          coneAngle3 +
          coneAngle4 +
          coneAngle5 +
          coneAngle6 +
          coneAngle7 +
          coneAngle8 +
          coneAngle9 +
          coneAngle10 +
          coneAngle11) *
          Math.PI) /
          180
      );

    const longLineY13 =
      L13 *
      Math.sin(
        ((coneAngle1 +
          coneAngle2 +
          coneAngle3 +
          coneAngle4 +
          coneAngle5 +
          coneAngle6 +
          coneAngle7 +
          coneAngle8 +
          coneAngle9 +
          coneAngle10 +
          coneAngle11 +
          coneAngle12) *
          Math.PI) /
          180
      );

    const shortLineX1 = S1 * Math.cos((0 * coneAngle1 * Math.PI) / 180);
    const shortLineX2 = S2 * Math.cos((coneAngle1 * Math.PI) / 180);
    const shortLineX3 = S3 * Math.cos(((coneAngle1 + coneAngle2) * Math.PI) / 180);
    const shortLineX4 = S4 * Math.cos(((coneAngle1 + coneAngle2 + coneAngle3) * Math.PI) / 180);
    const shortLineX5 = S5 * Math.cos(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4) * Math.PI) / 180);
    const shortLineX6 = S6 * Math.cos(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5) * Math.PI) / 180);
    const shortLineX7 = S7 * Math.cos(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6) * Math.PI) / 180);
    const shortLineX8 =
      S8 * Math.cos(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6 + coneAngle7) * Math.PI) / 180);

    const shortLineX9 =
      S9 *
      Math.cos(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6 + coneAngle7 + coneAngle8) * Math.PI) / 180);

    const shortLineX10 =
      S10 *
      Math.cos(
        ((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6 + coneAngle7 + coneAngle8 + coneAngle9) * Math.PI) /
          180
      );

    const shortLineX11 =
      S11 *
      Math.cos(
        ((coneAngle1 +
          coneAngle2 +
          coneAngle3 +
          coneAngle4 +
          coneAngle5 +
          coneAngle6 +
          coneAngle7 +
          coneAngle8 +
          coneAngle9 +
          coneAngle10) *
          Math.PI) /
          180
      );

    const shortLineX12 =
      S12 *
      Math.cos(
        ((coneAngle1 +
          coneAngle2 +
          coneAngle3 +
          coneAngle4 +
          coneAngle5 +
          coneAngle6 +
          coneAngle7 +
          coneAngle8 +
          coneAngle9 +
          coneAngle10 +
          coneAngle11) *
          Math.PI) /
          180
      );

    const shortLineX13 =
      S13 *
      Math.cos(
        ((coneAngle1 +
          coneAngle2 +
          coneAngle3 +
          coneAngle4 +
          coneAngle5 +
          coneAngle6 +
          coneAngle7 +
          coneAngle8 +
          coneAngle9 +
          coneAngle10 +
          coneAngle11 +
          coneAngle12) *
          Math.PI) /
          180
      );

    const shortLineY1 = S1 * Math.sin((0 * coneAngle1 * Math.PI) / 180);
    const shortLineY2 = S2 * Math.sin((coneAngle1 * Math.PI) / 180);
    const shortLineY3 = S3 * Math.sin(((coneAngle1 + coneAngle2) * Math.PI) / 180);
    const shortLineY4 = S4 * Math.sin(((coneAngle1 + coneAngle2 + coneAngle3) * Math.PI) / 180);
    const shortLineY5 = S5 * Math.sin(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4) * Math.PI) / 180);
    const shortLineY6 = S6 * Math.sin(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5) * Math.PI) / 180);
    const shortLineY7 = S7 * Math.sin(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6) * Math.PI) / 180);
    const shortLineY8 =
      S8 * Math.sin(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6 + coneAngle7) * Math.PI) / 180);

    const shortLineY9 =
      S9 *
      Math.sin(((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6 + coneAngle7 + coneAngle8) * Math.PI) / 180);

    const shortLineY10 =
      S10 *
      Math.sin(
        ((coneAngle1 + coneAngle2 + coneAngle3 + coneAngle4 + coneAngle5 + coneAngle6 + coneAngle7 + coneAngle8 + coneAngle9) * Math.PI) /
          180
      );

    const shortLineY11 =
      S11 *
      Math.sin(
        ((coneAngle1 +
          coneAngle2 +
          coneAngle3 +
          coneAngle4 +
          coneAngle5 +
          coneAngle6 +
          coneAngle7 +
          coneAngle8 +
          coneAngle9 +
          coneAngle10) *
          Math.PI) /
          180
      );

    const shortLineY12 =
      S12 *
      Math.sin(
        ((coneAngle1 +
          coneAngle2 +
          coneAngle3 +
          coneAngle4 +
          coneAngle5 +
          coneAngle6 +
          coneAngle7 +
          coneAngle8 +
          coneAngle9 +
          coneAngle10 +
          coneAngle11) *
          Math.PI) /
          180
      );

    const shortLineY13 =
      S13 *
      Math.sin(
        ((coneAngle1 +
          coneAngle2 +
          coneAngle3 +
          coneAngle4 +
          coneAngle5 +
          coneAngle6 +
          coneAngle7 +
          coneAngle8 +
          coneAngle9 +
          coneAngle10 +
          coneAngle11 +
          coneAngle12) *
          Math.PI) /
          180
      );

    const newPoints = [
      [[shortLineX1, 0]],
      [[longLineX1, longLineY1]],
      [[longLineX2, longLineY2]],
      [[longLineX3, longLineY3]],
      [[longLineX4, longLineY4]],
      [[longLineX5, longLineY5]],
      [[longLineX6, longLineY6]],
      [[longLineX7, longLineY7]],
      [[longLineX8, longLineY8]],
      [[longLineX9, longLineY9]],
      [[longLineX10, longLineY10]],
      [[longLineX11, longLineY11]],
      [[longLineX12, longLineY12]],
      [[longLineX13, longLineY13]],
      [[shortLineX13, shortLineY13]],
      [[shortLineX12, shortLineY12]],
      [[shortLineX11, shortLineY11]],
      [[shortLineX10, shortLineY10]],
      [[shortLineX9, shortLineY9]],
      [[shortLineX8, shortLineY8]],
      [[shortLineX7, shortLineY7]],
      [[shortLineX6, shortLineY6]],
      [[shortLineX5, shortLineY5]],
      [[shortLineX4, shortLineY4]],
      [[shortLineX3, shortLineY3]],
      [[shortLineX2, shortLineY2]],
      [[shortLineX1, shortLineY1]],
    ];

    setPoints(newPoints.flatMap((item) => item));
  }, [diam1, diam2, height]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      const model = new makerjs.models.ConnectTheDots(true, points);
      const svg = makerjs.exporter.toSVG(model);
      const img = new Image();
      img.onload = function () {
        const modelExtents = makerjs.measure.modelExtents(model);
        const modelWidth = modelExtents.high[0] - modelExtents.low[0];
        const modelHeight = modelExtents.high[1] - modelExtents.low[1];
        const canvasWidth = modelWidth + 40;
        const canvasHeight = modelHeight + 40;
        canvasRef.current.width = canvasWidth;
        canvasRef.current.height = canvasHeight;
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, centerX - modelWidth / 2, centerY - modelHeight / 2);
      };
      img.src = "data:image/svg+xml;base64," + btoa(svg);
    }
  }, [points]);

  function handleDownload() {
    const model = new makerjs.models.ConnectTheDots(true, points);
    const exporter = makerjs.exporter.toDXF(model);
    const blob = new Blob([exporter], { type: "application/dxf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "eccentricFrustum.dxf";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleDiam1Change(e) {
    setDiam1(e.target.value);
  }

  function handleDiam2Change(e) {
    setDiam2(e.target.value);
  }

  function handleHeightChange(e) {
    setHeight(e.target.value);
  }

  function handleThicknessChange(e) {
    setThickness(e.target.value);
  }

  function handleMaterialChange(e) {
    setMaterial(e.target.value);
    if (e.target.value === "Aluminium") {
      setDensity(2710);
      setPrice(2415);
    } else if (e.target.value === "Wood") {
      setDensity(1000);
      setPrice(400);
    } else if (e.target.value === "Steel") {
      setDensity(7850);
      setPrice(852);
    } else if (e.target.value === "Inox") {
      setDensity(7850);
      setPrice(1200);
    }
  }

  function handleClickImg(event) {
    if (event.target === imgRef.current) {
      setIsScaledImg(!isScaledImg);
    }
  }

  function handleClick(event) {
    if (event.target === canvasRef.current) {
      setIsScaled(!isScaled);
    }
  }

  const handleAddProducts = () => {
    setAddToCartAnimation(true);
    setCartItemsNo((prev) => prev + 1);
    setTimeout(() => {
      setAddToCartAnimation(false);
    }, 1700);

    const tempObj = {
      description: material === "Inox" ? `Stainless Steel Shape_EccentricFrustum` : `${material} Shape_EccentricFrustum`,
      size:
        points
          .reduce((highest, current) => {
            return current[0] > highest ? current[0] : highest;
          }, 0)
          .toFixed(0) -
        points
          .filter((num) => num[0] !== 0)
          .reduce((smallest, current) => {
            return current[0] < smallest ? current[0] : smallest;
          }, Infinity)
          .toFixed(0) +
        "x" +
        points
          .reduce((highest, current) => {
            return current[1] > highest ? current[1] : highest;
          }, 0)
          .toFixed(0) +
        "x" +
        thickness,
      length: "-",
      quantity: 2,
      weight:
        (
          ((0.000001 *
            density *
            thickness *
            (points
              .reduce((highest, current) => {
                return current[0] > highest ? current[0] : highest;
              }, 0)
              .toFixed(0) -
              points
                .filter((num) => num[0] !== 0)
                .reduce((smallest, current) => {
                  return current[0] < smallest ? current[0] : smallest;
                }, Infinity)
                .toFixed(0))) /
            1000) *
          points
            .reduce((highest, current) => {
              return current[1] > highest ? current[1] : highest;
            }, 0)
            .toFixed(0)
        ).toFixed(2) * 2,
      price:
        (
          ((0.000001 *
            density *
            thickness *
            ((points
              .reduce((highest, current) => {
                return current[0] > highest ? current[0] : highest;
              }, 0)
              .toFixed(0) -
              points
                .filter((num) => num[0] !== 0)
                .reduce((smallest, current) => {
                  return current[0] < smallest ? current[0] : smallest;
                }, Infinity)
                .toFixed(0)) /
              1000) *
            points
              .reduce((highest, current) => {
                return current[1] > highest ? current[1] : highest;
              }, 0)
              .toFixed(0)) /
            1000) *
          price
        ).toFixed(2) * 2,
    };

    loggedUserID ? saveUserProducts(loggedUserID, tempObj) : writeCart(tempObj);
  };

  return (
    <div className="home_root">
      <div className="home_container">
        <div className="params">
          <span>ECCENTRIC CONE FRUSTUM</span>
        </div>
        <div className="img_container">
          <img
            src="shapeCalculator/eccentricFrustum.png"
            alt="EccentricFrustum"
            style={{
              width: 270,
              height: 235,
            }}
            className={`img_EccentricFrustum ${isScaledImg ? "scaleImg" : ""}`}
            ref={imgRef}
            onClick={handleClickImg}
          />
        </div>
        <div className="input_output">
          <span>INPUT(mm)</span>
          <span>OUTPUT</span>
        </div>
        <div className="data_EccentricFrustum">
          <div className="input_data">
            <div style={{ display: "flex" }}>
              <div className="floating_content" style={{ marginTop: 3 }}>
                <input type="text" className="floating_input" placeholder=" " required onChange={handleDiam1Change} />
                <label className="floating_label">Diameter 1</label>
              </div>
              <div className="floating_content" style={{ marginTop: 3 }}>
                <select
                  className="floating_select"
                  defaultValue="---"
                  onChange={(e) => {
                    e.target.setAttribute("value", e.target.value);
                    handleMaterialChange(e);
                  }}
                  onClick={(e) => {
                    e.target.setAttribute("value", e.target.value);
                  }}
                  style={{ width: 115 }}
                >
                  <option value="---">---</option>
                  <option value="Steel">Steel</option>
                  <option value="Inox">Inox</option>
                  <option value="Aluminium">Aluminium</option>
                  <option value="Wood">Wood</option>
                </select>
                <label className="floating_label">Material</label>
              </div>
            </div>
            <div className="floating_content">
              <input type="text" className="floating_input" placeholder=" " required onChange={handleDiam2Change} />
              <label className="floating_label">Diameter 2</label>
            </div>
            <div className="floating_content">
              <input type="text" className="floating_input" placeholder=" " required onChange={handleHeightChange} />
              <label className="floating_label">Height</label>
            </div>
            <div className="floating_content">
              <input type="text" className="floating_input" placeholder=" " required onChange={handleThicknessChange} />
              <label className="floating_label">Thickness</label>
            </div>
          </div>
          <div className="output_data">
            <div className="floating_content" style={{ marginTop: 3, width: 115 }}>
              <input
                type="text"
                className="floating_input"
                placeholder=" "
                readOnly
                value={
                  diam1 === "" || diam2 === "" || height === ""
                    ? ""
                    : points
                        .reduce((highest, current) => {
                          return current[0] > highest ? current[0] : highest;
                        }, 0)
                        .toFixed(0) -
                      points
                        .filter((num) => num[0] !== 0)
                        .reduce((smallest, current) => {
                          return current[0] < smallest ? current[0] : smallest;
                        }, Infinity)
                        .toFixed(0) +
                      " x " +
                      points
                        .reduce((highest, current) => {
                          return current[1] > highest ? current[1] : highest;
                        }, 0)
                        .toFixed(0)
                }
              />
              <label className="floating_label">Raw Plate</label>
            </div>
            <div className="floating_content" style={{ width: 115 }}>
              <input
                type="text"
                className="floating_input"
                placeholder=" "
                readOnly
                value={
                  diam1 === "" || diam2 === "" || height === "" || thickness === "" || material === "---"
                    ? ""
                    : (
                        ((0.000001 *
                          density *
                          thickness *
                          (points
                            .reduce((highest, current) => {
                              return current[0] > highest ? current[0] : highest;
                            }, 0)
                            .toFixed(0) -
                            points
                              .filter((num) => num[0] !== 0)
                              .reduce((smallest, current) => {
                                return current[0] < smallest ? current[0] : smallest;
                              }, Infinity)
                              .toFixed(0))) /
                          1000) *
                        points
                          .reduce((highest, current) => {
                            return current[1] > highest ? current[1] : highest;
                          }, 0)
                          .toFixed(0)
                      ).toFixed(2) + " kg"
                }
              />
              <label className="floating_label">Mass</label>
            </div>
            <div className="floating_content" style={{ width: 115 }}>
              <input
                type="text"
                className="floating_input"
                placeholder=" "
                readOnly
                value={
                  diam1 === "" || diam2 === "" || height === "" || thickness === "" || material === "---"
                    ? ""
                    : (
                        ((0.000001 *
                          density *
                          thickness *
                          ((points
                            .reduce((highest, current) => {
                              return current[0] > highest ? current[0] : highest;
                            }, 0)
                            .toFixed(0) -
                            points
                              .filter((num) => num[0] !== 0)
                              .reduce((smallest, current) => {
                                return current[0] < smallest ? current[0] : smallest;
                              }, Infinity)
                              .toFixed(0)) /
                            1000) *
                          points
                            .reduce((highest, current) => {
                              return current[1] > highest ? current[1] : highest;
                            }, 0)
                            .toFixed(0)) /
                          1000) *
                        price
                      ).toFixed(2) + " $"
                }
              />
              <label className="floating_label">Price</label>
            </div>
          </div>
        </div>
        <canvas className={`canvas_container ${isScaled ? "scale" : ""}`} ref={canvasRef} onClick={handleClick} />
        <div className="menu_button">
          <button className="download_file" onClick={handleDownload}>
            Download file (1/2 of shape)
          </button>
          <button
            className={`${addToCartAnimation ? "geometryToCart animate_cart_EccentricFrustum" : "geometryToCart"}`}
            disabled={
              diam1 === "" ||
              diam2 === "" ||
              height === "" ||
              thickness === "" ||
              /\D/.test(diam1) ||
              /\D/.test(diam2) ||
              /\D/.test(height) ||
              /\D/.test(thickness) ||
              material === "---"
            }
            onClick={handleAddProducts}
          >
            {addToCartAnimation ? (
              <>
                <FontAwesomeIcon icon={faShoppingCart} /> {cartItemsNo}
              </>
            ) : (
              "Add plate to cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EccentricFrustum;
