import { FC, useContext, useState } from "react";
import "./ProgramDevelopmentPage2.css";
import { programDevelopmentContext } from "../../../../pages/ProgramDevelopment/ProgramDevelopment";
import ProgramDevelopmentMap from "../ProgramDevelopmentMap/ProgramDevelopmentMap";
import LoadIcon from "../../../../icons/LoadIcon";
import BackIcon from "../../../../icons/BackIcon";
import ExpansionPanel from "../../../ExpansionPanel/ExpansionPanel";
import ProgramDevelopmentTypeAggTable, {
  ProgramDevelopmentTypeAggDataRow,
} from "../ProgramDevelopmentTypeAggTable/ProgramDevelopmentTypeAggTable";
import { Project, ProjectType } from "../../../../types/Project";

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

//#region Util functions
const aggregateByType = (projects: Project[]) => {
  const countByType: Partial<Record<ProjectType, number>> = {};
  const totalScoreByType: Partial<Record<ProjectType, number>> = {};
  const avgScoreByType: Partial<Record<ProjectType, number>> = {};

  for (const project of projects) {
    const type: ProjectType = project.Type;
    countByType[type] = (countByType[type] || 0) + 1;
    totalScoreByType[type] =
      (totalScoreByType[type] || 0) + project.CompositeScore;
  }

  for (const type in countByType) {
    const projectType = type as ProjectType;
    avgScoreByType[projectType] =
      totalScoreByType[projectType]! / countByType[projectType]!;
  }

  const result: ProgramDevelopmentTypeAggDataRow[] = Object.keys(
    countByType
  ).map((type) => ({
    Name: type as ProjectType,
    TotalCount: countByType[type as ProjectType]!,
    AverageScore: avgScoreByType[type as ProjectType]!,
  }));

  return result;
};
//#endregion

const ProgramDevelopmentPage2: FC<ProgramDevelopmentPage2Props> = ({
  handleToPage1,
}) => {
  const { pickedProjects } = useContext(programDevelopmentContext);
  const typeAggData = aggregateByType(pickedProjects);

  const typeAggTable = (
    <ProgramDevelopmentTypeAggTable data={typeAggData || []} />
  );

  return (
    <div className="program-development-page2-container">
      <div
        className="program-development-page2-main"
      >
        <TitleSection handleToPage1={handleToPage1} />
        <ExpansionPanel
          title="Project Types"
          children={typeAggTable}
          defaultExpanded={true}
        />
        <ExpansionPanel
          title="Policy Alignment"
          children={null}
          defaultExpanded={false}
        />
        <ExpansionPanel
          title="Environmental Justice"
          children={null}
          defaultExpanded={false}
        />
        <ExpansionPanel
          title="Commission Districts"
          children={null}
          defaultExpanded={false}
        />
      </div>

      <div
        className="program-development-page2-map"
      >
      <ProgramDevelopmentMap /></div>
    </div>
  );
};

export default ProgramDevelopmentPage2;
