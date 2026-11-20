import type { MapPoint } from "../../mockData/geography";

export const scoreColors = {
  SAFE: "#3fbf3f", CLEAN: "#39bfcf", EFFICIENT: "#65c78b",
  CONNECTED: "#b9e769", SOCIAL: "#ec4c56", ECONOMY: "#ed8e46",
};
export type ScoreName = keyof typeof scoreColors;

interface ProjectRecord {
  name: string;
  type: string;
  number?: string;
  status?: string;
  description: string;
  geometry: MapPoint[];
  illustrative?: boolean;
  scores?: Record<ScoreName, number>;
  details?: Partial<Record<ScoreName, Record<string, number>>>;
}

// Underline and Ludlam use the Line_Projects layer in the workspace geodatabase.
// Their WGS84 footprints are simplified and their source scores are rounded for display.
export const projectRecords: ProjectRecord[] = [
  {
    name: "Downtown Miami (Micromobility)", number: "PW0001165", type: "Arterial/Collector Road", status: "Under construction",
    description: "Resurfacing (N/S Miami Avenue, NE/SE 1 Avenue, NW/NE 6 Street, NW/NE 5 Street). Prior Years' Funding as follows: $1,700,000 for CST.",
    geometry: [[-80.19346, 25.77928], [-80.19345, 25.77999], [-80.19219, 25.78001], [-80.19218, 25.77934], [-80.19346, 25.77928]],
    illustrative: true,
    scores: { SAFE: 95, CLEAN: 75, EFFICIENT: 65, CONNECTED: 85, SOCIAL: 76, ECONOMY: 85 },
    details: {
      SAFE: { "Vehicular crashes": 385, "Bike/ped crashes": 25, "Decrease in bike crash": 75, "At-grade rail crossings": 2 },
      CLEAN: { "Sidewalk network": 1.4, "Bike network": 1.2, "Decrease in pollutants": 14, "Decrease in heat exposure": 14 },
      EFFICIENT: { "Decrease in traffic": 14, "Decrease in travel time": 16, "Decrease in truck volume": 10, "Increase in travel lanes": 0 },
      CONNECTED: { "Access to transit": 14, "Access to parks": 16, "Overlap with SMART corridors": 14, "Population transit dependent": 25 },
    },
  },
  {
    name: "SouthCom Pedestrian Bridge", type: "Pedestrian bridge",
    description: "Pedestrian access in Doral.", geometry: [[-80.3420, 25.8115]], illustrative: true,
  },
  {
    name: "Underline", type: "Pedestrian/bicycle improvements", number: "PW0001041", status: "Under construction",
    description: "Pedestrian and bicycle improvements from Dadeland South to the Miami River. Prior years’ construction funding was $24,500,000.",
    geometry: [[-80.31319,25.68544],[-80.26607,25.7235],[-80.25873,25.72887],[-80.25767,25.73028],[-80.25473,25.73227],[-80.25271,25.73436],[-80.2089,25.75068],[-80.20116,25.75593],[-80.19746,25.75872],[-80.19566,25.76072],[-80.19558,25.76839]],
    scores: { SAFE: 48, CLEAN: 49, EFFICIENT: 58, CONNECTED: 52, SOCIAL: 51, ECONOMY: 31 },
  },
  {
    name: "Ludlam Bikepath", type: "Bikepath", number: "PW000963",
    description: "Bikepath from Dadeland North to NW 7 Street. Prior years’ funding included $10,252,000 for right-of-way and $1,548,000 for preliminary engineering.",
    geometry: [[-80.30708,25.69144],[-80.3065,25.69561],[-80.30829,25.78298]],
    scores: { SAFE: 35, CLEAN: 40, EFFICIENT: 54, CONNECTED: 46, SOCIAL: 67, ECONOMY: 40 },
  },
  {
    name: "Mast Arm Upgrades", type: "Traffic signal improvement",
    description: "Intersection signal support upgrades.", geometry: [[-80.3254, 25.7814]], illustrative: true,
  },
];
