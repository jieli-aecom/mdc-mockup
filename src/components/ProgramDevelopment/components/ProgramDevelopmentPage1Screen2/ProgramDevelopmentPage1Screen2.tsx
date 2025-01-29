import { FC, useState } from "react";
import SaveIcon from "../../../../icons/SaveIcon";
import LoadIcon from "../../../../icons/LoadIcon";
import BackIcon from "../../../../icons/BackIcon";

export interface ProgramDevelopmentPage1Screen2Props {
  handleToScreen1: () => void;
  handleToPage2: () => void;
}

const ProgramDevelopmentPage1Screen2: FC<
  ProgramDevelopmentPage1Screen2Props
> = ({ handleToScreen1, handleToPage2 }) => {
  const [hover, setHover] = useState<string>("");
  return (
    <>
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
            <BackIcon
              color={hover === "back-button" ? "white" : "#263C8C"}
            />
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
            className="program-aggregation-output"
            onMouseEnter={() => setHover("view-aggregation-output-button")}
            onMouseLeave={() => setHover("")}
            onClick={handleToPage2}
          >
            <div
              style={{
                textDecoration: "none",
                color:
                  hover === "view-aggregation-output-button"
                    ? "#263C8C"
                    : "white",
              }}
            >
              View Results
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProgramDevelopmentPage1Screen2;
