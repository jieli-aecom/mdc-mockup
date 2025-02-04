import { Division } from "./Divisions";
import { PerformanceArea } from "./PerformanceArea";

export type PerformanceTrackingItem = {
  type: PerformanceArea;
  division?: Division | null;
  direction: "up" | "down" | "normal";
  value: string;
  target: string;
  progress: number;
  description: string;
};
