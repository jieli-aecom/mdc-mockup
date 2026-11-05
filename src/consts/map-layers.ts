import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import {
  COMMISSION_DISTRICTS_URL,
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

export const COMMISSION_DISTRICTS_LAYER = new FeatureLayer({
  id: "Commission Districts",
  url: COMMISSION_DISTRICTS_URL,
  renderer: new SimpleRenderer({
    symbol: new SimpleFillSymbol({
      color: [0, 0, 0, 0],
      outline: { color: "#666666", width: "1px" },
    }),
  }),
  outFields: ["*"],
  popupEnabled: true,
  popupTemplate: {
    title: "Commission District",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "COMMNAME",
            label: "District",
          },
        ],
      },
    ],
  },
});
