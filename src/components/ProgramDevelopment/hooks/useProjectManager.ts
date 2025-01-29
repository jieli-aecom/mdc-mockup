import { useContext, useEffect, useState } from "react";
import { Project } from "../../../types/Project";
import Graphic from "@arcgis/core/Graphic";
import { TopPercent } from "../consts/top-percents";
import { ProjectsContext } from "../../../pages/ProgramDevelopment/ProgramDevelopment";

export function useProjectManager() {
  //#region States

  const projects: Project[] = useContext(ProjectsContext);

  // Tier 1: filters
  const [topPercents, setTopPercents] = useState<TopPercent>(100);

  // Tier 2: selected as candidate for aggregation ("Selected")
  const [selectedProjectIds, setSelectedProjectIds] = useState<Set<number>>(
    new Set()
  );

  // Tier 3: aggregated projects ("Picked")
  const [pickedProjectIds, setPickedProjectIds] = useState<Set<number>>(
    new Set()
  );

  // Map: should show filtered projects, but with different symbols
  // for filtered, selected, and aggregated projects
  const [mapGraphics, setMapGraphics] = useState<Graphic[]>([]);
  //#endregion

  //#region Derived states

  const allProjectIds = new Set(projects.map((project) => project.Id));

  const filteredProjects: Project[] = projects.slice(
    0,
    Math.ceil((topPercents / 100) * projects.length)
  ); // TODO: to add other filters
  const filteredProjectIds = new Set(
    filteredProjects.map((project) => project.Id)
  );

  const isAllSelected = selectedProjectIds.size === filteredProjectIds.size;

  const programProjects: Project[] = projects.filter((project) => {
    return pickedProjectIds.has(project.Id);
  });

  //#endregion

  //#region Handlers exposed

  const toggleSetTopPercent = (topPercent: TopPercent) => {
    setTopPercents(topPercent);
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
    setMapGraphics(allProjects.map((project) => project.Shape)); // TODO: To add symbology
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
    mapGraphics,
  };
}
