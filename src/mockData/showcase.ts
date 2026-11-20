import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PerformanceArea } from "../types/PerformanceArea";
import { ProjectType } from "../types/Project";
import { getDistricts, locationScores, MapPoint } from "./geography";

export type { MapPoint } from "./geography";
export { getDistricts } from "./geography";
export const deliveryStatuses = ["Approved", "Planning", "In Pipeline", "In Progress", "Completed"] as const;
export type DeliveryStatus = typeof deliveryStatuses[number];
export type ReviewStatus = "Created" | "Submitted" | "Approved";

export interface ProjectInputs {
  dailyUsers: number;
  routes: number;
  improvedStops: number;
  safeCrossings: number;
  signalPriority: number;
  zeroEmission: boolean;
  equityArea: boolean;
  accessible: boolean;
  trainingHours: number;
}
export const emptyInputs: ProjectInputs = {
  dailyUsers: 0, routes: 0, improvedStops: 0, safeCrossings: 0, signalPriority: 0,
  zeroEmission: false, equityArea: false, accessible: false, trainingHours: 0,
};
export const projectSubtypes: Record<ProjectType, string[]> = {
  Transit: ["Bus priority corridor", "Bus stop improvements", "Fleet electrification", "Operator training", "Service policy pilot"],
  Bike: ["Protected bikeway", "Trail connection"],
  Pedestrian: ["Safe crossings", "Sidewalk accessibility"],
  Roadway: ["Signal modernization", "Complete street"],
  Freight: ["Freight access", "Loading management"],
};
export interface PublicComment {
  author: string;
  location: string;
  text: string;
  date: string;
  point?: MapPoint;
}

// Illustrative comment sites. Named sites also locate comments saved before
// the feedback map was introduced.
const feedbackSites: Record<string, MapPoint> = {
  "Upper Eastside": [-80.1810, 25.8436],
  "Downtown": [-80.1894, 25.7827],
  "Glenvar Heights": [-80.3107, 25.7084],
  "Little Havana": [-80.2228, 25.7738],
  "Hialeah": [-80.2823, 25.8627],
  "Brownsville": [-80.2473, 25.8311],
  "Little River • NE 79th Street": [-80.1934, 25.8477],
  "Westchester • SW 24th Street": [-80.3366, 25.7472],
};
export function feedbackLocation(comment: PublicComment, footprint: MapPoint[] = []): MapPoint | undefined {
  return comment.point ?? feedbackSites[comment.location] ?? footprint[Math.floor(footprint.length / 2)];
}
export interface ProjectDraft {
  id: string;
  name: string;
  type: ProjectType;
  subtype: string;
  description: string;
  districts: string[];
  geometry: MapPoint[];
  inputs: ProjectInputs;
  reviewStatus: ReviewStatus;
  deliveryStatus: DeliveryStatus;
  comments: PublicComment[];
}
export interface DemoProject extends ProjectDraft {
  composite: number;
  location: number;
  benefit: number;
  goals: Record<PerformanceArea, number>;
  funding: string[];
  locationBreakdown: Record<string, number>;
  benefitBreakdown: Record<string, number>;
}
export interface DemoProgram {
  id: string;
  name: string;
  tags: string[];
  projectIds: string[];
  status: "Created" | "Submitted" | "Approved" | "Completed";
}
export const goalMeasures: Record<PerformanceArea, string> = {
  Safe: "Safer crossings and operator training",
  Clean: "Zero-emission and active transportation improvements",
  Efficient: "Priority signals and routes served",
  Connected: "Improved stops and accessible connections",
};

const intensity = (quantity: number, benchmark: number) => Math.max(0, Math.min(1, quantity / benchmark));
const mean = (values: number[]) => Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);

