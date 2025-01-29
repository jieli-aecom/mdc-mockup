import React, { useEffect, useRef, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Search from "@arcgis/core/widgets/Search";
import Legend from "@arcgis/core/widgets/Legend";
import Home from "@arcgis/core/widgets/Home";
import Zoom from "@arcgis/core/widgets/Zoom";
import Graphic from "@arcgis/core/Graphic";
import Polyline from "@arcgis/core/geometry/Polyline";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import "@arcgis/core/assets/esri/themes/light/main.css";
import "./ProgramDevelopmentMap.css";

interface ProjectDevelopmentMapProps {
  project: any;
}

const ProjectDevelopmentMap: React.FC<ProjectDevelopmentMapProps> = ({
  project
}) => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [mapView, setView] = useState<MapView | null>(null);

  useEffect(() => {
    const webMap = new WebMap({
      basemap: "streets-navigation-vector"
    });

    const view = new MapView({
      container: mapDiv.current as HTMLDivElement,
      map: webMap,
      center: [-80.19179, 25.76168],
      zoom: 12
    });

    const searchWidget = new Search({ view });
    view.ui.add(searchWidget, "top-right");

    const legendWidget = new Legend({ view });
    view.ui.add(legendWidget, "bottom-left");

    const homeWidget = new Home({ view });
    view.ui.add(homeWidget, "top-left");

    const zoomWidget = new Zoom({ view });
    view.ui.add(zoomWidget, "bottom-right");

    setView(view);

    // Cleanup the view when component unmounts
    return () => {
      if (view) {
        view.destroy();
        setView(null);
      }
    };
  }, []);

  useEffect(() => {
    if (project && mapView) {
      const projectGeometry = new Polyline({
        paths: project.geometry.paths,
        spatialReference: { wkid: 3857 }
      });

      const getLocationScore = (data: any) => {
        return Math.round(
          (data.Safety + data.Resiliency + data.TravelTime + data.LandUse) / 4
        );
      };

      const getBenefitScore = (data: any) => {
        return Math.round(
          (data.PopDensity +
            data.Existing +
            data.EmployDensity +
            data.Metrobus) /
            4
        );
      };

      const getCompositeScore = (data: any) => {
        return Math.round((getLocationScore(data) + getBenefitScore(data)) / 2);
      };

      const projectGraphic = new Graphic({
        geometry: projectGeometry,
        symbol: new SimpleLineSymbol({
          color: [226, 119, 40],
          width: 4
        }),
        popupTemplate: {
          title: project.attributes.name || "Project Information",
          content: `
            <b>Project No:</b> ${project.attributes.number || "N/A"}<br>
            <b>Project Type:</b> ${project.attributes.ProjectType || "N/A"}<br>
            <b>Project Status:</b> ${project.attributes.status || "N/A"}<br>
            <b>Composite Score:</b> ${
              getCompositeScore(project.attributes) || "N/A"
            }<br>
          `
        }
      });

      mapView
        .goTo({
          target: projectGraphic.geometry,
          zoom: 15
        })
        .then(() => {
        });
    }
  }, [project, mapView]);

  return (
    <div className="map-view" ref={mapDiv}>
    </div>
  );
};

export default ProjectDevelopmentMap;
