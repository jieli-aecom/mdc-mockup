import { FC, useContext, useEffect } from "react";
import "./ProgramDevelopmentPage2.css";
import { programDevelopmentContext } from "../../../../pages/ProgramDevelopment/ProgramDevelopment";
import ProgramDevelopmentMap from "../ProgramDevelopmentMap/ProgramDevelopmentMap";
import ExpansionPanel from "../../../ExpansionPanel/ExpansionPanel";
import TitleSection from "./TitleSection";
import { aggregateByType, aggregateByCommissionDistrict } from "./aggregate";
import ProgramDevelopmentAggTable from "./ProgramDevelopmentAggTable/ProgramDevelopmentTypeAggTable";

export interface ProgramDevelopmentPage2Props {
  handleToPage1: () => void;
}

const ProgramDevelopmentPage2: FC<ProgramDevelopmentPage2Props> = ({
  handleToPage1,
}) => {
  const { pickedProjects, triggerMapZoomSignal } = useContext(
    programDevelopmentContext
  );
  const typeAggData = aggregateByType(pickedProjects);
  const districtAggData = aggregateByCommissionDistrict(pickedProjects);

  useEffect(() => {
    triggerMapZoomSignal();
  }, [triggerMapZoomSignal]);

  return (
    <div className="program-development-page2-container">
      <div className="program-development-page2-main">
        <TitleSection handleToPage1={handleToPage1} />
        <ExpansionPanel title="Project Types" defaultExpanded={true}>
          <ProgramDevelopmentAggTable data={typeAggData || []} />
        </ExpansionPanel>
        <ExpansionPanel
          title="Commission Districts"
          defaultExpanded={true}
        >
          <ProgramDevelopmentAggTable data={districtAggData || []} />
        </ExpansionPanel>
      </div>

      <div className="program-development-page2-map">
        <ProgramDevelopmentMap />
      </div>
    </div>
  );
};

export default ProgramDevelopmentPage2;
