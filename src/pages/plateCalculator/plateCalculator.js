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
  const [noOfTries, setNoOfTries] = useState(1);

  useEffect(() => {
    setPageNo(currentComponent);
  }, [currentComponent]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) setShowModal(false);
  }, [token]);

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
    setNoOfTries((prev) => prev + 1);

    if (token === process.env.REACT_APP_SHAPE_CALCULATOR) {
      setShowModal(false);
      sessionStorage.setItem("token", "token");
    } else if (token === "") {
      setWrongToken("Please write something.");
    } else {
      setWrongToken(`Please try again. (${noOfTries})`);
    }
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
              Ask for one at{" "}
              <a
                href="mailto:nicolae.arhire10@gmail.com?subject=Access%20Token%20-%20Surface%20Calculator&body=Hi,%0D%0A%0D%0AI'm%20sending%20you%20this%20e-mail%20to%20request%20an%20access%20token%20for%20the%20plate%20surface%20calculator.%0D%0A%0D%0AFurthermore,%20I%20want%20to%20congratulate%20you%20for%20your%20amazing%20app%20and%20keep%20up%20the%20good%20work.%0D%0A%0D%0AHave%20a%20great%20day!"
                style={{ color: "cyan" }}
              >
                nicolae.arhire10@gmail.com
              </a>
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
              Previous
            </button>
            <span className="page_no">
              {pageNo + 1}/{components.length}
            </span>
            <button onClick={handleNext} disabled={currentComponent === components.length - 1} className="next_button">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlateCalculator;
