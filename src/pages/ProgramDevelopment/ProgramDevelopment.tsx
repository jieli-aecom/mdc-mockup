import { useState } from "react";
import { ReactComponent as ProgramIcon } from "../../icons/3_Program Development/Program_White.svg";
import { ReactComponent as ProgramGrayIcon } from "../../icons/3_Program Development/Program_Gray.svg";
import { ReactComponent as CreateIcon } from "../../icons/2_Project_Prioritization/Create_White.svg";
import { ReactComponent as CreateGrayIcon } from "../../icons/2_Project_Prioritization/Create_Gray.svg";
import { DemoProgram, DemoProject, useShowcase } from "../../mockData/showcase";
import ProgramCatalog from "../../components/ProgramDevelopment/components/ProgramCatalog";
import ProgramBuilder from "../../components/ProgramDevelopment/components/ProgramBuilder";
import ProgramSummary from "../../components/ProgramDevelopment/components/ProgramSummary";
import "../../components/ProgramDevelopment/components/ProgramDevelopmentPage1/ProgramDevelopmentPage1.css";
import "../../styles/button-styles.css";
import "./ProgramDevelopment.css";

type View = "programs" | "selection" | "review" | "tracking";

function bundleTags(members: DemoProject[], original: DemoProgram | undefined, projects: DemoProject[]) {
  const types = Array.from(new Set<string>(members.map(project => project.type)));
  if (!original) return types;
  // Seeded bundles can have thematic tags as well as tags derived from member project types.
  const previousTypes = new Set<string>(projects.filter(project => original.projectIds.includes(project.id)).map(project => project.type));
  const retained = original.tags.filter(tag => !previousTypes.has(tag) || types.includes(tag));
  return [...retained, ...types.filter(type => !previousTypes.has(type) && !retained.includes(type))];
}

export default function ProgramDevelopment() {
  const { projects, programs, saveProgram, deleteProgram } = useShowcase();
  const [requestedView, setView] = useState<View>("programs");
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [programName, setProgramName] = useState("");
  const [activeId, setActiveId] = useState("");
  const [notice, setNotice] = useState("");
  const activeProgram = programs.find(program => program.id === activeId);
  const view = activeId && !activeProgram ? "programs" : requestedView;
  const building = view === "selection" || view === "review";
  const creating = building && !activeProgram;
  const memberIds = view === "tracking" && activeProgram ? activeProgram.projectIds : projectIds;
  const members = projects.filter(project => memberIds.includes(project.id));

  function showCatalog(message = "") {
    setActiveId("");
    setNotice(message);
    setView("programs");
  }

  function startProgram() {
    if (!creating) {
      setActiveId("");
      setProjectIds([]);
      setProgramName("");
    }
    setNotice("");
    setView("selection");
  }

  function editProgram(program: DemoProgram) {
    setProjectIds([...program.projectIds]);
    setProgramName(program.name);
    setNotice("");
    setView("selection");
  }

  function saveBundle(name: string) {
    if (!members.length || !name.trim()) return;
    const changes = {
      name: name.trim(),
      projectIds: [...projectIds],
      tags: bundleTags(members, activeProgram, projects),
    };
    if (activeProgram) {
      saveProgram({ ...activeProgram, ...changes });
      setNotice("Changes saved.");
      setView("tracking");
      return;
    }
    const id = "program-" + (typeof crypto.randomUUID === "function" ? crypto.randomUUID() : crypto.getRandomValues(new Uint32Array(3)).join("-"));
    saveProgram({ ...changes, id, status: "Submitted" });
    showCatalog(changes.name + " was submitted for review.");
  }

  function deleteBundle(program: DemoProgram) {
    deleteProgram(program.id);
    showCatalog(program.name + " was deleted.");
  }

  return (
    <div className="main-content-container pd-shell">
      <nav className="sidebar-container pd-sidebar" aria-label="Program development">
        <button type="button" className={"sidebar-item-container pd-sidebar-button" + (!creating ? " program-development-icon" : "")}
          aria-current={!creating ? "page" : undefined} onClick={() => showCatalog()}>
          {!creating ? <ProgramIcon /> : <ProgramGrayIcon />}Programs
        </button>
        <div className="sidebar-hr" />
        <button type="button" className={"sidebar-item-container pd-sidebar-button" + (creating ? " program-development-icon" : "")}
          aria-current={creating ? "page" : undefined} onClick={startProgram}>
          {creating ? <CreateIcon /> : <CreateGrayIcon />}Create New Program
        </button>
      </nav>
      <main className="pd-workspace">
          {view === "programs" && (
            <ProgramCatalog programs={programs} projects={projects} notice={notice} onCreate={startProgram}
              onOpen={id => { setActiveId(id); setNotice(""); setView("tracking"); }} />
          )}
          {view === "selection" && (
            <ProgramBuilder key={activeId} projects={projects} projectIds={projectIds} setProjectIds={setProjectIds}
              editing={!!activeProgram} draftName={programName} onCancel={() => setView("tracking")}
              onReview={() => {
                if (!activeProgram && !programName.trim()) {
                  const types = Array.from(new Set(members.map(project => project.type)));
                  setProgramName((types.length <= 2 ? types.join(" and ") : "Multimodal") + " Improvements");
                }
                setView("review");
              }} />
          )}
          {view === "review" && (
            <ProgramSummary members={members} draftName={programName} onName={setProgramName}
              editing={!!activeProgram} onCancel={() => setView("tracking")}
              onBack={() => setView("selection")} onSubmit={saveBundle} />
          )}
          {view === "tracking" && activeProgram && (
            <ProgramSummary members={members} program={activeProgram} notice={notice} onBack={() => showCatalog()}
              onEdit={() => editProgram(activeProgram)} onDelete={() => deleteBundle(activeProgram)} />
          )}
      </main>
    </div>
  );
}
