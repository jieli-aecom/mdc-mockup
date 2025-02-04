import { PolicyAlignment } from "../types/PolicyAlignment";
import { ProjectType } from "../types/Project";

export const ALIGNMENT_BY_PROJECT_TYPE: Record<
  ProjectType,
  Record<PolicyAlignment, number>
> = {
  [ProjectType.Bike]: {
    [PolicyAlignment.Safe]: 0.8,
    [PolicyAlignment.Clean]: 0.9,
    [PolicyAlignment.Efficient]: 0.7,
    [PolicyAlignment.Connected]: 0.6,
  },
  [ProjectType.Pedestrian]: {
    [PolicyAlignment.Safe]: 0.9,
    [PolicyAlignment.Clean]: 0.6,
    [PolicyAlignment.Efficient]: 0.7,
    [PolicyAlignment.Connected]: 0.8,
  },
  [ProjectType.Roadway]: {
    [PolicyAlignment.Safe]: 0.7,
    [PolicyAlignment.Clean]: 0.6,
    [PolicyAlignment.Efficient]: 0.9,
    [PolicyAlignment.Connected]: 0.8,
  },
  [ProjectType.Transit]: {
    [PolicyAlignment.Safe]: 0.6,
    [PolicyAlignment.Clean]: 0.8,
    [PolicyAlignment.Efficient]: 0.9,
    [PolicyAlignment.Connected]: 0.7,
  },
  [ProjectType.Freight]: {
    [PolicyAlignment.Safe]: 0.6,
    [PolicyAlignment.Clean]: 0.7,
    [PolicyAlignment.Efficient]: 0.8,
    [PolicyAlignment.Connected]: 0.9,
  },
};
