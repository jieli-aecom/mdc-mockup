import { PerformanceArea } from "../types/PerformanceArea";
import { ProjectType } from "../types/Project";

export const ALIGNMENT_BY_PROJECT_TYPE: Record<
  ProjectType,
  Record<PerformanceArea, number>
> = {
  [ProjectType.Bike]: {
    [PerformanceArea.Safe]: 1,
    [PerformanceArea.Clean]: 0.9,
    [PerformanceArea.Efficient]: 0.7,
    [PerformanceArea.Connected]: 0.3,
  },
  [ProjectType.Pedestrian]: {
    [PerformanceArea.Safe]: 1,
    [PerformanceArea.Clean]: 0.1,
    [PerformanceArea.Efficient]: 0.2,
    [PerformanceArea.Connected]: 0.6,
  },
  [ProjectType.Roadway]: {
    [PerformanceArea.Safe]: 1,
    [PerformanceArea.Clean]: 0.2,
    [PerformanceArea.Efficient]: 0.3,
    [PerformanceArea.Connected]: 0.8,
  },
  [ProjectType.Transit]: {
    [PerformanceArea.Safe]: 1,
    [PerformanceArea.Clean]: 0.3,
    [PerformanceArea.Efficient]: 0.4,
    [PerformanceArea.Connected]: 0.7,
  },
  [ProjectType.Freight]: {
    [PerformanceArea.Safe]: 1,
    [PerformanceArea.Clean]: 0.4,
    [PerformanceArea.Efficient]: 0.2,
    [PerformanceArea.Connected]: 0.9,
  },
};
