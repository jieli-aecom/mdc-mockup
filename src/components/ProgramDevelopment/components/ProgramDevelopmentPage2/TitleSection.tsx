import { FC, useState } from "react";
import BackIcon from "../../../../icons/BackIcon";
import LoadIcon from "../../../../icons/LoadIcon";

interface TitleSectionProps {
  handleToPage1: () => void;
}

//#region  Title
const TitleSection: FC<TitleSectionProps> = ({ handleToPage1 }) => {
  const [hover, setHover] = useState<string>("");

  return (
    <div>
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
            Modify Aggrigation
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
  );
};

export default TitleSection;