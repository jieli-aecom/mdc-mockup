import Geometry from "@arcgis/core/geometry/Geometry";
import { CommissionDistrict } from "./District";

export enum ProjectType {
  Bike = "Bike",
  Pedestrian = "Pedestrian",
  Roadway = "Roadway",
  Transit = "Transit",
  Freight = "Freight",
}

export type ProjectLocationScores = {
  Location: number;
  ConnectToExisting: number;
  Metrobus: number;
  Transit: number;
  ServiceArea: number;
  EquityArea: number;
  Resiliency: number;
  LandUse: number;
  PopDensity: number;
  EmpDensity: number;
  TravelTime: number;
  Safety: number;
};

export type ProjectBenefitScores = {
  Benefit: number;
  Social: number;
  Environmental: number;
  Economic: number;
};

export type Project = {
  Id: string;
  Type: ProjectType;
  Location: string;
  CommissionDistricts: CommissionDistrict[];
  LocationScores: ProjectLocationScores;
  BenefitScores: ProjectBenefitScores;
  CompositeScore: number;
  IsLine: boolean;
  Geometry: Geometry;
};
