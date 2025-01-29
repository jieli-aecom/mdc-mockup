import { useContext, useEffect, useState } from "react";
import { Project, ProjectType } from "../../../types/Project";
import Graphic from "@arcgis/core/Graphic";
import { TopPercent } from "../consts/top-percents";
import { ProjectsContext } from "../../../pages/ProgramDevelopment/ProgramDevelopment";
import {
  PICKED_LINE_SYMBOL,
  PICKED_POINT_SYMBOL,
  REGULAR_LINE_SYMBOL,
  REGULAR_POINT_SYMBOL,
  SELECTED_LINE_SYMBOL,
  SELECTED_POINT_SYMBOL,
} from "../../../consts/map";

const makeMapGraphics = (
  mapProjects: Project[],
  selectedProjectIds: Set<number> = new Set(),
  pickedProjectIds: Set<number> = new Set()
) => {
  const regularGraphics: Graphic[] = [];
  const selectedGraphics: Graphic[] = [];
  const pickedGraphics: Graphic[] = [];
  for (const project of mapProjects) {
    if (!project.Shape) continue;

    if (pickedProjectIds.has(project.Id)) {
      const symbol = project.IsLine ? PICKED_LINE_SYMBOL : PICKED_POINT_SYMBOL;
      const graphic = new Graphic({
        geometry: project.Shape,
        symbol,
      });
      pickedGraphics.push(graphic);
    } else if (selectedProjectIds.has(project.Id)) {
      const symbol = project.IsLine
        ? SELECTED_LINE_SYMBOL
        : SELECTED_POINT_SYMBOL;
      const graphic = new Graphic({
        geometry: project.Shape,
        symbol,
      });
      selectedGraphics.push(graphic);
    } else {
      const symbol = project.IsLine
        ? REGULAR_LINE_SYMBOL
        : REGULAR_POINT_SYMBOL;
      const graphic = new Graphic({
        geometry: project.Shape,
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

const filterProjects = (
  projects: Project[],
  topPercent: TopPercent,
  filterType: ProjectType | null
) => {
  const filteredProjects = projects
    .filter((project) => !filterType || project.ProjectType === filterType)
    .slice(0, Math.ceil((topPercent / 100) * projects.length));
  return filteredProjects;
};

export function useProjectManager() {
  //#region States

  const projects: Project[] = useContext(ProjectsContext);

  // Tier 1: filters
  const [topPercents, setTopPercents] = useState<TopPercent>(100);
  const [filterType, setFilterType] = useState<ProjectType | null>(null);

  // Tier 2: selected as candidate for aggregation ("Selected")
  const [selectedProjectIds, setSelectedProjectIds] = useState<Set<number>>(
    new Set()
  );

  // Tier 3: aggregated projects ("Picked")
  const [pickedProjectIds, setPickedProjectIds] = useState<Set<number>>(
    new Set()
  );
  //#endregion

  //#region Derived states

  const allProjectIds = new Set(projects.map((project) => project.Id));

  const filteredProjects: Project[] = filterProjects(
    projects,
    topPercents,
    filterType
  );
  const filteredProjectIds = new Set(
    filteredProjects.map((project) => project.Id)
  );

  const isAllSelected = selectedProjectIds.size === filteredProjectIds.size;

  const programProjects: Project[] = projects.filter((project) => {
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

  const toggleSetFilterType = (type: ProjectType | null) => {
    setFilterType(type);
    unselectAllFilteredProjects();
    unpickAllSelectedProjects();
  };

  const toggleSelectProject = (projectId: number) => {
    if (!allProjectIds.has(projectId)) {
      throw new Error(`Project with id ${projectId} not found in all projects`);
    }

    if (selectedProjectIds.has(projectId)) {
      selectedProjectIds.delete(projectId);
    } else {
      selectedProjectIds.add(projectId);
    }
    setSelectedProjectIds(new Set(selectedProjectIds));
  };

  const selectAllFilteredProjects = () => {
    setSelectedProjectIds(new Set(filteredProjectIds));
  };

  const unselectAllFilteredProjects = () => {
    setSelectedProjectIds(new Set());
  };

  const togglePickProject = (projectId: number) => {
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

  const unpickAllSelectedProjects = () => {
    setPickedProjectIds(new Set());
  };

  //#endregion

  //#region Data changes

  // When source projects change, update hook copy, and reset all filters
  useEffect(() => {
    const allProjects = [...projects];
    allProjects.sort((a: Project, b: Project) => {
      return b.CompositeScore - a.CompositeScore;
    });
    setTopPercents(100); // TODO: to reset other filters when added
    setSelectedProjectIds(new Set());
    setPickedProjectIds(new Set());
  }, [projects]);

  //#endregion

  return {
    filteredProjects,
    selectedProjectIds,
    isAllSelected,
    toggleSelectProject,
    selectAllFilteredProjects,
    unselectAllFilteredProjects,
    programProjects,
    togglePickProject,
    pickAllSelectedProjects,
    unpickAllSelectedProjects,
    topPercents,
    toggleSetTopPercent,
    toggleSetFilterType,
    mapGraphics,
  };
}
