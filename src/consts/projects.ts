import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { ProjectType } from "../types/Project";
import {
  LINE_PROJECTS_LAYER_URL,
  POINT_PROJECTS_LAYER_URL,
} from "./service-urls";

export const POINT_PROJECTS_LAYER = new FeatureLayer({
  id: "Point Projects",
  url: POINT_PROJECTS_LAYER_URL,
  outFields: ["*"],
  popupEnabled: true,
});

export const LINE_PROJECTS_LAYER = new FeatureLayer({
  id: "Line Projects 2",
  url: LINE_PROJECTS_LAYER_URL,
  outFields: ["*"],
  popupEnabled: true,
});

export const PROJECT_TYPES: ProjectType[] = [
  ProjectType.Bike,
  ProjectType.Pedestrian,
  ProjectType.Roadway,
  ProjectType.Transit,
  ProjectType.Freight,
];
