import Query from "@arcgis/core/rest/support/Query";
import { useEffect, useState } from "react";
import { LINE_PROJECTS_LAYER, POINT_PROJECTS_LAYER } from "../consts/projects";
import {
  Project,
  ProjectLevel1Category,
  ProjectLevel2Category,
  ProjectSummaryScore,
  ProjectType,
} from "../types/Project";
import Graphic from "@arcgis/core/Graphic";

const projectTypeLookup: { [key: string]: ProjectType } = {
  "A&C": ProjectType.ArterialCollector,
  Bridge: ProjectType.Other,
  "P&B": ProjectType.BikePedestrian,
};

const projectType = (type: string): ProjectType => {
  if (projectTypeLookup[type]) return projectTypeLookup[type];
  return ProjectType.Other;
};

const makeProject = (feature: Graphic, id: number): Project | null => {
  if (!feature?.attributes) {
    return null;
  };

  const attributes = feature.attributes;
  const type: ProjectType = projectType(attributes?.PrjType || "");

  const scores: ProjectSummaryScore[] = [
    {
      label: ProjectLevel1Category.Safe,
      value: (attributes?.Safe_Score as number) || 0,
      details: [
        {
          label: ProjectLevel2Category.VehicularCrashes,
          value: (attributes?.Safe_0 as number) || 0,
        },
        {
          label: ProjectLevel2Category.BikePedCrashes,
          value: (attributes?.Safe_1 as number) || 0,
        },
        {
          label: ProjectLevel2Category.DecreaseInBikeCrash,
          value: (attributes?.Safe_2 as number) || 0,
        },
        {
          label: ProjectLevel2Category.AtGradeRailCrossings,
          value: (attributes?.Safe_3 as number) || 0,
        },
      ],
    },
    {
      label: ProjectLevel1Category.Clean,
      value: (attributes?.Clean_Score as number) || 0,
      details: [
        {
          label: ProjectLevel2Category.SidewalkNetwork,
          value: (attributes?.Clean_0 as number) || 0,
        },
        {
          label: ProjectLevel2Category.BikeNetwork,
          value: (attributes?.Clean_1 as number) || 0,
        },
        {
          label: ProjectLevel2Category.DecreaseInPollutants,
          value: (attributes?.Clean_2 as number) || 0,
        },
        {
          label: ProjectLevel2Category.DecreaseInHeatExposure,
          value: (attributes?.Clean_3 as number) || 0,
        },
      ],
    },
    {
      label: ProjectLevel1Category.Efficient,
      value: (attributes?.Efficient_Score as number) || 0,
      details: [
        {
          label: ProjectLevel2Category.DecreaseInTraffic,
          value: (attributes?.Efficient_0 as number) || 0,
        },
        {
          label: ProjectLevel2Category.DecreaseInTravelTime,
          value: (attributes?.Efficient_1 as number) || 0,
        },
        {
          label: ProjectLevel2Category.DecreaseInTruckVolume,
          value: (attributes?.Efficient_2 as number) || 0,
        },
        {
          label: ProjectLevel2Category.IncreaseInTravelLanes,
          value: (attributes?.Efficient_3 as number) || 0,
        },
      ],
    },
    {
      label: ProjectLevel1Category.Connected,
      value: (attributes?.Connected_Score as number) || 0,
      details: [
        {
          label: ProjectLevel2Category.AccessToTransit,
          value: (attributes?.Connected_0 as number) || 0,
        },
        {
          label: ProjectLevel2Category.AccessToParks,
          value: (attributes?.Connected_1 as number) || 0,
        },
        {
          label: ProjectLevel2Category.OverlapWithSmartCorridors,
          value: (attributes?.Connected_2 as number) || 0,
        },
        {
          label: ProjectLevel2Category.PopulationTransitDependent,
          value: (attributes?.Connected_3 as number) || 0,
        }
      ]
    }
  ];

  const compositeScore = Math.round(scores.reduce((acc: number, score: ProjectSummaryScore) => {
    return acc + score.value;
  }, 0) / scores.length); 

  const project: Project = {
    Id: id,
    Name: attributes?.TIPName || "",
    ProjectNumber: attributes?.TIPProject || "",
    Description: attributes?.Descriptio || "",
    ProjectType: type,
    Scores: scores,
    CompositeScore: compositeScore,
    Metrics: [],
    Shape: new Graphic({
      geometry: feature?.geometry,
    }),
  };

  return project;
}

export function useGetProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const query = new Query({
      where: "1=1",
      outFields: ["*"],
      returnGeometry: true,
    });

    let id = 0;

    const fetchProjects = async () => {
      try {
        const pointsResp = await POINT_PROJECTS_LAYER.queryFeatures(query);
        const linesResp = await LINE_PROJECTS_LAYER.queryFeatures(query);

        console.log('linesResp.features :', linesResp.features);


        const projects: Project[] = [];
        for (const feature of pointsResp?.features) {
          const project = makeProject(feature, id++);
          if (project) projects.push(project);
        }

        for (const feature of linesResp?.features) {
          const project = makeProject(feature, id++);
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
