import { FC, useContext, useEffect } from "react";
import "./ProgramDevelopmentPage2.css";
import { programDevelopmentContext } from "../../../../pages/ProgramDevelopment/ProgramDevelopment";
import ProgramDevelopmentMap from "../ProgramDevelopmentMap/ProgramDevelopmentMap";
import ExpansionPanel from "../../../ExpansionPanel/ExpansionPanel";
import TitleSection from "./TitleSection";
import {
  aggregateByType,
  aggregateByCommissionDistrict,
  aggregateByPolicyAlignment,
} from "./aggregate";
import ProgramDevelopmentAggTable, {
  ProgramDevelopmentAggTableFieldConfigs,
} from "./ProgramDevelopmentAggTable/ProgramDevelopmentTypeAggTable";

const countAndAvgScoreFieldConfigs: ProgramDevelopmentAggTableFieldConfigs = {
  Name: {
    label: "Name",
    width: "50%",
  },
  Field1: {
    label: "Total Count",
    width: "25%",
  },
  Field2: {
    label: "Average Composite Score",
    width: "25%",
  },
};

const alignmentFieldConfigs: ProgramDevelopmentAggTableFieldConfigs = {
  Name: {
    label: "Name",
    width: "50%",
  },
  Field1: {
    label: "Alignment",
    width: "50%",
  },
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
  const alignmentAggData = aggregateByPolicyAlignment(pickedProjects);

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
              configs={countAndAvgScoreFieldConfigs}
            />
          </ExpansionPanel>
          <ExpansionPanel title="Commission Districts" defaultExpanded={false}>
            <ProgramDevelopmentAggTable
              data={districtAggData || []}
              configs={countAndAvgScoreFieldConfigs}
            />
          </ExpansionPanel>
          <ExpansionPanel title="Policy Alignment" defaultExpanded={false}>
            <ProgramDevelopmentAggTable
              data={alignmentAggData || []}
              configs={alignmentFieldConfigs}
            />
          </ExpansionPanel>
        </div>
      </div>

      <div className="program-development-page2-map">
        <ProgramDevelopmentMap />
      </div>
    </div>
  );
};

export default ProgramDevelopmentPage2;
