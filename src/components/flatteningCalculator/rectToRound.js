import "./rectToRound.css";
import photo from "../../assets/rectToRound.png";
import { useEffect, useRef, useState } from "react";
import makerjs from "makerjs";

const RectToRound = () => {
  const [diam, setDiam] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");
  const [material, setMaterial] = useState("---");
  const [density, setDensity] = useState("");
  const [price, setPrice] = useState("");
  const [closed, setClosed] = useState(true);
  const [points, setPoints] = useState([
    [1984.9, 100],
    [1984.9, 2100],
    [1827.825, 2075.63518863919],
    [1670.75, 2097.20117618625],
    [1513.675, 2093.56607253955],
    [1356.6, 2089.47392222174],
    [1199.525, 2084.01696054311],
    [1042.45, 2079.94784444347],
    [885.375, 2073.87872834383],
    [728.3, 2068.42176666521],
    [571.225, 2064.329616347396],
    [414.15, 2060.6945127007],
    [257.075, 2058.260500247757],
    [100, 2058.895688886948],
    [100, 100],
  ]);

  const [isScaledImg, setIsScaledImg] = useState(false);
  const [isScaled, setIsScaled] = useState(false);

  const imgRef = useRef(null);
  const canvasRef = useRef(null);

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
    const arcLength = (Math.PI * diam) / 24;
    const trueHeight = Math.sqrt((width / 2 - diam / 2) ** 2 + height ** 2);

    const A1 = length / 2 - (diam / 2) * Math.sin((0 * 15 * Math.PI) / 180);
    const A2 = length / 2 - (diam / 2) * Math.sin((1 * 15 * Math.PI) / 180);
    const A3 = length / 2 - (diam / 2) * Math.sin((2 * 15 * Math.PI) / 180);
    const A4 = length / 2 - (diam / 2) * Math.sin((3 * 15 * Math.PI) / 180);
    const A5 = length / 2 - (diam / 2) * Math.sin((4 * 15 * Math.PI) / 180);
    const A6 = length / 2 - (diam / 2) * Math.sin((5 * 15 * Math.PI) / 180);
    const A7 = length / 2 - (diam / 2) * Math.sin((6 * 15 * Math.PI) / 180);

    const B1 = width / 2 - (diam / 2) * Math.cos((0 * 15 * Math.PI) / 180);
    const B2 = width / 2 - (diam / 2) * Math.cos((1 * 15 * Math.PI) / 180);
    const B3 = width / 2 - (diam / 2) * Math.cos((2 * 15 * Math.PI) / 180);
    const B4 = width / 2 - (diam / 2) * Math.cos((3 * 15 * Math.PI) / 180);
    const B5 = width / 2 - (diam / 2) * Math.cos((4 * 15 * Math.PI) / 180);
    const B6 = width / 2 - (diam / 2) * Math.cos((5 * 15 * Math.PI) / 180);
    const B7 = width / 2 - (diam / 2) * Math.cos((6 * 15 * Math.PI) / 180);

    const S1 = Math.sqrt(A1 ** 2 + B1 ** 2 + height ** 2);
    const S2 = Math.sqrt(A2 ** 2 + B2 ** 2 + height ** 2);
    const S3 = Math.sqrt(A3 ** 2 + B3 ** 2 + height ** 2);
    const S4 = Math.sqrt(A4 ** 2 + B4 ** 2 + height ** 2);
    const S5 = Math.sqrt(A5 ** 2 + B5 ** 2 + height ** 2);
    const S6 = Math.sqrt(A6 ** 2 + B6 ** 2 + height ** 2);
    const S7 = Math.sqrt(A7 ** 2 + B7 ** 2 + height ** 2);

    const angle1 = (Math.acos(((width / 2) ** 2 + S1 ** 2 - trueHeight ** 2) / (((2 * width) / 2) * S1)) * 180) / Math.PI;
    const angle2 = (Math.acos((S1 ** 2 + S2 ** 2 - arcLength ** 2) / (2 * S1 * S2)) * 180) / Math.PI;
    const angle3 = (Math.acos((S2 ** 2 + S3 ** 2 - arcLength ** 2) / (2 * S2 * S3)) * 180) / Math.PI;
    const angle4 = (Math.acos((S3 ** 2 + S4 ** 2 - arcLength ** 2) / (2 * S3 * S4)) * 180) / Math.PI;
    const angle5 = (Math.acos((S4 ** 2 + S5 ** 2 - arcLength ** 2) / (2 * S4 * S5)) * 180) / Math.PI;
    const angle6 = (Math.acos((S5 ** 2 + S6 ** 2 - arcLength ** 2) / (2 * S5 * S6)) * 180) / Math.PI;
    const angle7 = (Math.acos((S6 ** 2 + S7 ** 2 - arcLength ** 2) / (2 * S6 * S7)) * 180) / Math.PI;
    const angle8 = (Math.acos((S7 ** 2 + width ** 2 - S7 ** 2) / (2 * S7 * width)) * 180) / Math.PI;

    const pointX1 = trueHeight;
    const pointX2 =
      pointX1 - (width / 2) * Math.sin(((180 - (angle1 + angle2 + angle3 + angle4 + angle5 + angle6 + angle7 + angle8)) * Math.PI) / 180);
    const pointX3 = pointX1 - S7 * Math.sin(((180 - (angle1 + angle2 + angle3 + angle4 + angle5 + angle6 + angle7)) * Math.PI) / 180);
    const pointX4 = pointX1 - S6 * Math.sin(((180 - (angle1 + angle2 + angle3 + angle4 + angle5 + angle6)) * Math.PI) / 180);
    const pointX5 = pointX1 - S5 * Math.sin(((180 - (angle1 + angle2 + angle3 + angle4 + angle5)) * Math.PI) / 180);
    const pointX6 = pointX1 - S4 * Math.sin(((180 - (angle1 + angle2 + angle3 + angle4)) * Math.PI) / 180);
    const pointX7 = pointX1 - S3 * Math.sin(((180 - (angle1 + angle2 + angle3)) * Math.PI) / 180);
    const pointX8 = pointX1 - S2 * Math.sin(((180 - (angle1 + angle2)) * Math.PI) / 180);

    const pointY2 =
      length / 2 +
      (width / 2) * Math.cos(((180 - (angle1 + angle2 + angle3 + angle4 + angle5 + angle6 + angle7 + angle8)) * Math.PI) / 180);
    const pointY3 = length / 2 - S7 * Math.cos(((angle1 + angle2 + angle3 + angle4 + angle5 + angle6 + angle7) * Math.PI) / 180);
    const pointY4 = length / 2 - S6 * Math.cos(((angle1 + angle2 + angle3 + angle4 + angle5 + angle6) * Math.PI) / 180);
    const pointY5 = length / 2 - S5 * Math.cos(((angle1 + angle2 + angle3 + angle4 + angle5) * Math.PI) / 180);
    const pointY6 = length / 2 - S4 * Math.cos(((angle1 + angle2 + angle3 + angle4) * Math.PI) / 180);
    const pointY7 = length / 2 - S3 * Math.cos(((angle1 + angle2 + angle3) * Math.PI) / 180);
    const pointY8 = length / 2 - S2 * Math.cos(((angle1 + angle2) * Math.PI) / 180);

    const newPoints = [
      [pointX1, 0],
      [pointX1, length / 2],
      [pointX2, pointY2],
      [pointX3, pointY3],
      [pointX4, pointY4],
      [pointX5, pointY5],
      [pointX6, pointY6],
      [pointX7, pointY7],
      [pointX8, pointY8],
      [0, 0],
    ];

    setPoints(newPoints);
  }, [diam, height, length, width]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const model = new makerjs.models.ConnectTheDots(closed, points);
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
  }, [closed, points]);

  function handleDownload() {
    const model = new makerjs.models.ConnectTheDots(closed, points);
    const exporter = makerjs.exporter.toDXF(model);
    const blob = new Blob([exporter], { type: "application/dxf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "rectToRound.dxf";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleDiamChange(e) {
    setDiam(e.target.value);
  }

  function handleHeightChange(e) {
    setHeight(e.target.value);
  }

  function handleLengthChange(e) {
    setLength(e.target.value);
  }

  function handleWidthChange(e) {
    setWidth(e.target.value);
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

  return (
    <div className="home_root">
      <div className="home_container">
        <div className="params">
          <span>ADAPTER - RECTANGULAR TO ROUND</span>
        </div>
        <div className="img_container">
          <img
            src={photo}
            alt="RectToRound"
            style={{
              width: 270,
              height: 235,
            }}
            className={`img_RectToRound ${isScaledImg ? "scaleImg" : ""}`}
            ref={imgRef}
            onClick={handleClickImg}
          />
        </div>
        <div className="input_output">
          <span>INPUT(mm)</span>
          <span>OUTPUT</span>
        </div>
        <div className="data_RectToRound">
          <div className="input_data">
            <div style={{ display: "flex" }}>
              <div className="floating_content" style={{ marginTop: 3 }}>
                <input type="text" className="floating_input" placeholder=" " required onChange={handleDiamChange} />
                <label className="floating_label">Diameter</label>
              </div>
              <div className="floating_content" style={{ marginTop: 3, width: 110 }}>
                <input
                  type="text"
                  className="floating_input"
                  placeholder=" "
                  required
                  onChange={handleThicknessChange}
                  style={{ width: 115 }}
                />
                <label className="floating_label">Thickness</label>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="floating_content">
                <input type="text" className="floating_input" placeholder=" " required onChange={handleHeightChange} />
                <label className="floating_label">Height</label>
              </div>
              <div className="floating_content">
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
              <input type="text" className="floating_input" placeholder=" " required onChange={handleLengthChange} />
              <label className="floating_label">Length</label>
            </div>
            <div className="floating_content">
              <input type="text" className="floating_input" placeholder=" " required onChange={handleWidthChange} />
              <label className="floating_label">Width</label>
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
                  diam === "" || height === "" || length === "" || width === ""
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
                  diam === "" || height === "" || length === "" || width === "" || thickness === "" || material === "---"
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
              <label className="floating_label">Mass (kg)</label>
            </div>
            <div className="floating_content" style={{ width: 115 }}>
              <input
                type="text"
                className="floating_input"
                placeholder=" "
                readOnly
                value={
                  diam === "" || height === "" || length === "" || width === "" || thickness === "" || material === "---"
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
              <label className="floating_label">Price ($)</label>
            </div>
          </div>
        </div>
        <canvas className={`canvas_container ${isScaled ? "scale" : ""}`} ref={canvasRef} onClick={handleClick} />
        <div className="menu_button">
          <button className="download_file" onClick={handleDownload}>
            Download file (1/4 of shape)
          </button>
          <button className="geometryToCart">Add plate to cart</button>
        </div>
      </div>
    </div>
  );
};

export default RectToRound;