// Illustrative screening rules. Geographic factors use the existing CTMP score fields.
export function evaluateProject(draft: ProjectDraft): DemoProject {
  const i = draft.inputs;
  const activeTravel = draft.type === ProjectType.Bike || draft.type === ProjectType.Pedestrian;
  const reach = intensity(i.dailyUsers, 2200);
  const goals = {
    Safe: Math.round(100 * Math.max(intensity(i.safeCrossings, 6), intensity(i.trainingHours, 120))),
    Clean: i.zeroEmission ? 100 : activeTravel ? 80 : 0,
    Efficient: Math.round(100 * Math.max(intensity(i.signalPriority, 8), intensity(i.routes, 5))),
    Connected: Math.round(100 * Math.min(1, intensity(i.improvedStops, 8) * 0.65 + (i.accessible ? 0.5 : 0))),
  };
  const locationBreakdown = locationScores(draft.geometry);
  const location = mean(Object.values(locationBreakdown));
  const benefitBreakdown = {
    Social: Math.round(30 * reach + 0.3 * goals.Safe + 0.2 * goals.Connected + (i.equityArea ? 20 : 0)),
    Environmental: Math.round(0.65 * goals.Clean + 20 * intensity(i.routes, 3) + 15 * reach),
    Economic: Math.round(50 * reach + 0.35 * goals.Efficient + 0.15 * goals.Connected),
  };
  const benefit = mean(Object.values(benefitBreakdown));
  const funding: string[] = [];
  if (draft.type === ProjectType.Transit) funding.push("Transit capital and service improvement fund");
  if (i.safeCrossings || i.trainingHours) funding.push("Road safety improvement grants");
  if (i.zeroEmission) funding.push("Clean fleet transition fund");
  if (activeTravel || i.accessible) funding.push("Active transportation and access grants");
  if (!funding.length) funding.push("County transportation improvement fund");
  return { ...draft, goals, locationBreakdown, benefitBreakdown, location, benefit,
    composite: mean([location, benefit]), funding };
}

type Seed = [id: string, name: string, type: ProjectType, subtype: number, review: ReviewStatus,
  delivery: DeliveryStatus, geometry: MapPoint[], inputs: Partial<ProjectInputs>, description: string, comments: PublicComment[]];

const comment = (author: string, location: string, text: string, date: string): PublicComment =>
  ({ author, location, text, date });
