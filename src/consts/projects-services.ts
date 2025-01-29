import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export const POINT_PROJECTS_LAYER =
  "https://services7.arcgis.com/wGTEYtsrVhoPXek1/arcgis/rest/services/Miami_Mock_Map_WFL1/FeatureServer/0";
export const LINE_PROJECTS_LAYER =
  "https://services7.arcgis.com/wGTEYtsrVhoPXek1/arcgis/rest/services/Miami_Mock_Map_WFL1/FeatureServer/1";

export const pointProjectsLayer = new FeatureLayer({
  id: "Point Projects",
  url: POINT_PROJECTS_LAYER,
  outFields: ["*"],
  popupEnabled: true,
});

export const lineProjectsLayer = new FeatureLayer({
  id: "Line Projects",
  url: LINE_PROJECTS_LAYER,
  outFields: ["*"],
  popupEnabled: true,
});
