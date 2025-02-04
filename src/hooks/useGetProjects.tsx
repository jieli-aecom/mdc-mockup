import Query from "@arcgis/core/rest/support/Query";
import { useEffect, useState } from "react";
import {
  LINE_PROJECTS_LAYER,
  POINT_PROJECTS_LAYER,
} from "../consts/map-layers";
import {
  Project,
  ProjectBenefitScores,
  ProjectLocationScores,
  ProjectType,
} from "../types/Project";
import Graphic from "@arcgis/core/Graphic";
import { CommissionDistrict } from "../types/District";
import Geometry from "@arcgis/core/geometry/Geometry";
import { COMMISSION_DISTRICTS } from "../consts/districts";


const projectTypeLookup2: { [key: string]: ProjectType } = {
  Bike: ProjectType.Bike,
  Pedestrian: ProjectType.Pedestrian,
  Roadway: ProjectType.Roadway,
  Transit: ProjectType.Transit,
  Freight: ProjectType.Freight,
};

const projectType2 = (type: string): ProjectType => {
  if (!projectTypeLookup2.hasOwnProperty(type)) {
    throw new Error(`Unknown project type: ${type}`);
  }
  return projectTypeLookup2[type];
};


export const makeProject = (feature: Graphic) => {
  if (
    !feature?.attributes ||
    !feature?.attributes?.GlobalID ||
    (!feature?.attributes?.Location && !feature?.attributes?.LOCATION) ||
    !feature?.attributes?.Type ||
    !feature?.geometry
  ) {
    return null;
  }

  const geometry: Geometry = feature.geometry;
  const isLine = geometry.type !== "point";

  const attributes = feature.attributes;
  const type: ProjectType = projectType2((attributes?.Type as string).trim());

  const locationScores: ProjectLocationScores = {
    Location: attributes?.TotalScore / 11 || 0,
    ConnectToExisting: attributes?.Existing || 0,
    Metrobus: attributes?.Metrobus || 0,
    Transit: attributes?.TransitStation || 0,
    ServiceArea: attributes?.ServiceArea || 0,
    EquityArea: attributes?.Equity || 0,
    Resiliency: attributes?.Resiliency || 0,
    LandUse: attributes?.LandUse || 0,
    PopDensity: attributes?.PopDensity || 0,
    EmpDensity: attributes?.EmployDensity || 0,
    TravelTime: attributes?.TravelTime || 0,
    Safety: attributes?.Safety || 0,
  };

  const benefitScores: ProjectBenefitScores = {
    Benefit: attributes?.TotalBenefitScore / 3 || 0,
    Social: attributes?.BenefitSocial || 0,
    Environmental: attributes?.BenefitEnvironmental || 0,
    Economic: attributes?.BenefitEconomic || 0,
  };

  const compositeScore = (locationScores.Location + benefitScores.Benefit) / 2;

  const commissionDistricts: CommissionDistrict[] =
    attributes?.CommissionDistrict
      ? (attributes?.CommissionDistrict as string)
          .split(/[,&]/)
          .filter((d) => COMMISSION_DISTRICTS.includes(d.trim() as CommissionDistrict))
          .map((d: string) => d.trim() as CommissionDistrict)
      : [];

  const project: Project = {
    Id: attributes?.GlobalID as string,
    Type: type,
    Location: attributes?.Location || attributes?.LOCATION || "",
    CommissionDistricts: commissionDistricts,
    LocationScores: locationScores,
    BenefitScores: benefitScores,
    CompositeScore: compositeScore,
    IsLine: isLine,
    Geometry: geometry,
  };

  return project;
};

export function useGetProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const query = new Query({
      where: "1=1",
      outFields: ["*"],
      returnGeometry: true,
    });

    const fetchProjects = async () => {
      try {

        const pointsResp = await POINT_PROJECTS_LAYER.queryFeatures(query);
        const linesResp = await LINE_PROJECTS_LAYER.queryFeatures(query);

        const projects: Project[] = [];
        for (const feature of pointsResp?.features) {
          const project = makeProject(feature);
          if (project) projects.push(project);
        }

        for (const feature of linesResp?.features) {
          const project = makeProject(feature);
          if (project) projects.push(project);
        }
        setProjects(projects);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return { projects };
}
