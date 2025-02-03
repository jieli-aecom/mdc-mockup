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

export const locationTableConfig: TableConfiguration = [
  {
    label: "Name",
    value: (project: Project) => project.Location,
    display: (project: Project) => project.Location,
    width: "20%",
    align: "left",
  },
  {
    label: "Location Score",
    value: (project: Project) => project.LocationScores.Location,
    display: (project: Project) =>
      project.LocationScores.Location.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "8.5%",
  },
  {
    label: "Connects to Existing",
    value: (project: Project) => project.LocationScores.ConnectToExisting,
    display: (project: Project) =>
      project.LocationScores.ConnectToExisting.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "6.5%",
  },
  {
    label: "Count Metrobus Routes",
    value: (project: Project) => project.LocationScores.Metrobus,
    display: (project: Project) =>
      project.LocationScores.Metrobus.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "6.5%",
  },
  {
    label: "Near Transit Station",
    value: (project: Project) => project.LocationScores.Transit,
    display: (project: Project) =>
      project.LocationScores.Transit.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "6.5%",
  },
  {
    label: "Service Area",
    value: (project: Project) => project.LocationScores.ServiceArea,
    display: (project: Project) =>
      project.LocationScores.ServiceArea.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "6.5%",
  },
  {
    label: "Equity Area",
    value: (project: Project) => project.LocationScores.EquityArea,
    display: (project: Project) =>
      project.LocationScores.EquityArea.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "6.5%",
  },
  {
    label: "Resiliency",
    value: (project: Project) => project.LocationScores.Resiliency,
    display: (project: Project) =>
      project.LocationScores.Resiliency.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "6.5%",
  },
  {
    label: "Land Use",
    value: (project: Project) => project.LocationScores.LandUse,
    display: (project: Project) =>
      project.LocationScores.LandUse.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "6.5%",
  },
  {
    label: "Population Density",
    value: (project: Project) => project.LocationScores.PopDensity,
    display: (project: Project) =>
      project.LocationScores.PopDensity.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "6.5%",
  },
  {
    label: "Employment Density",
    value: (project: Project) => project.LocationScores.EmpDensity,
    display: (project: Project) =>
      project.LocationScores.EmpDensity.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "6.5%",
  },
  {
    label: "Travel Time",
    value: (project: Project) => project.LocationScores.TravelTime,
    display: (project: Project) =>
      project.LocationScores.TravelTime.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "6.5%",
  },
  {
    label: "Safety",
    value: (project: Project) => project.LocationScores.Safety,
    display: (project: Project) =>
      project.LocationScores.Safety.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "6.5%",
  },
];

export const benefitTableConfig: TableConfiguration = [
  {
    label: "Name",
    value: (project: Project) => project.Location,
    display: (project: Project) => project.Location,
    width: "40%",
    align: "left",
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
  {
    label: "Social",
    value: (project: Project) => project.BenefitScores.Social,
    display: (project: Project) =>
      project.BenefitScores.Social.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "13%",
  },
  {
    label: "Social",
    value: (project: Project) => project.BenefitScores.Environmental,
    display: (project: Project) =>
      project.BenefitScores.Environmental.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "13%",
  },
  {
    label: "Economic",
    value: (project: Project) => project.BenefitScores.Economic,
    display: (project: Project) =>
      project.BenefitScores.Economic.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
    width: "13%",
  },
];
