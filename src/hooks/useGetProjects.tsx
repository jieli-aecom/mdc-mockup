import Query from "@arcgis/core/rest/support/Query";
import { useEffect, useState } from "react";
import {
  LINE_PROJECTS_LAYER,
  POINT_PROJECTS_LAYER,
} from "../consts/projects";
import {
  Project,
  ProjectBenefitScores,
  ProjectLocationScores,
  ProjectType,
} from "../types/Project";
import Graphic from "@arcgis/core/Graphic";
import { CommissionDistrict } from "../types/District";
import Geometry from "@arcgis/core/geometry/Geometry";


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


export const makeProject2 = (feature: Graphic) => {
  if (
    !feature?.attributes ||
    !feature?.attributes?.GlobalID ||
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
    Location: attributes?.TotalScore || 0,
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
    Benefit: attributes?.TotalBenefitScore || 0,
    Social: attributes?.BenefitSocial || 0,
    Environmental: attributes?.BenefitEnvironmental || 0,
    Economic: attributes?.BenefitEconomic || 0,
  };

  const commissionDistricts: CommissionDistrict[] =
    attributes?.CommissionDistrict
      ? (attributes?.CommissionDistrict as string)
          .split(",")
          .map((d: string) => d.trim() as CommissionDistrict)
      : [];

  const project: Project = {
    Id: attributes?.GlobalID as string,
    Type: type,
    Location: attributes?.Location || attributes?.LOCATION || "",
    CommissionDistricts: commissionDistricts,
    LocationScores: locationScores,
    BenefitScores: benefitScores,
    CompositeScore: (locationScores.Location + benefitScores.Benefit) / 2,
    IsLine: isLine,
    Geometry: geometry,
  };

  return project;
};

export function useGetProjects() {
  const [projects2, setProjects2] = useState<Project[]>([]);

  useEffect(() => {
    const query = new Query({
      where: "1=1",
      outFields: ["*"],
      returnGeometry: true,
    });

    let id = 0;

    const fetchProjects = async () => {
      try {

        const pointsResp2 = await POINT_PROJECTS_LAYER.queryFeatures(query);
        const linesResp2 = await LINE_PROJECTS_LAYER.queryFeatures(query);

        const projects2: Project[] = [];
        for (const feature of pointsResp2?.features) {
          const project2 = makeProject2(feature);
          if (project2) projects2.push(project2);
        }

        for (const feature of linesResp2?.features) {
          const project2 = makeProject2(feature);
          if (project2) projects2.push(project2);
        }
        setProjects2(projects2);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return { projects2 };
}
