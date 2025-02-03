import { Project } from "../../../types/Project";
import { TableConfiguration } from "../ProjectPrioritizationTable/ProjectPrioritizationTable";

export const generalTableConfig: TableConfiguration = [
  {
    label: "Name",
    value: (project: Project) => project.Location,
    display: (project: Project) => project.Location,
    width: "40%",
    align: "left",
  },
  {
    label: "Composite Score",
    value: (project: Project) => project.CompositeScore,
    display: (project: Project) =>
      project.CompositeScore.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "20%",
  },
  {
    label: "Location Score",
    value: (project: Project) => project.LocationScores.Location,
    display: (project: Project) =>
      project.LocationScores.Location.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "20%",
  },
  {
    label: "Benefit Score",
    value: (project: Project) => project.BenefitScores.Benefit,
    display: (project: Project) =>
      project.BenefitScores.Benefit.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "20%",
  },
];
