import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import { DARK_BLUE, LIGHT_BLUE, MID_GRAY } from "./colors";

export const test = 1;

export const REGULAR_LINE_SYMBOL = new SimpleLineSymbol({
  color: MID_GRAY,
  width: 2,
});

export const SELECTED_LINE_SYMBOL = new SimpleLineSymbol({
  color: LIGHT_BLUE,
  width: 2.5,
});

export const PICKED_LINE_SYMBOL = new SimpleLineSymbol({
  color: DARK_BLUE,
  width: 3,
});

export const REGULAR_POINT_SYMBOL = new SimpleMarkerSymbol({
  color: MID_GRAY,
  size: 10,
  style: "circle",
  outline: {
    color: [255, 255, 255, 1],
    width: 1,
  },
});

export const SELECTED_POINT_SYMBOL = new SimpleMarkerSymbol({
  color: LIGHT_BLUE,
  size: 12,
  style: "circle",
  outline: {
    color: [255, 255, 255, 1],
    width: 2,
  },
});

export const PICKED_POINT_SYMBOL = new SimpleMarkerSymbol({
  color: DARK_BLUE,
  size: 14,
  style: "circle",
  outline: {
    color: [255, 255, 255, 1],
    width: 2,
  },
});

export const MAP_CENTER = [-80.19179, 25.76168];
export const MAP_START_ZOOM = 12;
export const MAP_BASEMAP = "streets-navigation-vector";
