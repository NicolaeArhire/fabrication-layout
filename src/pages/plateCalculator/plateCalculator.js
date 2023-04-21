import "./plateCalculator.css";
import PipeByPlane from "../../components/flatteningCalculator/pipeByPlane";
import PipeByPipe from "../../components/flatteningCalculator/pipeByPipe";
import PipeByCone from "../../components/flatteningCalculator/pipeByCone";
import ConcentricFrustum from "../../components/flatteningCalculator/concentricFrustum";
import EccentricFrustum from "../../components/flatteningCalculator/eccentricFrustum";
import RectToRound from "../../components/flatteningCalculator/rectToRound";
import CustomShape from "../../components/flatteningCalculator/customShape";
import { useState, useEffect } from "react";
import ReactModal from "react-modal";

const PlateCalculator = () => {
  const [pageNo, setPageNo] = useState();
  const [currentComponent, setCurrentComponent] = useState(0);
  const [token, setToken] = useState("");
  const [wrongToken, setWrongToken] = useState("");
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setPageNo(currentComponent);
  }, [currentComponent]);

  const components = [
    <PipeByPlane modalStatus={showModal} />,
    <PipeByPipe />,
    <PipeByCone />,
    <ConcentricFrustum />,
    <EccentricFrustum />,
    <RectToRound />,
    <CustomShape />,
  ];

  const handleTokenChange = (e) => {
    setToken(e.target.value);
    if (e.target.value === "") setWrongToken("");
  };

  const handleCloseModal = () => {
    token === "1234" ? setShowModal(false) : setWrongToken("Please try again.");
  };

  const handlePrev = () => {
    setCurrentComponent((currentComponent - 1) % components.length);
  };

  const handleNext = () => {
    setCurrentComponent((currentComponent + 1) % components.length);
  };

  return (
    <>
      <div>
        <ReactModal isOpen={showModal} onRequestClose={handleCloseModal} className="modal_container" ariaHideApp={false}>
          <div className="modal_content">
            <span>Complete your access token to use this page.</span>
            <input type="password" placeholder="Token..." onChange={handleTokenChange} />
            <span>{wrongToken}</span>
            <button onClick={handleCloseModal}>Continue</button>
            <span>Don't have a token yet?</span>
            <span>
              Ask for one at <u>nicolae.arhire10@gmail.com</u>
            </span>
          </div>
        </ReactModal>
      </div>
      {}
      <div className="card_container">
        <div className="calculator_container">
          <div className="flatten_container">{components[currentComponent]}</div>
          <div className="pagination">
            <button onClick={handlePrev} disabled={currentComponent === 0} className="prev_button">
              Previous Geometry
            </button>
            <span className="page_no">
              {pageNo + 1}/{components.length}
            </span>
            <button onClick={handleNext} disabled={currentComponent === components.length - 1} className="next_button">
              Next Geometry
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlateCalculator;
