export const MAP_API_KEY =
  "AAPKeb28cfbec1f14f1cb4be69d112e05144j88PtflG97gYy764VKLnY7yN6cMAjP5tTiqlC84vmi_nR-oVfq0g17HQJ42EIz5w";

export const HEADER_NAV_LINKS = [
  "/",
  "/project-prioritization",
  "/program-development",
  "/performance-tracking",
  "/resources",
];

export const HEADER_NAV_NAMES = [
  "HOME",
  "PROJECT PRIORITIZATION",
  "PROGRAM DEVELOPMENT",
  "PERFORMANCE TRACKING",
  "RESOURCES",
];

export const DEFAULT_SPATIAL_REF = { wkid: 3857 };
export const DEFAULT_MAP_CENTRAL_POINT = [
  -99.13168096993665, 31.503809189893104,
];
export const WEIGHTS_DEFAULT_VALUES = {
  pavement: 11,
  bridge: 11,
  safety: 28,
  congestion: 22,
  economic: 11,
  connectivity: 17,
};

export const ROADWAY_CLASSIFICATIONS = [
  { label: "IH", value: "IH" },
  { label: "US", value: "US" },
  { label: "SH", value: "SH" },
  { label: "FM", value: "FM" },
  { label: "RM", value: "RM" },
  { label: "OTHERS", value: "OTHERS" },
];

export const CUSTOM_OPTIONS = [
  { label: "No Filter", value: -1 },
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];

export const mode = ["Statewide", "District", "MPO"];

export const RENDERER_HIGHLIGHT = {
  type: "simple",
  symbol: {
    type: "simple-line",
    width: 5,
    color: "#E09231",
  },
};

export const RENDERER_BACKGROUND = {
  type: "simple",
  symbol: {
    type: "simple-line",
    width: 1.5,
    color: "#d3d3d3",
  },
};

export const DROPDOWN_LIST = [
  {
    label: "Overall",
    value: "Overall",
    img_url: "/assets/svg/Icon_Overall.svg",
  },
  {
    label: "Pavement",
    value: "Pavement",
    img_url: "/assets/svg/Pavement.svg",
  },
  {
    label: "Bridge",
    value: "Bridge",
    img_url: "/assets/svg/Bridge.svg",
  },
  {
    label: "Mobility",
    value: "Mobility",
    img_url: "/assets/svg/Congestion.svg",
  },
  {
    label: "Safety",
    value: "Safety",
    img_url: "/assets/svg/Safety.svg",
  },
  {
    label: "Freight",
    value: "Freight",
    img_url: "/assets/svg/Economic.svg",
  },
];

export const RENDERER_HIGHLIGHT_MARKER = {
  type: "simple",
  symbol: {
    type: "simple-marker",
    style: "circle",
    color: "#14375A",
    size: "7px",
    outline: {
      color: "#14375A",
      width: 1,
    },
  },
};

export const DATA_URL =
  "https://services7.arcgis.com/wGTEYtsrVhoPXek1/ArcGIS/rest/services/MDC___Transit_Time_WFL1/FeatureServer/1/query?where=1%3D1&outFields=*&returnGeometry=true&f=json";
