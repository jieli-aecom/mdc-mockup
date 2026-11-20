import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import ProjectPrioritizationContent from "../../components/ProjectPrioritization/ProjectPrioritizationContent/ProjectPrioritizationContent";
import { summaryTabs, SummaryTab } from "../../components/ProjectPrioritization/ProjectPrioritizationContent/table-configs";
import ProjectQuestionnaire from "../../components/ProjectPrioritization/ProjectQuestionnaire";
import ProjectEvaluation from "../../components/ProjectPrioritization/ProjectEvaluation";
import PublicEngagement from "../../components/ProjectPrioritization/PublicEngagement";
import { DemoProject, useShowcase } from "../../mockData/showcase";
import "./ProjectPrioritization.css";

const ProjectPrioritization: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const { projects, saveProject } = useShowcase();
  const [evaluatingId, setEvaluatingId] = useState("");
  const view = params.get("view") || "Summary";
  const projectId = params.get("project") || "";
  const project = projects.find((entry) => entry.id === projectId);
  const tab = summaryTabs.includes(view as SummaryTab) ? view as SummaryTab : "Summary";
  const editor = view === "Create Project" || (view === "Edit Project" && project && project.reviewStatus !== "Approved");
  const evaluation = view === "Evaluation" && project;
  const engagement = view === "Public Engagement";

  function open(next: string, id?: string) {
    setParams(id ? { view: next, project: id } : { view: next });
  }

  function submit(result: DemoProject) {
    saveProject(result);
    setEvaluatingId(result.id);
    open("Evaluation", result.id);
  }

  return (
    <div className="main-content-container pp-module">
      <SideBar active={editor ? "Create Project" : evaluation ? "Summary" : view} onOpen={open} />
      {editor ? (
        <ProjectQuestionnaire key={view + projectId} projects={projects} project={view === "Edit Project" ? project : undefined}
          onCancel={() => open("Summary", project?.id)} onSubmit={submit}
          onDraft={(draft) => { saveProject(draft); open("Summary", draft.id); }} />
      ) : evaluation && project ? (
        <ProjectEvaluation key={project.id} project={project} animate={project.id === evaluatingId}
          onComplete={() => setEvaluatingId("")} onReturn={() => open("Summary", project.id)} />
      ) : engagement ? (
        <PublicEngagement key={projectId} projects={projects} initialProjectId={projectId} onProject={(id) => open("Summary", id)} />
      ) : (
        <ProjectPrioritizationContent tab={tab} projects={projects} initialProjectId={projectId}
          onEdit={(id) => open("Edit Project", id)} onCreate={() => open("Create Project")}
          onEngagement={(id) => open("Public Engagement", id)} onEvaluation={(id) => open("Evaluation", id)} />
      )}
    </div>
  );
};

export default ProjectPrioritization;
