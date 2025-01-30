import React, { useContext, useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";
import Home from "@arcgis/core/widgets/Home";
import Zoom from "@arcgis/core/widgets/Zoom";

import "@arcgis/core/assets/esri/themes/light/main.css";
import "./ProgramDevelopmentMap.css";
import { MAP_BASEMAP, MAP_CENTER, MAP_START_ZOOM } from "../../../../consts/map";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

import Map from "@arcgis/core/Map";
import { programDevelopmentContext } from "../../../../pages/ProgramDevelopment/ProgramDevelopment";

interface ProjectDevelopmentMapProps {
}

const ProjectDevelopmentMap: React.FC<ProjectDevelopmentMapProps> = ({
}) => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const layerRef = useRef<GraphicsLayer | null>(null);
  const viewRef = useRef<MapView | null>(null);

  const {mapGraphics, mapZoomSignal} = useContext(programDevelopmentContext);

  useEffect(() => {
    const map = new Map({
      basemap: MAP_BASEMAP,
    });

    const graphicsLayer = new GraphicsLayer({
      id: "project-graphics",
      title: "Project",
    });
    layerRef.current = graphicsLayer;
    map.add(graphicsLayer);

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
  }, [mapGraphics]);

  useEffect(() => {
    if(!mapZoomSignal || !viewRef.current || !layerRef.current || mapGraphics.length === 0) {
      return;
    }
    viewRef.current.goTo(mapGraphics).catch((error) => {
      console.error("Error in goTo", error);
    })
  }, [mapZoomSignal, mapGraphics]);

  return <div className="map-view" ref={mapDiv}></div>;
};

export default ProjectDevelopmentMap;
