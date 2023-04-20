import "./pipeByCone.css";
import photo from "../../assets/pipeByCone.png";
import { useEffect, useRef, useState } from "react";
import makerjs from "makerjs";

const PipeByCone = () => {
  const [diam1, setDiam1] = useState("");
  const [diam2, setDiam2] = useState("");
  const [diam3, setDiam3] = useState("");
  const [length1, setLength1] = useState("");
  const [length2, setLength2] = useState("");
  const [length3, setLength3] = useState("");
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
    const newPoints = [
      [(diam1 * Math.PI) / 2, 0],
      [
        (diam1 * Math.PI) / 2,
        length1 -
          Math.sqrt(
            (((diam3 / 2 / ((diam3 - diam2) / (2 * length3)) - (length2 - (diam1 / 2) * Math.cos((0 * 15 * Math.PI) / 180))) *
              (diam3 - diam2)) /
              (2 * length3)) **
              2 -
              ((diam1 / 2) * Math.sin((0 * 15 * Math.PI) / 180)) ** 2
          ),
      ],
      [
        (diam1 * Math.PI) / 2 - ((diam1 * Math.PI) / 24) * 1,
        length1 -
          Math.sqrt(
            (((diam3 / 2 / ((diam3 - diam2) / (2 * length3)) - (length2 - (diam1 / 2) * Math.cos((1 * 15 * Math.PI) / 180))) *
              (diam3 - diam2)) /
              (2 * length3)) **
              2 -
              ((diam1 / 2) * Math.sin((1 * 15 * Math.PI) / 180)) ** 2
          ),
      ],
      [
        (diam1 * Math.PI) / 2 - ((diam1 * Math.PI) / 24) * 2,
        length1 -
          Math.sqrt(
            (((diam3 / 2 / ((diam3 - diam2) / (2 * length3)) - (length2 - (diam1 / 2) * Math.cos((2 * 15 * Math.PI) / 180))) *
              (diam3 - diam2)) /
              (2 * length3)) **
              2 -
              ((diam1 / 2) * Math.sin((2 * 15 * Math.PI) / 180)) ** 2
          ),
      ],
      [
        (diam1 * Math.PI) / 2 - ((diam1 * Math.PI) / 24) * 3,
        length1 -
          Math.sqrt(
            (((diam3 / 2 / ((diam3 - diam2) / (2 * length3)) - (length2 - (diam1 / 2) * Math.cos((3 * 15 * Math.PI) / 180))) *
              (diam3 - diam2)) /
              (2 * length3)) **
              2 -
              ((diam1 / 2) * Math.sin((3 * 15 * Math.PI) / 180)) ** 2
          ),
      ],
      [
        (diam1 * Math.PI) / 2 - ((diam1 * Math.PI) / 24) * 4,
        length1 -
          Math.sqrt(
            (((diam3 / 2 / ((diam3 - diam2) / (2 * length3)) - (length2 - (diam1 / 2) * Math.cos((4 * 15 * Math.PI) / 180))) *
              (diam3 - diam2)) /
              (2 * length3)) **
              2 -
              ((diam1 / 2) * Math.sin((4 * 15 * Math.PI) / 180)) ** 2
          ),
      ],
      [
        (diam1 * Math.PI) / 2 - ((diam1 * Math.PI) / 24) * 5,
        length1 -
          Math.sqrt(
            (((diam3 / 2 / ((diam3 - diam2) / (2 * length3)) - (length2 - (diam1 / 2) * Math.cos((5 * 15 * Math.PI) / 180))) *
              (diam3 - diam2)) /
              (2 * length3)) **
              2 -
              ((diam1 / 2) * Math.sin((5 * 15 * Math.PI) / 180)) ** 2
          ),
      ],
      [
        (diam1 * Math.PI) / 2 - ((diam1 * Math.PI) / 24) * 6,
        length1 -
          Math.sqrt(
            (((diam3 / 2 / ((diam3 - diam2) / (2 * length3)) - (length2 - (diam1 / 2) * Math.cos((6 * 15 * Math.PI) / 180))) *
              (diam3 - diam2)) /
              (2 * length3)) **
              2 -
              ((diam1 / 2) * Math.sin((6 * 15 * Math.PI) / 180)) ** 2
          ),
      ],
      [
        (diam1 * Math.PI) / 2 - ((diam1 * Math.PI) / 24) * 7,
        length1 -
          Math.sqrt(
            (((diam3 / 2 / ((diam3 - diam2) / (2 * length3)) - (length2 - (diam1 / 2) * Math.cos((7 * 15 * Math.PI) / 180))) *
              (diam3 - diam2)) /
              (2 * length3)) **
              2 -
              ((diam1 / 2) * Math.sin((7 * 15 * Math.PI) / 180)) ** 2
          ),
      ],
      [
        (diam1 * Math.PI) / 2 - ((diam1 * Math.PI) / 24) * 8,
        length1 -
          Math.sqrt(
            (((diam3 / 2 / ((diam3 - diam2) / (2 * length3)) - (length2 - (diam1 / 2) * Math.cos((8 * 15 * Math.PI) / 180))) *
              (diam3 - diam2)) /
              (2 * length3)) **
              2 -
              ((diam1 / 2) * Math.sin((8 * 15 * Math.PI) / 180)) ** 2
          ),
      ],
      [
        (diam1 * Math.PI) / 2 - ((diam1 * Math.PI) / 24) * 9,
        length1 -
          Math.sqrt(
            (((diam3 / 2 / ((diam3 - diam2) / (2 * length3)) - (length2 - (diam1 / 2) * Math.cos((9 * 15 * Math.PI) / 180))) *
              (diam3 - diam2)) /
              (2 * length3)) **
              2 -
              ((diam1 / 2) * Math.sin((9 * 15 * Math.PI) / 180)) ** 2
          ),
      ],
      [
        (diam1 * Math.PI) / 2 - ((diam1 * Math.PI) / 24) * 10,
        length1 -
          Math.sqrt(
            (((diam3 / 2 / ((diam3 - diam2) / (2 * length3)) - (length2 - (diam1 / 2) * Math.cos((10 * 15 * Math.PI) / 180))) *
              (diam3 - diam2)) /
              (2 * length3)) **
              2 -
              ((diam1 / 2) * Math.sin((10 * 15 * Math.PI) / 180)) ** 2
          ),
      ],
      [
        (diam1 * Math.PI) / 2 - ((diam1 * Math.PI) / 24) * 11,
        length1 -
          Math.sqrt(
            (((diam3 / 2 / ((diam3 - diam2) / (2 * length3)) - (length2 - (diam1 / 2) * Math.cos((11 * 15 * Math.PI) / 180))) *
              (diam3 - diam2)) /
              (2 * length3)) **
              2 -
              ((diam1 / 2) * Math.sin((11 * 15 * Math.PI) / 180)) ** 2
          ),
      ],
      [
        0,
        length1 -
          Math.sqrt(
            (((diam3 / 2 / ((diam3 - diam2) / (2 * length3)) - (length2 - (diam1 / 2) * Math.cos((12 * 15 * Math.PI) / 180))) *
              (diam3 - diam2)) /
              (2 * length3)) **
              2 -
              ((diam1 / 2) * Math.sin((12 * 15 * Math.PI) / 180)) ** 2
          ),
      ],
      [0, 0],
    ];

    setPoints(newPoints);
  }, [diam1, diam2, diam3, length1, length2, length3]);

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
    link.download = "pipeIntByCone.dxf";
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

  function handleDiam3Change(e) {
    setDiam3(e.target.value);
  }

  function handleLength1Change(e) {
    setLength1(e.target.value);
  }

  function handleLength2Change(e) {
    setLength2(e.target.value);
  }

  function handleLength3Change(e) {
    setLength3(e.target.value);
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
          <span>PIPE INTERSECTION BY CONE</span>
        </div>
        <div className="img_container">
          <img
            src={photo}
            alt="PipeByCone"
            style={{
              width: 270,
              height: 235,
            }}
            className={`img_PipeByCone ${isScaledImg ? "scaleImg" : ""}`}
            ref={imgRef}
            onClick={handleClickImg}
          />
        </div>
        <div className="input_output">
          <span>INPUT(mm)</span>
          <span>OUTPUT</span>
        </div>
        <div className="data_PipeByCone">
          <div className="input_data">
            <div style={{ display: "flex" }}>
              <div className="floating_content" style={{ marginTop: 3 }}>
                <input type="text" className="floating_input" placeholder=" " required onChange={handleDiam1Change} />
                <label className="floating_label">Diameter 1</label>
              </div>
              <div className="floating_content" style={{ marginTop: 3 }}>
                <input
                  type="text"
                  className="floating_input"
                  placeholder=" "
                  required
                  onChange={handleLength2Change}
                  style={{ width: 115 }}
                />
                <label className="floating_label">Length 2</label>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="floating_content">
                <input type="text" className="floating_input" placeholder=" " required onChange={handleDiam2Change} />
                <label className="floating_label">Diameter 2</label>
              </div>
              <div className="floating_content">
                <input
                  type="text"
                  className="floating_input"
                  placeholder=" "
                  required
                  onChange={handleLength3Change}
                  style={{ width: 115 }}
                />
                <label className="floating_label">Length 3</label>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="floating_content">
                <input type="text" className="floating_input" placeholder=" " required onChange={handleDiam3Change} />
                <label className="floating_label">Diameter 3</label>
              </div>
              <div className="floating_content">
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
                <input type="text" className="floating_input" placeholder=" " required onChange={handleLength1Change} />
                <label className="floating_label">Length 1</label>
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
          </div>
          <div className="output_data">
            <div className="floating_content" style={{ marginTop: 3, width: 115 }}>
              <input
                type="text"
                className="floating_input"
                placeholder=" "
                readOnly
                value={
                  diam1 === "" || length1 === ""
                    ? ""
                    : (diam1 * Math.PI).toFixed(0) +
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
                  diam1 === "" || length1 === "" || thickness === "" || material === "---"
                    ? ""
                    : (
                        0.000001 *
                        density *
                        thickness *
                        ((diam1 * Math.PI) / 1000) *
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
                  diam1 === "" || length1 === "" || thickness === "" || material === "---"
                    ? ""
                    : (
                        ((0.000001 *
                          density *
                          thickness *
                          ((diam1 * Math.PI) / 1000) *
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
          <button className="geometryToCart">Add plate to cart</button>
        </div>
      </div>
    </div>
  );
};

export default PipeByCone;
