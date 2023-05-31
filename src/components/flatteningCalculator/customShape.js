import "bootstrap/dist/css/bootstrap.min.css";
import "./customShape.css";
import { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase";
import saveUserProducts from "../../services/saveUserProducts";
import makerjs from "makerjs";
import { writeCart } from "../../services/storageCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const CustomShape = () => {
  const [addToCartAnimation, setAddToCartAnimation] = useState(false);
  const [cartItemsNo, setCartItemsNo] = useState(0);
  const [diam1, setDiam1] = useState("");
  const [diam2, setDiam2] = useState("");
  const [length1, setLength1] = useState("");
  const [length2, setLength2] = useState("");
  const [sideNo, setSideNo] = useState("");
  const [thickness, setThickness] = useState("");
  const [shape, setShape] = useState("Disc");
  const [material, setMaterial] = useState("---");
  const [qty, setQty] = useState("");
  const [density, setDensity] = useState("");
  const [price, setPrice] = useState("");
  const [isScaledImg, setIsScaledImg] = useState(false);
  const [isScaled, setIsScaled] = useState(false);

  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const loggedUserID = auth.currentUser?.uid || "";

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
    setDiam1("");
    setDiam2("");
    setLength1("");
    setLength2("");
    setThickness("");
    setMaterial("---");
    setQty("");
    document.querySelectorAll(".floating_input").forEach((element) => {
      element.value = "";
    });
    document.querySelector("#select_material").value = "---";
  }, [shape]);

  useEffect(() => {
    if (shape === "Disc") {
      const ctx = canvasRef.current.getContext("2d");
      const model = new makerjs.paths.Circle([0, 0], parseInt(diam1 / 2));
      const svg = makerjs.exporter.toSVG(model);
      const img = new Image();
      img.onload = function () {
        const modelRadius = model.radius;
        const modelDiameter = modelRadius * 2;
        const modelWidth = modelDiameter;
        const modelHeight = modelDiameter;
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
    } else if (shape === "Ring") {
      const ctx = canvasRef.current.getContext("2d");
      const model = new makerjs.paths.Circle([0, 0], parseInt(diam1 / 2));
      const svg = makerjs.exporter.toSVG(model);
      const img = new Image();
      img.onload = function () {
        const modelRadius = model.radius;
        const modelDiameter = modelRadius * 2;
        const modelWidth = modelDiameter;
        const modelHeight = modelDiameter;
        const canvasWidth = modelWidth + 40;
        const canvasHeight = modelHeight + 40;
        canvasRef.current.width = canvasWidth;
        canvasRef.current.height = canvasHeight;
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, centerX - modelWidth / 2, centerY - modelHeight / 2);
        const model2 = new makerjs.paths.Circle([0, 0], parseInt(diam2 / 2));
        const svg2 = makerjs.exporter.toSVG(model2);
        const img2 = new Image();
        img2.onload = function () {
          const model2Radius = model2.radius;
          const model2Diameter = model2Radius * 2;
          const model2Width = model2Diameter;
          const model2Height = model2Diameter;
          ctx.drawImage(img2, centerX - model2Width / 2, centerY - model2Height / 2);
        };
        img2.src = "data:image/svg+xml;base64," + btoa(svg2);
      };
      img.src = "data:image/svg+xml;base64," + btoa(svg);
    } else if (shape === "Gusset") {
      const ctx = canvasRef.current.getContext("2d");
      const model = new makerjs.models.ConnectTheDots(true, [
        [0, 0],
        [parseInt(length1), 0],
        [parseInt(length1), parseInt(length2)],
      ]);
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
    } else if (shape === "Star") {
      const ctx = canvasRef.current.getContext("2d");
      const model = new makerjs.models.Star(sideNo === "" ? 3 : sideNo, diam1 / 2, diam2 / 2);
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
  }, [shape, diam1, diam2, length1, length2, sideNo]);

  function handleDownload() {
    if (shape === "Disc") {
      const model = {
        paths: {
          disc: new makerjs.paths.Circle([0, 0], parseInt(diam1 / 2)),
        },
      };
      const exporter = makerjs.exporter.toDXF(model);
      const blob = new Blob([exporter], {
        type: "application/dxf",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "customShape_Disc.dxf";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } else if (shape === "Ring") {
      const model = {
        paths: {
          disc: new makerjs.paths.Circle([0, 0], parseInt(diam1 / 2)),
          ring: new makerjs.paths.Circle([0, 0], parseInt(diam2 / 2)),
        },
      };
      const exporter = makerjs.exporter.toDXF(model);
      const blob = new Blob([exporter], {
        type: "application/dxf",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "customShape_Ring.dxf";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } else if (shape === "Gusset") {
      const model = new makerjs.models.ConnectTheDots(true, [
        [0, 0],
        [parseInt(length1), 0],
        [parseInt(length1), parseInt(length2)],
      ]);
      const exporter = makerjs.exporter.toDXF(model);
      const blob = new Blob([exporter], {
        type: "application/dxf",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "customShape_Gusset.dxf";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } else if (shape === "Star") {
      const model = new makerjs.models.Star(sideNo, diam1 / 2, diam2 / 2);
      const exporter = makerjs.exporter.toDXF(model);
      const blob = new Blob([exporter], {
        type: "application/dxf",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "customShape_Star.dxf";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  }

  function handleShapeChange(e) {
    setShape(e.target.value);
  }

  function handleDiam1Change(e) {
    setDiam1(e.target.value);
  }

  function handleDiam2Change(e) {
    setDiam2(e.target.value);
  }

  function handleLength1Change(e) {
    setLength1(e.target.value);
  }

  function handleLength2Change(e) {
    setLength2(e.target.value);
  }

  function handleSideNoChange(e) {
    setSideNo(e.target.value);
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

  function handleQtyChange(e) {
    setQty(e.target.value);
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
      description: material === "Inox" ? `Stainless Steel Shape_${shape}` : `${material} Shape_${shape}`,
      size:
        shape === "Disc"
          ? "Ø" + diam1 + "x" + thickness
          : shape === "Ring" || shape === "Star"
          ? "Ø" + diam1 + "xØ" + diam2 + "x" + thickness
          : shape === "Gusset"
          ? length1 + "x" + length2 + "x" + thickness
          : "",
      length: "-",
      quantity: qty,
      weight:
        shape === "Disc"
          ? diam1 === "" || thickness === "" || material === "---"
            ? ""
            : (Math.PI * (diam1 / 1000 / 2) ** 2 * (thickness / 1000) * density * qty).toFixed(2)
          : shape === "Ring"
          ? diam1 === "" || diam2 === "" || thickness === "" || material === "---"
            ? ""
            : (
                (Math.PI * (diam1 / 1000 / 2) ** 2 * (thickness / 1000) * density -
                  Math.PI * (diam2 / 1000 / 2) ** 2 * (thickness / 1000) * density) *
                qty
              ).toFixed(2)
          : shape === "Gusset"
          ? length1 === "" || length2 === "" || thickness === "" || material === "---"
            ? ""
            : ((((((density / 1000) * thickness * length1) / 1000) * length2) / 1000 / 2) * qty).toFixed(2)
          : shape === "Star"
          ? diam1 === "" || diam2 === "" || sideNo === "" || thickness === "" || material === "---"
            ? ""
            : (
                ((Math.PI * (diam1 / 1000 / 2) ** 2 * (thickness / 1000) * density -
                  Math.PI * (diam2 / 1000 / 2) ** 2 * (thickness / 1000) * density) /
                  2) *
                qty
              ).toFixed(2)
          : "",
      price:
        shape === "Disc"
          ? diam1 === "" || thickness === "" || material === "---"
            ? ""
            : (((Math.PI * (diam1 / 1000 / 2) ** 2 * (thickness / 1000) * density * price) / 1000) * qty).toFixed(2)
          : shape === "Ring"
          ? diam1 === "" || diam2 === "" || thickness === "" || material === "---"
            ? ""
            : (
                (((Math.PI * (diam1 / 1000 / 2) ** 2 * (thickness / 1000) * density -
                  Math.PI * (diam2 / 1000 / 2) ** 2 * (thickness / 1000) * density) *
                  price) /
                  1000) *
                qty
              ).toFixed(2)
          : shape === "Gusset"
          ? length1 === "" || length2 === "" || thickness === "" || material === "---"
            ? ""
            : ((((((((density / 1000) * thickness * length1) / 1000) * length2) / 1000 / 2) * price) / 1000) * qty).toFixed(2)
          : shape === "Star"
          ? diam1 === "" || diam2 === "" || sideNo === "" || thickness === "" || material === "---"
            ? ""
            : (
                ((((Math.PI * (diam1 / 1000 / 2) ** 2 * (thickness / 1000) * density -
                  Math.PI * (diam2 / 1000 / 2) ** 2 * (thickness / 1000) * density) /
                  2) *
                  price) /
                  1000) *
                qty
              ).toFixed(2)
          : "",
    };

    loggedUserID ? saveUserProducts(loggedUserID, tempObj) : writeCart(tempObj);
  };

  return (
    <div className="home_root">
      <div className="home_container">
        <div className="params">
          <span>PICK YOUR CUSTOM SHAPE</span>
        </div>
        <div className="img_container_shape">
          <div className="floating_content" style={{ marginTop: 3, width: 115 }}>
            <select
              className="floating_select"
              defaultValue="Disc"
              onChange={(e) => {
                e.target.setAttribute("value", e.target.value);
                handleShapeChange(e);
              }}
              onClick={(e) => {
                e.target.setAttribute("value", e.target.value);
              }}
            >
              <option value="Disc">Disc</option>
              <option value="Ring">Ring</option>
              <option value="Gusset">Gusset</option>
              <option value="Star">Star</option>
            </select>
            <label className="floating_label">Your shape</label>
          </div>
          <img
            src={`shapeCalculator/shape_${shape.includes(" ") ? shape.toLowerCase().split(" ")[0] : shape.toLowerCase()}.png`}
            alt="customShape"
            style={{
              width: 210,
              height: 186,
              marginTop: 10,
            }}
            className={`img_PipeByPlane ${isScaledImg ? "scaleImg" : ""}`}
            ref={imgRef}
            onClick={handleClickImg}
          />
        </div>
        <div className="input_output">
          <span>INPUT(mm)</span>
          <span>OUTPUT</span>
        </div>
        <div className="data_pipeByPlane">
          <div className="input_data" style={{ height: 138 }}>
            <div style={{ display: "flex" }}>
              <div className="floating_content" style={{ marginTop: 3 }}>
                <input
                  type="text"
                  className="floating_input"
                  placeholder=" "
                  required
                  onChange={shape === "Gusset" ? handleLength1Change : handleDiam1Change}
                />
                <label className="floating_label">
                  {(() => {
                    if (shape === "Disc") {
                      return "Diameter";
                    } else if (shape === "Ring") {
                      return "Diameter A";
                    } else if (shape === "Gusset") {
                      return "Length A";
                    } else if (shape === "Star") {
                      return "Diameter A";
                    }
                  })()}
                </label>
              </div>
              {shape === "Disc" ? (
                <div className="floating_content" style={{ marginTop: 3 }}>
                  <input
                    type="text"
                    className="floating_input"
                    placeholder=" "
                    required
                    onChange={handleQtyChange}
                    style={{ width: 115 }}
                  />
                  <label className="floating_label">Quantity</label>
                </div>
              ) : (
                <div className="floating_content" style={{ marginTop: 3 }}>
                  <input
                    type="text"
                    className="floating_input"
                    placeholder=" "
                    required
                    style={{ width: 115 }}
                    onChange={handleThicknessChange}
                  />
                  <label className="floating_label">Thickness</label>
                </div>
              )}
            </div>
            <div style={{ display: "flex" }}>
              {shape === "Disc" ? (
                <>
                  <div className="floating_content">
                    <input type="text" className="floating_input" placeholder=" " required onChange={handleThicknessChange} />
                    <label className="floating_label">Thickness</label>
                  </div>
                  <div className="floating_content" style={{ width: 115 }}>
                    <select
                      className="floating_select"
                      id="select_material"
                      defaultValue="---"
                      onChange={(e) => {
                        e.target.setAttribute("value", e.target.value);
                        handleMaterialChange(e);
                      }}
                      onClick={(e) => {
                        e.target.setAttribute("value", e.target.value);
                      }}
                    >
                      <option value="---">---</option>
                      <option value="Steel">Steel</option>
                      <option value="Inox">Inox</option>
                      <option value="Aluminium">Aluminium</option>
                      <option value="Wood">Wood</option>
                    </select>
                    <label className="floating_label">Material</label>
                  </div>
                </>
              ) : shape === "Ring" || shape === "Star" ? (
                <>
                  <div className="floating_content">
                    <input type="text" className="floating_input" placeholder=" " required onChange={handleDiam2Change} />
                    <label className="floating_label">Diameter B</label>
                  </div>
                  <div className="floating_content">
                    <input
                      type="text"
                      className="floating_input"
                      placeholder=" "
                      required
                      onChange={handleQtyChange}
                      style={{ width: 115 }}
                    />
                    <label className="floating_label">Quantity</label>
                  </div>
                </>
              ) : shape === "Gusset" ? (
                <>
                  <div className="floating_content">
                    <input type="text" className="floating_input" placeholder=" " required onChange={handleLength2Change} />
                    <label className="floating_label">Length B</label>
                  </div>
                  <div className="floating_content" style={{ width: 115 }}>
                    <select
                      className="floating_select"
                      id="select_material"
                      defaultValue="---"
                      onChange={(e) => {
                        e.target.setAttribute("value", e.target.value);
                        handleMaterialChange(e);
                      }}
                      onClick={(e) => {
                        e.target.setAttribute("value", e.target.value);
                      }}
                    >
                      <option value="---">---</option>
                      <option value="Steel">Steel</option>
                      <option value="Inox">Inox</option>
                      <option value="Aluminium">Aluminium</option>
                      <option value="Wood">Wood</option>
                    </select>
                    <label className="floating_label">Material</label>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div style={{ display: "flex" }}>
              {shape === "Star" ? (
                <>
                  <div className="floating_content">
                    <input type="text" className="floating_input" placeholder=" " required onChange={handleSideNoChange} />
                    <label className="floating_label">Sides</label>
                  </div>
                  <div className="floating_content" style={{ width: 115 }}>
                    <select
                      className="floating_select"
                      id="select_material"
                      defaultValue="---"
                      onChange={(e) => {
                        e.target.setAttribute("value", e.target.value);
                        handleMaterialChange(e);
                      }}
                      onClick={(e) => {
                        e.target.setAttribute("value", e.target.value);
                      }}
                    >
                      <option value="---">---</option>
                      <option value="Steel">Steel</option>
                      <option value="Inox">Inox</option>
                      <option value="Aluminium">Aluminium</option>
                      <option value="Wood">Wood</option>
                    </select>
                    <label className="floating_label">Material</label>
                  </div>
                </>
              ) : shape === "Gusset" ? (
                <div className="floating_content">
                  <input type="text" className="floating_input" placeholder=" " required onChange={handleQtyChange} />
                  <label className="floating_label">Quantity</label>
                </div>
              ) : shape === "Ring" ? (
                <div className="floating_content" style={{ width: 105 }}>
                  <select
                    className="floating_select"
                    id="select_material"
                    defaultValue="---"
                    onChange={(e) => {
                      e.target.setAttribute("value", e.target.value);
                      handleMaterialChange(e);
                    }}
                    onClick={(e) => {
                      e.target.setAttribute("value", e.target.value);
                    }}
                  >
                    <option value="---">---</option>
                    <option value="Steel">Steel</option>
                    <option value="Inox">Inox</option>
                    <option value="Aluminium">Aluminium</option>
                    <option value="Wood">Wood</option>
                  </select>
                  <label className="floating_label">Material</label>
                </div>
              ) : (
                ""
              )}
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
                  shape === "Disc"
                    ? diam1 === "" || thickness === "" || material === "---"
                      ? ""
                      : (Math.PI * (diam1 / 1000 / 2) ** 2 * (thickness / 1000) * density * qty).toFixed(2) + " kg"
                    : shape === "Ring"
                    ? diam1 === "" || diam2 === "" || thickness === "" || material === "---"
                      ? ""
                      : (
                          (Math.PI * (diam1 / 1000 / 2) ** 2 * (thickness / 1000) * density -
                            Math.PI * (diam2 / 1000 / 2) ** 2 * (thickness / 1000) * density) *
                          qty
                        ).toFixed(2) + " kg"
                    : shape === "Gusset"
                    ? length1 === "" || length2 === "" || thickness === "" || material === "---"
                      ? ""
                      : ((((((density / 1000) * thickness * length1) / 1000) * length2) / 1000 / 2) * qty).toFixed(2) + " kg"
                    : shape === "Star"
                    ? diam1 === "" || diam2 === "" || sideNo === "" || thickness === "" || material === "---"
                      ? ""
                      : (
                          ((Math.PI * (diam1 / 1000 / 2) ** 2 * (thickness / 1000) * density -
                            Math.PI * (diam2 / 1000 / 2) ** 2 * (thickness / 1000) * density) /
                            2) *
                          qty
                        ).toFixed(2) + " kg"
                    : ""
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
                  shape === "Disc"
                    ? diam1 === "" || thickness === "" || material === "---"
                      ? ""
                      : (((Math.PI * (diam1 / 1000 / 2) ** 2 * (thickness / 1000) * density * price) / 1000) * qty).toFixed(2) + " $"
                    : shape === "Ring"
                    ? diam1 === "" || diam2 === "" || thickness === "" || material === "---"
                      ? ""
                      : (
                          (((Math.PI * (diam1 / 1000 / 2) ** 2 * (thickness / 1000) * density -
                            Math.PI * (diam2 / 1000 / 2) ** 2 * (thickness / 1000) * density) *
                            price) /
                            1000) *
                          qty
                        ).toFixed(2) + " $"
                    : shape === "Gusset"
                    ? length1 === "" || length2 === "" || thickness === "" || material === "---"
                      ? ""
                      : ((((((((density / 1000) * thickness * length1) / 1000) * length2) / 1000 / 2) * price) / 1000) * qty).toFixed(2) +
                        " $"
                    : shape === "Star"
                    ? diam1 === "" || diam2 === "" || sideNo === "" || thickness === "" || material === "---"
                      ? ""
                      : (
                          ((((Math.PI * (diam1 / 1000 / 2) ** 2 * (thickness / 1000) * density -
                            Math.PI * (diam2 / 1000 / 2) ** 2 * (thickness / 1000) * density) /
                            2) *
                            price) /
                            1000) *
                          qty
                        ).toFixed(2) + " $"
                    : ""
                }
              />
              <label className="floating_label">Price</label>
            </div>
          </div>
        </div>
        <canvas
          className={`canvas_container ${isScaled ? "scaleCanvasShape" : ""}`}
          style={{ height: 302 }}
          onClick={handleClick}
          ref={canvasRef}
        />
        <div className="menu_button">
          <button className="download_file" onClick={handleDownload}>
            Download custom shape
          </button>
          <button
            className={`${addToCartAnimation ? "geometryToCart animate_cart_customShape" : "geometryToCart"}`}
            onClick={handleAddProducts}
            disabled={
              shape === "Disc"
                ? diam1 === "" || thickness === "" || material === "---"
                : shape === "Ring"
                ? diam1 === "" || diam2 === "" || thickness === "" || material === "---"
                : shape === "Gusset"
                ? length1 === "" || length2 === "" || thickness === "" || material === "---"
                : shape === "Star"
                ? diam1 === "" || diam2 === "" || sideNo === "" || thickness === "" || material === "---"
                : ""
            }
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

export default CustomShape;
