import { ProjectType } from "../types/Project";

export interface TechnicalIntake {
  evidenceSource: string;
  observationPeriod: string;
  corridorLimits: string;
  currentTravelMinutes: number | null;
  plannedTravelMinutes: number | null;
  existingHeadway: number | null;
  plannedHeadway: number | null;
  existingOnTime: number | null;
  plannedOnTime: number | null;
  treatment: string;
  safetyBasis: string;
  accessibleDesign: string;
  operationsPlan: string;
  implementationStage: string;
  deliveryRisks: string;
  costEstimate: number | null;
  validationPlan: string;
  trainingParticipants: number | null;
  outcomeMeasure: string;
}

const emptyTechnicalIntake: TechnicalIntake = {
  evidenceSource: "", observationPeriod: "", corridorLimits: "",
  currentTravelMinutes: null, plannedTravelMinutes: null,
  existingHeadway: null, plannedHeadway: null, existingOnTime: null, plannedOnTime: null,
  treatment: "", safetyBasis: "", accessibleDesign: "", operationsPlan: "",
  implementationStage: "", deliveryRisks: "", costEstimate: null, validationPlan: "",
  trainingParticipants: null, outcomeMeasure: "",
};

export function resolveTechnicalIntake(draft: { technical?: Partial<TechnicalIntake> }): TechnicalIntake {
  return { ...emptyTechnicalIntake, ...draft.technical };
}

export function usesCorridorTravelTime(type: ProjectType, subtype: string) {
  return type === ProjectType.Roadway || type === ProjectType.Freight ||
    (type === ProjectType.Transit && (subtype === "Bus priority corridor" || subtype === "Bus stop improvements"));
}

export function corridorForecast(draft: { type: ProjectType; subtype: string; technical?: Partial<TechnicalIntake> }) {
  if (!usesCorridorTravelTime(draft.type, draft.subtype)) return null;
  const current = draft.technical?.currentTravelMinutes;
  const planned = draft.technical?.plannedTravelMinutes;
  if (current == null || planned == null || !Number.isFinite(current) || !Number.isFinite(planned) || current <= 0 || planned <= 0) return null;
  return { current, planned, reduction: (current - planned) / current };
}

export const biscayneIntake: Partial<TechnicalIntake> = {
  corridorLimits: "Downtown Miami to NE 79th Street along Biscayne Boulevard",
  evidenceSource: "Illustrative bus GPS records and passenger counts from five routes.",
  observationPeriod: "September 2026 weekdays, northbound, 4–6 p.m.",
  currentTravelMinutes: 28, plannedTravelMinutes: 23,
  existingHeadway: 12, plannedHeadway: 12, existingOnTime: 68, plannedOnTime: 82,
  treatment: "Buses running at least three minutes late can request up to ten seconds of green extension at seven intersections. Pedestrian clearance time takes priority.",
  safetyBasis: "September field observations flagged turning conflicts at five stop approaches. The concept adds marked crossings and revises crossing intervals at those locations.",
  accessibleDesign: "Connect eight boarding pads to the sidewalk. Field-check the clear path and ramp transitions with mobility device users before opening.",
  operationsPlan: "Transit dispatch monitors priority calls during peak service. Signal operators can suspend priority during detours. Scheduled headways stay at 12 minutes, including trips served by electric buses.",
  implementationStage: "Concept development",
  deliveryRisks: "Check controller compatibility and confirm utility clearances before finalizing boarding pad locations.",
  costEstimate: 5800000,
  outcomeMeasure: "Reduce median northbound peak running time from 28 to 23 minutes and raise on-time trips from 68% to 82%.",
  validationPlan: "Transit service planning will repeat the September weekday peak sample 90 days after opening and report running time and on-time trips for the same five routes.",
};
