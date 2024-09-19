import { useRef, useEffect, useCallback, useState } from "react";
import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import {
  DEFAULT_MAP_CENTRAL_POINT,
  DEFAULT_SPATIAL_REF,
  MAP_API_KEY,
  RENDERER_BACKGROUND,
  CORRIDOR_FEATURE_SERVICE_URL,
  CORRIDOR_CREATE_NEW_SEGMENT_URL,
  CORRIDOR_CREATE_NEW_MARKER_URL,
  RENDERER_HIGHLIGHT_MARKER
} from "../consts";
import { createPopupTemplate } from "../utils";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";

export const getlineLabelClass = () => {
  return new LabelClass({
    labelExpressionInfo: {
      expression: "$feature.BMP"
    },
    symbol: new TextSymbol({
      color: "black",
      font: {
        size: 10,
        weight: "bold"
      },
      verticalAlignment: "middle",
      haloColor: "white",
      haloSize: "1px"
    }),
    labelPlacement: "above-along",
    deconflictionStrategy: "none"
  });
};

function useMapView() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapViewRef = useRef<Map | null>(null);
  const viewRef = useRef<MapView | null>(null);
  const corridorLayerRef = useRef<FeatureLayer | null>(null);
  const corridorKeyMarkerLayerRef = useRef<FeatureLayer | null>(null);

  const generateMap = useCallback(() => {
    esriConfig.apiKey = MAP_API_KEY;
    setIsMapLoaded(false);
    const lineLabelInfo = getlineLabelClass();

    const corridorLayer = new FeatureLayer({
      popupTemplate: createPopupTemplate(),
      url: CORRIDOR_CREATE_NEW_SEGMENT_URL,
      title: "Selected Corridors",
      id: "selected-corridors"
    });

    const corridorKeyMarkerLayer = new FeatureLayer({
      url: CORRIDOR_CREATE_NEW_MARKER_URL,
      outFields: ["*"],
      title: "Segment Breakpoints",
      //   renderer: RENDERER_HIGHLIGHT_MARKER, // This is casted to SimpleRenderer
      labelingInfo: [lineLabelInfo]
    });

    const corridorLayerBackground = new FeatureLayer({
      url: CORRIDOR_FEATURE_SERVICE_URL,
      title: "Candidate Corridors",
      id: "candidate-corridors"
      //   renderer: RENDERER_BACKGROUND
    });

    const map = new Map({
      basemap: "gray-vector",
      layers: [corridorLayerBackground, corridorLayer, corridorKeyMarkerLayer]
    });

    if (mapContainerRef.current) {
      const view = new MapView({
        map: map,
        center: DEFAULT_MAP_CENTRAL_POINT,
        zoom: 5.75,
        container: mapContainerRef.current,
        spatialReference: DEFAULT_SPATIAL_REF,
        constraints: {
          snapToZoom: false
        }
      });

      corridorLayerRef.current = corridorLayer;
      corridorKeyMarkerLayerRef.current = corridorKeyMarkerLayer;
      mapViewRef.current = map;
      viewRef.current = view;
      setIsMapLoaded(true);

      return () => {
        view.destroy();
      };
    }
  }, []);

  const refreshMap = useCallback(() => {
    if (viewRef.current) {
      //   viewRef.current.container = undefined; // Set container to undefined instead of null
      viewRef.current = null;
    }
    generateMap();
  }, [generateMap]);

  useEffect(() => {
    generateMap();
  }, [generateMap]);

  return {
    mapContainerRef,
    mapViewRef,
    viewRef,
    corridorLayerRef,
    corridorKeyMarkerLayerRef,
    refreshMap,
    isMapLoaded
  };
}

export default useMapView;
