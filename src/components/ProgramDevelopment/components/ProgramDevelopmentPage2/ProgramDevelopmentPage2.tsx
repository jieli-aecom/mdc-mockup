import { FC, useContext, useState } from "react";
import "./ProgramDevelopmentPage2.css";
import { programDevelopmentContext } from "../../../../pages/ProgramDevelopment/ProgramDevelopment";
import ProgramDevelopmentMap from "../ProgramDevelopmentMap/ProgramDevelopmentMap";
import LoadIcon from "../../../../icons/LoadIcon";
import BackIcon from "../../../../icons/BackIcon";
import PlusIcon from "../../../../icons/PlusIcon";
import MinusIcon from "../../../../icons/MinusIcon";
import ExpansionPanel from "../../../ExpansionPanel/ExpansionPanel";

export interface ProgramDevelopmentPage2Props {
  handleToPage1: () => void;
}

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
//#endregion

const ProgramDevelopmentPage2: FC<ProgramDevelopmentPage2Props> = ({
  handleToPage1,
}) => {
  const { pickedProjects } = useContext(programDevelopmentContext);
  return (
    <>
      <div
        className="project-manage-container program-development-page2-container"
        style={{ width: "70%", minWidth: "300px"}}
      >
        <TitleSection handleToPage1={handleToPage1} />
        <ExpansionPanel
          title="Selected Projects"
          children={<MinusIcon />}
          defaultExpanded={true}
        />
      </div>
      <ProgramDevelopmentMap />
    </>
  );
};

export default ProgramDevelopmentPage2;
