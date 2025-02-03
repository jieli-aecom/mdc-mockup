import Graphic from "@arcgis/core/Graphic";
import { Project, ProjectType } from "../types/Project";
import {
  PICKED_LINE_SYMBOL,
  PICKED_POINT_SYMBOL,
  REGULAR_LINE_SYMBOL,
  REGULAR_POINT_SYMBOL,
  SELECTED_LINE_SYMBOL,
  SELECTED_POINT_SYMBOL,
} from "../consts/map";
import Color from "@arcgis/core/Color";

export const makeMapGraphics = (
  mapProjects: Project[],
  selectedProjectIds: Set<string> = new Set(),
  pickedProjectIds: Set<string> = new Set()
) => {
  const regularGraphics: Graphic[] = [];
  const selectedGraphics: Graphic[] = [];
  const pickedGraphics: Graphic[] = [];
  for (const project of mapProjects) {
    if (!project.Geometry) continue;

    if (pickedProjectIds.has(project.Id)) {
      const symbol = project.IsLine ? PICKED_LINE_SYMBOL : PICKED_POINT_SYMBOL;
      const graphic = new Graphic({
        geometry: project.Geometry,
        symbol,
      });
      pickedGraphics.push(graphic);
    } else if (selectedProjectIds.has(project.Id)) {
      const symbol = project.IsLine
        ? SELECTED_LINE_SYMBOL
        : SELECTED_POINT_SYMBOL;
      const graphic = new Graphic({
        geometry: project.Geometry,
        symbol,
      });
      selectedGraphics.push(graphic);
    } else {
      const symbol = project.IsLine
        ? REGULAR_LINE_SYMBOL
        : REGULAR_POINT_SYMBOL;
      const graphic = new Graphic({
        geometry: project.Geometry,
        symbol,
      });
      regularGraphics.push(graphic);
    }
  }

  const mapGraphics = [
    ...regularGraphics,
    ...selectedGraphics,
    ...pickedGraphics,
  ]; // order matters
  return mapGraphics;
};

const colorByType: Record<ProjectType, string> = {
  [ProjectType.Bike]: "#36A355",
  [ProjectType.Pedestrian]: "#C0DA73",
  [ProjectType.Roadway]: "#263C8C",
  [ProjectType.Transit]: "#4D9FD7",
  [ProjectType.Freight]: "#E61754",
};

export const makeMapGraphicsByType = (mapProjects: Project[]) => {
  const graphics: Graphic[] = mapProjects.map((project: Project) => {
    const geometry = project.Geometry;

    let symbol;

    if (project.IsLine) {
      symbol = REGULAR_LINE_SYMBOL.clone();
      symbol.color = new Color(colorByType[project.Type]);
    } else {
      symbol = REGULAR_POINT_SYMBOL.clone();
      symbol.color = new Color(colorByType[project.Type]);
    }

    return new Graphic({
      geometry,
      symbol,
    });
  });

  return graphics;
};
