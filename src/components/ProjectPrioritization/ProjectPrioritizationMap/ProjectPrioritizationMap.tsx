import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";
import Home from "@arcgis/core/widgets/Home";
import Zoom from "@arcgis/core/widgets/Zoom";

import "@arcgis/core/assets/esri/themes/light/main.css";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

import Map from "@arcgis/core/Map";
import { projectPrioritizationContext } from "../../../pages/ProjectPrioritization/ProjectPrioritization";
import { MAP_BASEMAP, MAP_CENTER, MAP_START_ZOOM } from "../../../consts/map";
import Graphic from "@arcgis/core/Graphic";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";

import "./ProjectPrioritizationMap.css";
import { colorByType } from "../../../utils/map";

interface ProjectDevelopmentMapProps {}

const ProjectPrioritizationMap: React.FC<ProjectDevelopmentMapProps> = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const layerRef = useRef<GraphicsLayer | null>(null);
  const highlightedLayerRef = useRef<GraphicsLayer | null>(null);
  const viewRef = useRef<MapView | null>(null);

  const {
    mapGraphics,
    highlightedProjectId,
    triggerMapZoomSignal,
    mapZoomSignal,
    highlightedProject,
  } = useContext(projectPrioritizationContext);

  useEffect(() => {
    const map = new Map({
      basemap: MAP_BASEMAP,
    });

    const graphicsLayer = new GraphicsLayer({
      id: "project-graphics",
      title: "Project",
    });
    const highlightedGraphicsLayer = new GraphicsLayer({
      id: "highlighted-project-graphics",
      title: "Highlighted Project",
    });
    layerRef.current = graphicsLayer;
    highlightedLayerRef.current = highlightedGraphicsLayer;

    map.add(graphicsLayer);
    map.add(highlightedGraphicsLayer);

    const view = new MapView({
      container: mapDiv.current as HTMLDivElement,
      map: map,
      center: MAP_CENTER,
      zoom: MAP_START_ZOOM,
    });
    viewRef.current = view;

    const searchWidget = new Search({ view });
    view.ui.add(searchWidget, "top-right");

    const homeWidget = new Home({ view });
    view.ui.add(homeWidget, "top-left");

    const zoomWidget = new Zoom({ view });
    view.ui.add(zoomWidget, "bottom-right");

    map.add(graphicsLayer);
  }, []);

  useEffect(() => {
    if (mapGraphics.length === 0 || !layerRef.current) return;

    layerRef.current.removeAll();
    layerRef.current.addMany(mapGraphics);

    triggerMapZoomSignal();

    return () => {
      layerRef.current?.removeAll();
    };
  }, [mapGraphics, triggerMapZoomSignal]);

  const zoomTo = useCallback(
    (graphics: Graphic[], layerRef: MutableRefObject<GraphicsLayer | null>) => {
      let tries = 0;
      const interval = setInterval(() => {
        if (tries > 10) {
          clearInterval(interval);
          return;
        }
        try {
          if (
            !viewRef.current ||
            !viewRef.current.goTo ||
            !layerRef.current ||
            mapGraphics.length === 0
          ) {
            tries++;
            return;
          }
          viewRef.current.goTo(graphics);
          clearInterval(interval);
        } catch (error) {
          tries++;
        }
      }, 1000);
    },
    [mapGraphics]
  );

  // Highlight the selected project on map
  useEffect(() => {
    if (highlightedProjectId === "") return;
    const targetGraphic = mapGraphics.find(
      (graphic) => graphic.attributes.id === highlightedProjectId
    );

    if (!targetGraphic) return;

    let symbol;

    if (targetGraphic.geometry.type === "point") {
      symbol = (targetGraphic.symbol as SimpleMarkerSymbol).clone();
      symbol.size = 20;
    } else {
      symbol = (targetGraphic.symbol as SimpleLineSymbol).clone();
      symbol.width = 5;
    }

    const copiedTargetGraphic = new Graphic({
      geometry: targetGraphic?.geometry,
      symbol: symbol,
    });

    highlightedLayerRef.current?.removeAll();
    highlightedLayerRef.current?.addMany([copiedTargetGraphic]);
    zoomTo([copiedTargetGraphic], highlightedLayerRef);
  }, [highlightedProjectId, mapGraphics, zoomTo]);

  // Overall zoom
  useEffect(() => {
    if (!mapZoomSignal) return;
    zoomTo(mapGraphics, layerRef);
  }, [mapZoomSignal, mapGraphics, zoomTo]);

  return (
    <div className="map-wrapper">
      <div className="map-view" ref={mapDiv}></div>
      {highlightedProject && (
        <div className="map-highlighted-project">
          <div className="map-highlighted-project-title">
            {highlightedProject.Location}
          </div>
          <div className="map-highlighted-project-body">
            <div className="map-highlighted-project-body-row">
              <div className="map-highlighted-project-body-row-title">
                Composite Score:
              </div>
              <div className="map-highlighted-project-body-row-value">
                {Math.round(highlightedProject.CompositeScore)}
              </div>
            </div>

            <div className="map-highlighted-project-body-row">
              <div className="map-highlighted-project-body-row-title">
                Location Score:
              </div>
              <div className="map-highlighted-project-body-row-value">
                {Math.round(highlightedProject.LocationScores.Location)}
              </div>
            </div>

            <div className="map-highlighted-project-body-row">
              <div className="map-highlighted-project-body-row-title">
                Benefit Score:
              </div>
              <div className="map-highlighted-project-body-row-value">
                {Math.round(highlightedProject.BenefitScores.Benefit)}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="map-legend">
        {Object.entries(colorByType).map(([type, color]) => {
          return (
            <div key={type} className="map-legend-entry">
              <div
                className="map-legend-color"
                style={{ backgroundColor: color }}
              ></div>
              <div>{type}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectPrioritizationMap;
