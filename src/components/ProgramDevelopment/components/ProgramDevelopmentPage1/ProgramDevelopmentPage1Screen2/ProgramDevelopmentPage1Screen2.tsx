import { FC, useContext, useState } from "react";
import SaveIcon from "../../../../../icons/SaveIcon";
import LoadIcon from "../../../../../icons/LoadIcon";
import BackIcon from "../../../../../icons/BackIcon";
import { programDevelopmentContext } from "../../../hooks/useProgramDevelopmentContext";
import ProgramDevelopmentTable from "../../ProgramDevelopmentTable/ProgramDevelopmentTable";
import "./ProgramDevelopmentPage1Screen2.css";

export interface ProgramDevelopmentPage1Screen2Props {
  handleToScreen1: () => void;
  handleToPage2: () => void;
}

const ProgramDevelopmentPage1Screen2: FC<
  ProgramDevelopmentPage1Screen2Props
> = ({ handleToScreen1, handleToPage2 }) => {
  const {
    pickedProjectIds,
    selectedProjects,
    isAllPicked,
    unpickAllSelectedProjects,
    pickAllSelectedProjects,
    togglePickProject,
  } = useContext(programDevelopmentContext);

  const [hover, setHover] = useState<string>("");

  const noPicked = pickedProjectIds.size === 0;

  const toPage2 = () => {
    if (!noPicked) handleToPage2();
  }

  return (
    <>
      <div className="score-board-title-blue">
        <span>Step 3. View Aggregation Outputs</span>
        {pickedProjectIds.size && <span>{pickedProjectIds.size}</span>}
      </div>
      <div className="program-development-select">
        <ProgramDevelopmentTable
          projects={selectedProjects}
          selectedIds={pickedProjectIds}
          isAllSelected={isAllPicked}
          handleUnselectAll={unpickAllSelectedProjects}
          handleSelectAll={pickAllSelectedProjects}
          handleSelect={togglePickProject}
        />
      </div>
      <div className="program-development-actions">
        <div className="program-development-actions-io">
          <button
            className="mdc-btn-export"
            onMouseEnter={() => setHover("save-button")}
            onMouseLeave={() => setHover("")}
          >
            <SaveIcon
              strokeColor={hover === "save-button" ? "white" : "#263C8C"}
            />
            <div
              style={{
                textDecoration: "none",
                color: hover === "save-button" ? "white" : "#263C8C",
              }}
            >
              Save
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
              Load
            </div>
          </button>
        </div>

        <div className="program-development-actions-io">
          <button
            className="mdc-btn-export"
            onMouseEnter={() => setHover("back-button")}
            onMouseLeave={() => setHover("")}
            onClick={handleToScreen1}
          >
            <BackIcon color={hover === "back-button" ? "white" : "#263C8C"} />
            <div
              style={{
                textDecoration: "none",
                color: hover === "back-button" ? "white" : "#263C8C",
              }}
            >
              Back
            </div>
          </button>
          <button
            className={noPicked ? "mdc-btn-main mdc-btn-main-disabled" : "mdc-btn-main"}
            onMouseEnter={() => setHover("view-aggregation-output-button")}
            onMouseLeave={() => setHover("")}
            onClick={toPage2}
          >
            <div>View Results</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProgramDevelopmentPage1Screen2;
