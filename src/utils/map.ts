import Graphic from "@arcgis/core/Graphic";
import { Project } from "../types/Project";
import {
  PICKED_LINE_SYMBOL,
  PICKED_POINT_SYMBOL,
  REGULAR_LINE_SYMBOL,
  REGULAR_POINT_SYMBOL,
  SELECTED_LINE_SYMBOL,
  SELECTED_POINT_SYMBOL,
} from "../consts/map";

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
