import { useCallback, useEffect, useMemo, useState } from "react";
import { Project, ProjectType } from "../../../types/Project";
import Graphic from "@arcgis/core/Graphic";
import { TopPercent } from "../../../consts/top-percents";
import { useGetProjects } from "../../../hooks/useGetProjects";
import { CommissionDistrict } from "../../../types/District";
import { makeMapGraphics } from "../../../utils/map";


const filterProjects = (
  projects: Project[],
  topPercent: TopPercent,
  filterType: Set<ProjectType>,
  filterDistrict: Set<CommissionDistrict>
) => {
  const sorted = [...projects];
  sorted.sort((a, b) => b.CompositeScore - a.CompositeScore);

  return sorted
    .filter((project: Project) => {
      const typeMatch = filterType.size === 0 || filterType.has(project.Type);
      const districtMatch =
        filterDistrict.size === 0 ||
        project.CommissionDistricts.some((district) =>
          filterDistrict.has(district)
        );
      return typeMatch && districtMatch;
    })
    .slice(0, Math.ceil((topPercent / 100) * projects.length));
};
//#endregion

//#region Interface
export interface ProjectPrioritizationContext {
  filteredProjects: Project[];
  topPercents: TopPercent;
  toggleSetTopPercent: (topPercent: TopPercent) => void;
  toggleSetFilterType: (type: ProjectType | null) => void;
  toggleSetFilterDistrict: (district: CommissionDistrict | null) => void;
  mapGraphics: Graphic[];
  mapZoomSignal: boolean;
  triggerMapZoomSignal: () => void;
}

export const initialContext: ProjectPrioritizationContext = {
  filteredProjects: [],
  topPercents: 100,
  toggleSetTopPercent: () => {},
  toggleSetFilterType: () => {},
  toggleSetFilterDistrict: () => {},
  mapGraphics: [],
  mapZoomSignal: false,
  triggerMapZoomSignal: () => {},
};

//#endregion

export function useProgramDevelopmentContext() {
  //#region States

  const { projects } = useGetProjects();

  // Tier 1: filters
  const [topPercents, setTopPercents] = useState<TopPercent>(100);
  const [filteredTypes, setFilteredTypes] = useState<Set<ProjectType>>(
    new Set()
  );
  const [filteredDistricts, setFilteredDistricts] = useState<
    Set<CommissionDistrict>
  >(new Set());

  // Map zoom signal
  const [mapZoomSignal, setMapZoomSignal] = useState<boolean>(false);
  //#endregion

  //#region Derived states

  const filteredProjects: Project[] = filterProjects(
    projects,
    topPercents,
    filteredTypes,
    filteredDistricts
  );

  const mapGraphics = makeMapGraphics(
    filteredProjects,
    new Set(),
    new Set()
  );

  //#endregion

  //#region Handlers exposed

  const toggleSetTopPercent = (topPercent: TopPercent) => {
    setTopPercents(topPercent);
  };

  const toggleSetFilterType = (type: ProjectType) => {
    if (filteredTypes.has(type)) {
      filteredTypes.delete(type);
    } else {
      filteredTypes.add(type);
    }
    setFilteredTypes(filteredTypes);
  };

  const toggleSetFilterDistrict = (district: CommissionDistrict) => {
    if (filteredDistricts.has(district)) {
      filteredDistricts.delete(district);
    } else {
      filteredDistricts.add(district);
    }
    setFilteredDistricts(filteredDistricts);
  };

  const triggerMapZoomSignal = useCallback(() => {
    if (mapZoomSignal) return;
    setMapZoomSignal(true);
    setTimeout(() => {
      setMapZoomSignal(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //#endregion

  //#region Handle project changes

  // When source projects change, update hook copy, and reset all filters
  useEffect(() => {
    setTopPercents(100); // TODO: to reset other filters when added
    triggerMapZoomSignal();
  }, [projects, triggerMapZoomSignal]);
  //#endregion

  return {
    filteredProjects,
    topPercents,
    toggleSetTopPercent,
    toggleSetFilterType,
    toggleSetFilterDistrict,
    mapGraphics,
    mapZoomSignal,
    triggerMapZoomSignal,
  } as ProjectPrioritizationContext;
}
