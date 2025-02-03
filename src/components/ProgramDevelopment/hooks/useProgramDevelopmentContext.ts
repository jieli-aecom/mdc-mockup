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
export interface ProgramDevelopmentContext {
  filteredProjects: Project[];
  selectedProjectIds: Set<string>;
  selectedProjects: Project[];
  isAllSelected: boolean;
  toggleSelectProject: (projectId: string) => void;
  selectAllFilteredProjects: () => void;
  unselectAllFilteredProjects: () => void;
  pickedProjectIds: Set<string>;
  pickedProjects: Project[];
  isAllPicked: boolean;
  togglePickProject: (projectId: string) => void;
  pickAllSelectedProjects: () => void;
  unpickAllSelectedProjects: () => void;
  topPercents: TopPercent;
  toggleSetTopPercent: (topPercent: TopPercent) => void;
  toggleSetFilterType: (type: ProjectType | null) => void;
  toggleSetFilterDistrict: (district: CommissionDistrict | null) => void;
  mapGraphics: Graphic[];
  mapZoomSignal: boolean;
  triggerMapZoomSignal: () => void;
}

export const initialContext: ProgramDevelopmentContext = {
  filteredProjects: [],
  selectedProjectIds: new Set(),
  selectedProjects: [],
  isAllSelected: false,
  toggleSelectProject: () => {},
  selectAllFilteredProjects: () => {},
  unselectAllFilteredProjects: () => {},
  pickedProjectIds: new Set(),
  pickedProjects: [],
  isAllPicked: false,
  togglePickProject: () => {},
  pickAllSelectedProjects: () => {},
  unpickAllSelectedProjects: () => {},
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

  // Tier 2: selected as candidate for aggregation ("Selected")
  const [selectedProjectIds, setSelectedProjectIds] = useState<Set<string>>(
    new Set()
  );

  // Tier 3: aggregated projects ("Picked")
  const [pickedProjectIds, setPickedProjectIds] = useState<Set<string>>(
    new Set()
  );

  // Map zoom signal
  const [mapZoomSignal, setMapZoomSignal] = useState<boolean>(false);
  //#endregion

  //#region Derived states

  const allProjectIds = new Set(projects.map((project) => project.Id));

  const filteredProjects: Project[] = filterProjects(
    projects,
    topPercents,
    filteredTypes,
    filteredDistricts
  );
  const filteredProjectIds = useMemo(
    () => new Set(filteredProjects.map((project) => project.Id)),
    [filteredProjects]
  );

  const isAllSelected =
    selectedProjectIds.size === filteredProjectIds.size &&
    filteredProjectIds.size > 0;

  const selectedProjects: Project[] = [...projects].filter((project) => {
    return selectedProjectIds.has(project.Id);
  });

  const isAllPicked =
    pickedProjectIds.size === selectedProjectIds.size &&
    selectedProjectIds.size > 0;

  const pickedProjects: Project[] = [...projects].filter((project) => {
    return pickedProjectIds.has(project.Id);
  });

  const mapGraphics = makeMapGraphics(
    filteredProjects,
    selectedProjectIds,
    pickedProjectIds
  );

  //#endregion

  //#region Handlers exposed

  const toggleSetTopPercent = (topPercent: TopPercent) => {
    setTopPercents(topPercent);
    unselectAllFilteredProjects();
    unpickAllSelectedProjects();
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

  const toggleSelectProject = (projectId: string) => {
    if (!allProjectIds.has(projectId)) {
      throw new Error(`Project with id ${projectId} not found in all projects`);
    }

    if (selectedProjectIds.has(projectId)) {
      selectedProjectIds.delete(projectId);
    } else {
      selectedProjectIds.add(projectId);
    }
    setSelectedProjectIds(new Set(selectedProjectIds));
    setPickedProjectIds(new Set(selectedProjectIds)); // Auto-pick selected projects
  };

  const selectAllFilteredProjects = () => {
    setSelectedProjectIds(new Set(filteredProjectIds));
    setPickedProjectIds(new Set(filteredProjectIds));
  };

  const unselectAllFilteredProjects = useCallback(() => {
    setSelectedProjectIds(new Set());
    setPickedProjectIds(new Set());
  }, []);

  const togglePickProject = (projectId: string) => {
    if (!selectedProjectIds.has(projectId)) {
      throw new Error(
        `Project with id ${projectId} not found in selected projects`
      );
    }

    if (pickedProjectIds.has(projectId)) {
      pickedProjectIds.delete(projectId);
    } else {
      pickedProjectIds.add(projectId);
    }
    setPickedProjectIds(new Set(pickedProjectIds));
  };

  const pickAllSelectedProjects = () => {
    setPickedProjectIds(new Set(selectedProjectIds));
  };

  const unpickAllSelectedProjects = useCallback(() => {
    setPickedProjectIds(new Set());
  }, []);

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
    setSelectedProjectIds(new Set());
    setPickedProjectIds(new Set());
    triggerMapZoomSignal();
  }, [projects, triggerMapZoomSignal]);
  //#endregion

  return {
    filteredProjects,
    selectedProjectIds,
    selectedProjects,
    isAllSelected,
    toggleSelectProject,
    selectAllFilteredProjects,
    unselectAllFilteredProjects,
    pickedProjectIds,
    pickedProjects,
    isAllPicked,
    togglePickProject,
    pickAllSelectedProjects,
    unpickAllSelectedProjects,
    topPercents,
    toggleSetTopPercent,
    toggleSetFilterType,
    toggleSetFilterDistrict,
    mapGraphics,
    mapZoomSignal,
    triggerMapZoomSignal,
  } as ProgramDevelopmentContext;
}
