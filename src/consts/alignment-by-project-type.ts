import { PerformanceArea } from "../types/PerformanceArea";
import { ProjectType } from "../types/Project";

export const ALIGNMENT_BY_PROJECT_TYPE: Record<
  ProjectType,
  Record<PerformanceArea, number>
> = {
  [ProjectType.Bike]: {
    [PerformanceArea.Safe]: 0.8,
    [PerformanceArea.Clean]: 0.9,
    [PerformanceArea.Efficient]: 0.7,
    [PerformanceArea.Connected]: 0.6,
  },
  [ProjectType.Pedestrian]: {
    [PerformanceArea.Safe]: 0.9,
    [PerformanceArea.Clean]: 0.6,
    [PerformanceArea.Efficient]: 0.7,
    [PerformanceArea.Connected]: 0.8,
  },
  [ProjectType.Roadway]: {
    [PerformanceArea.Safe]: 0.7,
    [PerformanceArea.Clean]: 0.6,
    [PerformanceArea.Efficient]: 0.9,
    [PerformanceArea.Connected]: 0.8,
  },
  [ProjectType.Transit]: {
    [PerformanceArea.Safe]: 0.6,
    [PerformanceArea.Clean]: 0.8,
    [PerformanceArea.Efficient]: 0.9,
    [PerformanceArea.Connected]: 0.7,
  },
  [ProjectType.Freight]: {
    [PerformanceArea.Safe]: 0.6,
    [PerformanceArea.Clean]: 0.7,
    [PerformanceArea.Efficient]: 0.8,
    [PerformanceArea.Connected]: 0.9,
  },
};
