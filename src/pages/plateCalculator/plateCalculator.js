import { useState, useEffect } from "react";
import "./plateCalculator.css";

import PipeByPlane from "../../components/flatteningCalculator/pipeByPlane";
import PipeByPipe from "../../components/flatteningCalculator/pipeByPipe";
import PipeByCone from "../../components/flatteningCalculator/pipeByCone";
import ConcentricFrustum from "../../components/flatteningCalculator/concentricFrustum";
import EccentricFrustum from "../../components/flatteningCalculator/eccentricFrustum";
import RectToRound from "../../components/flatteningCalculator/rectToRound";
import CustomShape from "../../components/flatteningCalculator/customShape";

const PlateCalculator = () => {
  const [pageNo, setPageNo] = useState();
  const [currentComponent, setCurrentComponent] = useState(0);

  useEffect(() => {
    setPageNo(currentComponent);
  }, [currentComponent]);

  const components = [
    <PipeByPlane />,
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
    <div className="card_container">
      <div>
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
  );
};

export default PlateCalculator;
