import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";

export const test = 1;

export const REGULAR_LINE_SYMBOL = new SimpleLineSymbol({
  color: [0, 0, 0, 0.5],
  width: 1,
});

export const SELECTED_LINE_SYMBOL = new SimpleLineSymbol({
  color: [0, 0, 0, 1],
  width: 2,
});

export const PICKED_LINE_SYMBOL = new SimpleLineSymbol({
  color: [0, 0, 0, 1],
  width: 4,
});

export const REGULAR_POINT_SYMBOL = new SimpleMarkerSymbol({
  color: [0, 0, 0, 0.5],
  size: 10,
  style: "circle",
});

export const SELECTED_POINT_SYMBOL = new SimpleMarkerSymbol({
  color: [0, 0, 0, 1],
  size: 12,
  style: "circle",
  outline: {
    color: [255, 255, 255, 1],
    width: 2,
  },
});

export const PICKED_POINT_SYMBOL = new SimpleMarkerSymbol({
  color: [0, 0, 0, 1],
  size: 14,
  style: "circle",
  outline: {
    color: [255, 255, 255, 1],
    width: 4,
  },
});

export const MAP_CENTER = [-80.19179, 25.76168];
export const MAP_START_ZOOM = 12;
export const MAP_BASEMAP = "streets-navigation-vector";