const seeds: Seed[] = [
  ["biscayne", "Biscayne Boulevard bus priority", ProjectType.Transit, 0, "Submitted", "Planning",
    [[-80.1894,25.7827],[-80.1891,25.8053],[-80.1881,25.8148],[-80.1799,25.8255],[-80.1810,25.8436]],
    {dailyUsers:2600,routes:5,improvedStops:8,safeCrossings:5,signalPriority:7,accessible:true,equityArea:true,zeroEmission:true},
    "Give buses priority at signals between Downtown and the Upper Eastside, with accessible boarding areas and safer crossings at busy stops.",
    [comment("María R.", "Upper Eastside", "A longer crossing interval would help riders reach the northbound stop before the bus arrives.", "2026-10-14"),
     comment("Daniel P.", "Downtown", "Signal priority would make my afternoon connection much more reliable.", "2026-10-19")]],
  ["ludlam", "Ludlam Trail neighborhood links", ProjectType.Bike, 1, "Approved", "In Progress",
    [[-80.3116,25.6938],[-80.3107,25.7084],[-80.3040,25.7342],[-80.3033,25.7552]],
    {dailyUsers:1450,routes:2,safeCrossings:6,accessible:true,equityArea:true},
    "Connect neighborhood streets to the trail with protected approaches, marked crossings and accessible ramps.",
    [comment("Jules A.", "Glenvar Heights", "The crossing at the trail entrance is where my family most needs a refuge island.", "2026-10-09")]],
  ["flagler", "Flagler Street accessible stops", ProjectType.Transit, 1, "Approved", "In Pipeline",
    [[-80.2712,25.7715],[-80.2536,25.7721],[-80.2228,25.7738],[-80.2029,25.7741]],
    {dailyUsers:1800,routes:3,improvedStops:12,safeCrossings:4,accessible:true,equityArea:true},
    "Rebuild boarding pads and sidewalks along Flagler Street to provide continuous step-free access to bus service.",
    [comment("Elena M.", "Little Havana", "A level boarding pad would make this stop much easier to use with a walker.", "2026-10-11")]],
  ["hialeah", "Hialeah safer school crossings", ProjectType.Pedestrian, 0, "Approved", "Completed",
    [[-80.2882,25.8626],[-80.2823,25.8627],[-80.2774,25.8629]],
    {dailyUsers:720,routes:1,safeCrossings:8,accessible:true,equityArea:true},
    "Install raised crossings and curb ramps on school walking routes near Palm Avenue.",
    [comment("Camila S.", "Hialeah", "The raised crossing on our walk to school has made drivers slow down.", "2026-09-24")]],
  ["kendall", "Kendall Drive signal coordination", ProjectType.Roadway, 0, "Submitted", "Planning",
    [[-80.3854,25.6864],[-80.3550,25.6870],[-80.3205,25.6879]],
    {dailyUsers:3300,routes:4,signalPriority:9,safeCrossings:3},
    "Coordinate signals along Kendall Drive and give late-running buses a longer green phase.", []],
  ["training", "Bus operator safety workshops", ProjectType.Transit, 3, "Approved", "In Progress",
    [[-80.2473,25.8311]], {dailyUsers:600,trainingHours:160,routes:3,equityArea:true},
    "Provide scenario-based training at the bus operations center, focusing on vulnerable road users and safe station approaches.",
    [comment("Luis V.", "Brownsville", "Please include bicycle passing scenarios in the training sessions.", "2026-10-07")]],
  ["port", "Port access and loading improvements", ProjectType.Freight, 0, "Created", "Planning",
    [[-80.1865,25.7806],[-80.1785,25.7785],[-80.1726,25.7775]],
    {dailyUsers:950,signalPriority:3,safeCrossings:2},
    "Improve loading access and reduce conflicts between trucks, people walking and local traffic at the port approach.", []],
  ["southdade", "South Dade electric bus facilities", ProjectType.Transit, 2, "Approved", "Approved",
    [[-80.3531,25.6023]], {dailyUsers:2100,routes:4,improvedStops:3,accessible:true,zeroEmission:true},
    "Equip the transitway facility for electric service and rebuild accessible passenger waiting areas.", []],
  ["beach", "Miami Beach protected bikeway", ProjectType.Bike, 0, "Approved", "Completed",
    [[-80.1353,25.7799],[-80.1358,25.7882],[-80.1375,25.7982]],
    {dailyUsers:1150,safeCrossings:4,accessible:true},
    "Connect the bike network to neighborhood destinations with protected lanes and marked crossings.", []],
];
const initialProjects = seeds.map(([id,name,type,subtype,reviewStatus,deliveryStatus,geometry,inputs,description,comments]) =>
  evaluateProject({id,name,type,subtype:projectSubtypes[type][subtype],description,geometry,districts:getDistricts(geometry),
    reviewStatus,deliveryStatus,inputs:{...emptyInputs,...inputs},comments}));
const initialPrograms: DemoProgram[] = [
  {id:"transit-access",name:"Transit access and reliability",tags:["Transit","Accessibility"],status:"Approved",projectIds:["flagler","southdade","training"]},
  {id:"safe-routes",name:"Neighborhood safe routes",tags:["Safety","Active transportation"],status:"Submitted",projectIds:["hialeah","ludlam","beach"]},
  {id:"corridor",name:"Urban corridor improvements",tags:["Corridor planning"],status:"Created",projectIds:["kendall","port"]},
  {id:"walking-cycling",name:"Walking and cycling connections",tags:["First / last mile"],status:"Completed",projectIds:["hialeah","beach"]},
];
export const communityIdeas: PublicComment[] = [
  comment("Ana G.", "Little River • NE 79th Street", "Could the county add a shaded waiting area near the library? There is no shelter on the westbound side.", "2026-10-21"),
  comment("Samuel K.", "Westchester • SW 24th Street", "The sidewalk ends before the grocery store. A short connection would let us walk there from the bus.", "2026-10-16"),
];

interface ShowcaseStore {
  projects: DemoProject[];
  programs: DemoProgram[];
  saveProject: (project: DemoProject) => void;
  saveProgram: (program: DemoProgram) => void;
}
function upsert<T extends {id: string}>(items: T[], item: T) {
  return items.some(old => old.id === item.id) ? items.map(old => old.id === item.id ? item : old) : [item, ...items];
}
export const useShowcase = create<ShowcaseStore>()(persist(set => ({
  projects: initialProjects,
  programs: initialPrograms,
  saveProject: project => set(state => ({projects: upsert(state.projects, project)})),
  saveProgram: program => set(state => ({programs: upsert(state.programs, program)})),
}), {name: "mdc-planning-portfolio", version: 1}));
