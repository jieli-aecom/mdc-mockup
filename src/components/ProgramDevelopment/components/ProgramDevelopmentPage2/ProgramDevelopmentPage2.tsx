import { FC, useContext, useEffect } from "react";
import "./ProgramDevelopmentPage2.css";
import { programDevelopmentContext } from "../../../../pages/ProgramDevelopment/ProgramDevelopment";
import ProgramDevelopmentMap from "../ProgramDevelopmentMap/ProgramDevelopmentMap";
import ExpansionPanel from "../../../ExpansionPanel/ExpansionPanel";
import TitleSection from "./TitleSection";
import { aggregateByType, aggregateByCommissionDistrict } from "./aggregate";
import ProgramDevelopmentAggTable, {
  ProgramDevelopmentAggTableFieldLabels,
} from "./ProgramDevelopmentAggTable/ProgramDevelopmentTypeAggTable";

const countAndAvgScoreFieldLabels: ProgramDevelopmentAggTableFieldLabels = {
  Field1: "Total Count",
  Field2: "Average Composite Score",
};

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
    setTimeout(() => {
      triggerMapZoomSignal();
    }, 500);
  }, [triggerMapZoomSignal]);

  return (
    <div className="program-development-page2-container">
      <div className="program-development-page2-main">
        <div className="program-development-page2-header">
          <TitleSection handleToPage1={handleToPage1} />
        </div>

        <div className="program-development-page2-main-body">
          <ExpansionPanel title="Project Types" defaultExpanded={true}>
            <ProgramDevelopmentAggTable
              data={typeAggData || []}
              fieldLabels={countAndAvgScoreFieldLabels}
            />
          </ExpansionPanel>
          <ExpansionPanel title="Commission Districts" defaultExpanded={false}>
            <ProgramDevelopmentAggTable
              data={districtAggData || []}
              fieldLabels={countAndAvgScoreFieldLabels}
            />
          </ExpansionPanel>
          <ExpansionPanel
            title="Policy Alignment"
            defaultExpanded={false}
          ></ExpansionPanel>
        </div>
      </div>

      <div className="program-development-page2-map">
        <ProgramDevelopmentMap />
      </div>
    </div>
  );
};

export default ProgramDevelopmentPage2;
