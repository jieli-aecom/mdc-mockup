import { FC, useContext, useState } from "react";
import "./ProgramDevelopmentPage2.css";
import { programDevelopmentContext } from "../../../../pages/ProgramDevelopment/ProgramDevelopment";
import ProgramDevelopmentMap from "../ProgramDevelopmentMap/ProgramDevelopmentMap";
import SaveIcon from "../../../../icons/SaveIcon";
import LoadIcon from "../../../../icons/LoadIcon";
import BackIcon from "../../../../icons/BackIcon";

export interface ProgramDevelopmentPage2Props {
  handleToPage1: () => void;
}

const ProgramDevelopmentPage2: FC<ProgramDevelopmentPage2Props> = ({
  handleToPage1,
}) => {
  const { mapGraphics } = useContext(programDevelopmentContext);
  const [hover, setHover] = useState<string>("");
  return (
    <>
      <div
        className="project-manage-container"
        style={{ width: "70%", minWidth: "300px" }}
      >
        <p className="project-manage-title">Program Development</p>
        <div className="page-comment">
          Select multiple projects to evaluate their impacts
        </div>
        <div className="program-development-actions">
          <button
            className="mdc-btn-main"
            onMouseEnter={() => setHover("back-button")}
            onMouseLeave={() => setHover("")}
            onClick={handleToPage1}
          >
            <BackIcon color={hover === "back-button" ? "#263C8C" : "white"} />
            <div
              style={{
                textDecoration: "none",
                color: hover === "back-button" ? "#263C8C" : "white",
              }}
            >
              View Aggregation Output
            </div>
          </button>
          <button
            className="mdc-btn-export"
            onMouseEnter={() => setHover("load-button")}
            onMouseLeave={() => setHover("")}
          >
            <LoadIcon
              strokeColor={hover === "load-button" ? "white" : "#263C8C"}
            />
            <div
              style={{
                textDecoration: "none",
                color: hover === "load-button" ? "white" : "#263C8C",
              }}
            >
              Export
            </div>
          </button>
        </div>
      </div>
      <ProgramDevelopmentMap />
    </>
  );
};

export default ProgramDevelopmentPage2;
