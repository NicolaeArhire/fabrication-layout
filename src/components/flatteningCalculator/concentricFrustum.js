import "./concentricFrustum.css";
import photo from "../../assets/concentricFrustum.png";
import { useEffect, useRef, useState } from "react";
import makerjs from "makerjs";

const ConcentricFrustum = () => {
  const [diam1, setDiam1] = useState("");
  const [diam2, setDiam2] = useState("");
  const [height, setHeight] = useState("");
  const [thickness, setThickness] = useState("");
  const [material, setMaterial] = useState("---");
  const [density, setDensity] = useState("");
  const [price, setPrice] = useState("");
  const [isScaledImg, setIsScaledImg] = useState(false);
  const [isScaled, setIsScaled] = useState(false);
  const [pointsArc1, setPointsArc1] = useState([[0, 0], 20, 125, 215]);
  const [pointsArc2, setPointsArc2] = useState([[0, 0], 20, 225, 315]);
  const [pointsLine1, setPointsLine1] = useState([
    [0, 0],
    [10, 10],
  ]);
  const [pointsLine2, setPointsLine2] = useState([
    [0, 0],
    [10, 10],
  ]);

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
    const newPointsArc1 = [
      [0, Math.sqrt(((height * diam2) / (diam2 - diam1)) ** 2 + (diam2 / 2) ** 2)],
      Math.sqrt(((height * diam2) / (diam2 - diam1)) ** 2 + (diam2 / 2) ** 2) - Math.sqrt(height ** 2 + (diam2 / 2 - diam1 / 2) ** 2),
      270,
      270 + (360 * (diam2 / 2)) / (Math.sqrt(((diam2 - diam1) / 2) ** 2 + height ** 2) * (1 + 1 / (diam2 / diam1 - 1))) / 2,
    ];
    const newPointsArc2 = [
      [0, Math.sqrt(((height * diam2) / (diam2 - diam1)) ** 2 + (diam2 / 2) ** 2)],
      Math.sqrt(((height * diam2) / (diam2 - diam1)) ** 2 + (diam2 / 2) ** 2),
      270,
      270 + (360 * (diam2 / 2)) / (Math.sqrt(((diam2 - diam1) / 2) ** 2 + height ** 2) * (1 + 1 / (diam2 / diam1 - 1))) / 2,
    ];
    const newPointsLine1 = [
      [0, 0],
      [0, Math.sqrt(height ** 2 + (diam2 / 2 - diam1 / 2) ** 2)],
    ];
    const newPointsLine2 = [
      [
        (Math.sqrt(((diam2 - diam1) / 2) ** 2 + height ** 2) * (1 + 1 / (diam2 / diam1 - 1)) -
          Math.sqrt(((diam2 - diam1) / 2) ** 2 + height ** 2)) *
          Math.sin(
            (((360 * (diam2 / 2)) / (Math.sqrt(((diam2 - diam1) / 2) ** 2 + height ** 2) * (1 + 1 / (diam2 / diam1 - 1))) / 2) * Math.PI) /
              180
          ),
        Math.sqrt(((diam2 - diam1) / 2) ** 2 + height ** 2) * (1 + 1 / (diam2 / diam1 - 1)) -
          Math.sqrt(((diam2 - diam1) / 2) ** 2 + height ** 2) *
            (1 + 1 / (diam2 / diam1 - 1)) *
            Math.cos(
              (((360 * (diam2 / 2)) / (Math.sqrt(((diam2 - diam1) / 2) ** 2 + height ** 2) * (1 + 1 / (diam2 / diam1 - 1))) / 2) *
                Math.PI) /
                180
            ) +
          Math.sqrt(((diam2 - diam1) / 2) ** 2 + height ** 2) *
            Math.cos(
              (((360 * (diam2 / 2)) / (Math.sqrt(((diam2 - diam1) / 2) ** 2 + height ** 2) * (1 + 1 / (diam2 / diam1 - 1))) / 2) *
                Math.PI) /
                180
            ),
      ],
      [
        Math.sqrt(((diam2 - diam1) / 2) ** 2 + height ** 2) *
          (1 + 1 / (diam2 / diam1 - 1)) *
          Math.sin(
            (((360 * (diam2 / 2)) / (Math.sqrt(((diam2 - diam1) / 2) ** 2 + height ** 2) * (1 + 1 / (diam2 / diam1 - 1))) / 2) * Math.PI) /
              180
          ),
        Math.sqrt(((diam2 - diam1) / 2) ** 2 + height ** 2) * (1 + 1 / (diam2 / diam1 - 1)) -
          Math.sqrt(((diam2 - diam1) / 2) ** 2 + height ** 2) *
            (1 + 1 / (diam2 / diam1 - 1)) *
            Math.cos(
              (((360 * (diam2 / 2)) / (Math.sqrt(((diam2 - diam1) / 2) ** 2 + height ** 2) * (1 + 1 / (diam2 / diam1 - 1))) / 2) *
                Math.PI) /
                180
            ),
      ],
    ];

    setPointsArc1(newPointsArc1);
    setPointsArc2(newPointsArc2);
    setPointsLine1(newPointsLine1);
    setPointsLine2(newPointsLine2);
  }, [diam1, diam2, height]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const arcPath1 = new makerjs.paths.Arc(...pointsArc1);
      const arcPath2 = new makerjs.paths.Arc(...pointsArc2);
      const linePath1 = new makerjs.paths.Line(...pointsLine1);
      const linePath2 = new makerjs.paths.Line(...pointsLine2);
      const model = {
        paths: {
          arc1: arcPath1,
          arc2: arcPath2,
          line1: linePath1,
          line2: linePath2,
        },
      };
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
  }, [pointsArc1, pointsArc2, pointsLine1, pointsLine2]);

  function handleDownload() {
    const arcPath1 = new makerjs.paths.Arc(...pointsArc1);
    const arcPath2 = new makerjs.paths.Arc(...pointsArc2);
    const linePath1 = new makerjs.paths.Line(...pointsLine1);
    const linePath2 = new makerjs.paths.Line(...pointsLine2);
    const model = {
      paths: {
        arc1: arcPath1,
        arc2: arcPath2,
        line1: linePath1,
        line2: linePath2,
      },
    };
    const exporter = makerjs.exporter.toDXF(model);
    const blob = new Blob([exporter], { type: "application/dxf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "concentricFrustum.dxf";
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

  return (
    <div className="home_root">
      <div className="home_container">
        <div className="params">
          <span>CONCENTRIC CONE FRUSTUM</span>
        </div>
        <div className="img_container">
          <img
            src={photo}
            alt="ConcentricFrustum"
            style={{
              width: 270,
              height: 235,
            }}
            className={`img_ConcentricFrustum ${isScaledImg ? "scaleImg" : ""}`}
            ref={imgRef}
            onClick={handleClickImg}
          />
        </div>
        <div className="input_output">
          <span>INPUT(mm)</span>
          <span>OUTPUT</span>
        </div>
        <div className="data_ConcentricFrustum">
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
                    : Math.max(pointsLine1[1][0], pointsLine1[0][0], pointsLine2[1][0], pointsLine2[0][0]).toFixed(0) +
                      " x " +
                      Math.max(pointsLine1[0][1], pointsLine1[1][1], pointsLine2[0][1], pointsLine2[1][1]).toFixed(0) +
                      " mm"
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
                  diam1 === "" || diam2 === "" || height === "" || thickness === "" || material === "Material..."
                    ? ""
                    : (
                        0.000001 *
                        density *
                        thickness *
                        (Math.max(pointsLine1[1][0], pointsLine1[0][0], pointsLine2[1][0], pointsLine2[0][0]).toFixed(0) / 1000) *
                        Math.max(pointsLine1[0][1], pointsLine1[1][1], pointsLine2[0][1], pointsLine2[1][1]).toFixed(0)
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
                  diam1 === "" || diam2 === "" || height === "" || thickness === "" || material === "Material..."
                    ? ""
                    : (
                        ((0.000001 *
                          density *
                          thickness *
                          (Math.max(pointsLine1[1][0], pointsLine1[0][0], pointsLine2[1][0], pointsLine2[0][0]) / 1000) *
                          Math.max(pointsLine1[0][1], pointsLine1[1][1], pointsLine2[0][1], pointsLine2[1][1])) /
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
          <button className="geometryToCart">Add plate to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ConcentricFrustum;
