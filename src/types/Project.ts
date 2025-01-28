export enum ProjectType {
  ArterialCollector = "Arterial & Collector",
  Assets = "Assets",
  BikePedestrian = "Bike & Pedestrian",
  Congestion = "Congestion",
  Freight = "Freight",
  Transit = "Transit",
  Other = "Other",
}

export enum ProjectStatus {
  Planned = "Planned",
  UnderConstruction = "Under Construction",
  Completed = "Completed",
}

export enum ProjectLevel1Category {
  Safe = "SAFE",
  Clean = "CLEAN",
  Efficient = "EFFICIENT",
  Connected = "CONNECTED",
  Social = "SOCIAL",
  Economy = "ECONOMY",
}

export enum ProjectLevel2Category {
  VehicularCrashes = "Vehicular Crashes",
  BikePedCrashes = "Bike/Ped Crashes",
  DecreaseInBikeCrash = "Decrease in Bike Crash",
  AtGradeRailCrossings = "At Grade Rail Crossings",
  SidewalkNetwork = "Sidewalk Network",
  BikeNetwork = "Bike Network",
  DecreaseInPollutants = "Decrease in Pollutants",
  DecreaseInHeatExposure = "Decrease in Heat Exposure",
  DecreaseInTraffic = "Decrease in Traffic",
  DecreaseInTravelTime = "Decrease in Travel Time",
  DecreaseInTruckVolume = "Decrease in Truck Volume",
  IncreaseInTravelLanes = "Increase in Travel Lanes",
  AccessToTransit = "Access to Transit",
  AccessToParks = "Access to Parks",
  OverlapWithSmartCorridors = "Overlap with Smart Corridors",
  PopulationTransitDependent = "Population Transit Dependent",
}

export const colorByProjectLevel1Category: Record<
  ProjectLevel1Category,
  string
> = {
  [ProjectLevel1Category.Safe]: "#3fbf3f",
  [ProjectLevel1Category.Clean]: "#39bfcf",
  [ProjectLevel1Category.Efficient]: "#65c78b",
  [ProjectLevel1Category.Connected]: "#b9e769",
  [ProjectLevel1Category.Social]: "#ec4c56",
  [ProjectLevel1Category.Economy]: "#ed8e46",
};

export type ProjectSubMetric = {
  label: ProjectLevel2Category;
  value: number;
  unit: string;
};

export type ProjectSummaryMetric = {
  label: ProjectLevel1Category;
  details: ProjectSubMetric[];
};

export type ProjectSubScore = {
  label: ProjectLevel2Category;
  value: number;
};

export type ProjectSummaryScore = {
  label: ProjectLevel1Category;
  value: number;
  details: ProjectSubScore[];
};

export type Project = {
  Name: string;
  ProjectNumber: string;
  ProjectType: ProjectType;
  Description: string;
  Metrics: ProjectSummaryMetric[];
  Scores: ProjectSummaryScore[];
};
