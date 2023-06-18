import "./plateCalculator.css";
import { auth } from "../../firebase";
import PipeByPlane from "../../components/flatteningCalculator/pipeByPlane";
import PipeByPipe from "../../components/flatteningCalculator/pipeByPipe";
import PipeByCone from "../../components/flatteningCalculator/pipeByCone";
import ConcentricFrustum from "../../components/flatteningCalculator/concentricFrustum";
import EccentricFrustum from "../../components/flatteningCalculator/eccentricFrustum";
import RectToRound from "../../components/flatteningCalculator/rectToRound";
import CustomShape from "../../components/flatteningCalculator/customShape";
import { useState, useEffect, useContext } from "react";
import ReactModal from "react-modal";
import Typewriter from "typewriter-effect";
import { MyContext } from "../../App";

const PlateCalculator = () => {
  const [pageNo, setPageNo] = useState();
  const [currentComponent, setCurrentComponent] = useState(0);
  const [showModal, setShowModal] = useState(true);

  const { modalIsOpen } = useContext(MyContext);

  const loggedUserID = auth.currentUser?.uid || "";

  window.addEventListener("beforeunload", () => {
    if (localStorage.getItem("isUserLogged")) {
      localStorage.setItem("loggedUserIDafterRefresh", true);
    }
  }); // logic added to keep showing the page if user is logged after refresh

  useEffect(() => {
    if (loggedUserID) {
      setShowModal(false);
      localStorage.setItem("isUserLogged", true);
    } else {
      setShowModal(true);
    }
  }, [loggedUserID]); // if user logged in, show the shape calculator page, otherwise display a modal message

  useEffect(() => {
    setPageNo(currentComponent);
  }, [currentComponent]); // set shapes page number

  const components = [
    <PipeByPlane modalStatus={showModal} />,
    <PipeByPipe />,
    <PipeByCone />,
    <ConcentricFrustum />,
    <EccentricFrustum />,
    <RectToRound />,
    <CustomShape />,
  ];

  const handlePrev = () => {
    setCurrentComponent((currentComponent - 1) % components.length);
  };

  const handleNext = () => {
    setCurrentComponent((currentComponent + 1) % components.length);
  };

  return (
    <>
      <div>
        <ReactModal
          isOpen={modalIsOpen || loggedUserID || localStorage.getItem("loggedUserIDafterRefresh") ? false : true}
          className="modal_container"
          ariaHideApp={false}
        >
          <div className="modal_content">
            <Typewriter
              onInit={(typewriter) => {
                typewriter.pauseFor(250).typeString(`You must be a signed in user to access this page.`).start();
              }}
              options={{
                delay: 30,
                cursor: "",
              }}
            />
          </div>
        </ReactModal>
      </div>
      {}
      <div className="card_container" style={{ display: modalIsOpen || showModal ? "none" : "flex" }}>
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
