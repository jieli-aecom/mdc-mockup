import { useState } from "react";
import { ReactComponent as ProgramIcon } from "../../icons/3_Program Development/Program_White.svg";
import { ReactComponent as ProgramGrayIcon } from "../../icons/3_Program Development/Program_Gray.svg";
import { ReactComponent as CreateIcon } from "../../icons/2_Project_Prioritization/Create_White.svg";
import { ReactComponent as CreateGrayIcon } from "../../icons/2_Project_Prioritization/Create_Gray.svg";
import { DemoProgram, useShowcase } from "../../mockData/showcase";
import ProgramCatalog from "../../components/ProgramDevelopment/components/ProgramCatalog";
import ProgramBuilder from "../../components/ProgramDevelopment/components/ProgramBuilder";
import ProgramSummary from "../../components/ProgramDevelopment/components/ProgramSummary";
import "../../components/ProgramDevelopment/components/ProgramDevelopmentPage1/ProgramDevelopmentPage1.css";
import "../../styles/button-styles.css";
import "./ProgramDevelopment.css";

type View = "programs" | "create" | "review" | "tracking";

export default function ProgramDevelopment() {
  const { projects, programs, saveProgram } = useShowcase();
  const [view, setView] = useState<View>("programs");
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [programName, setProgramName] = useState("");
  const [activeId, setActiveId] = useState("");
  const [notice, setNotice] = useState("");
  const building = view === "create" || view === "review";
  const activeProgram = programs.find(program => program.id === activeId);
  const memberIds = view === "tracking" && activeProgram ? activeProgram.projectIds : projectIds;
  const members = projects.filter(project => memberIds.includes(project.id));

  function open(next: View) {
    setView(next);
  }

  function startProgram() {
    if (!building) {
      setProjectIds([]);
      setProgramName("");
    }
    setNotice("");
    open("create");
  }

  function submitProgram(name: string) {
    if (!members.length || !name.trim()) return;
    const program: DemoProgram = {
      id: "program-" + (typeof crypto.randomUUID === "function" ? crypto.randomUUID() : crypto.getRandomValues(new Uint32Array(3)).join("-")),
      name: name.trim(),
      projectIds: members.map(project => project.id),
      tags: Array.from(new Set(members.map(project => project.type))),
      status: "Submitted",
    };
    saveProgram(program);
    setNotice(program.name + " was submitted for review.");
    open("programs");
  }

  return (
    <div className="main-content-container pd-shell">
      <nav className="sidebar-container pd-sidebar" aria-label="Program development">
        <button type="button" className={"sidebar-item-container pd-sidebar-button" + (!building ? " program-development-icon" : "")}
          aria-current={!building ? "page" : undefined} onClick={() => { setNotice(""); open("programs"); }}>
          {!building ? <ProgramIcon /> : <ProgramGrayIcon />}Programs
        </button>
        <div className="sidebar-hr" />
        <button type="button" className={"sidebar-item-container pd-sidebar-button" + (building ? " program-development-icon" : "")}
          aria-current={building ? "page" : undefined} onClick={startProgram}>
          {building ? <CreateIcon /> : <CreateGrayIcon />}Create New Program
        </button>
      </nav>
      <main className="pd-workspace">
          {view === "programs" && (
            <ProgramCatalog programs={programs} projects={projects} notice={notice} onCreate={startProgram}
              onOpen={id => { setActiveId(id); open("tracking"); }} />
          )}
          {view === "create" && (
            <ProgramBuilder projects={projects} projectIds={projectIds} setProjectIds={setProjectIds}
              onReview={() => {
                if (!programName.trim()) {
                  const types = Array.from(new Set(members.map(project => project.type)));
                  setProgramName((types.length <= 2 ? types.join(" and ") : "Multimodal") + " Improvements");
                }
                open("review");
              }} />
          )}
          {view === "review" && (
            <ProgramSummary members={members} draftName={programName} onName={setProgramName}
              onBack={() => open("create")} onSubmit={submitProgram} />
          )}
          {view === "tracking" && activeProgram && (
            <ProgramSummary members={members} program={activeProgram} onBack={() => open("programs")} />
          )}
      </main>
    </div>
  );
}
