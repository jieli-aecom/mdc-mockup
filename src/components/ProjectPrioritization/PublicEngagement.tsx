import { useMemo, useRef, useState } from "react";
import PortfolioMap, { PortfolioMapMarker } from "../PortfolioMap/PortfolioMap";
import { communityIdeas, DemoProject, feedbackLocation, PublicComment } from "../../mockData/showcase";
import "./PublicEngagement.css";

const views = ["All feedback", "Project comments", "Community ideas"] as const;
type FeedbackView = typeof views[number];

interface FeedbackEntry {
  id: string;
  comment: PublicComment;
  project?: DemoProject;
}

interface Props {
  projects: DemoProject[];
  initialProjectId: string;
  onProject: (id: string) => void;
}

const commentColor = "#263c8c";
const ideaColor = "#c94a17";
const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" });

export default function PublicEngagement({ projects, initialProjectId, onProject }: Props) {
  const [view, setView] = useState<FeedbackView>(initialProjectId ? "Project comments" : "All feedback");
  const [projectId, setProjectId] = useState(initialProjectId);
  const [selectedId, setSelectedId] = useState("");
  const feed = useRef<HTMLDivElement>(null);
  const cards = useRef(new Map<string, HTMLElement>());

  const feedback = useMemo<FeedbackEntry[]>(() => {
    const linked = projects.flatMap(project => project.comments.map((comment, i) =>
      ({ id: project.id + "-comment-" + i, comment, project })));
    const ideas = communityIdeas.map((comment, i) => ({ id: "community-idea-" + i, comment }));
    return [...linked, ...ideas].sort((a, b) => b.comment.date.localeCompare(a.comment.date));
  }, [projects]);

  const items = useMemo(() => feedback.filter(item => {
    if (view === "All feedback") return true;
    if (view === "Community ideas") return !item.project;
    return item.project && (!projectId || item.project.id === projectId);
  }), [feedback, view, projectId]);

  const markers = useMemo(() => items.flatMap(({ id, comment, project }): PortfolioMapMarker[] => {
    const point = feedbackLocation(comment, project?.geometry);
    return point ? [{ id, point, label: comment.location + " · " + comment.author, color: project ? commentColor : ideaColor }] : [];
  }), [items]);

  const mapProjects = useMemo(() => {
    const visible = new Set(items.map(item => item.project?.id));
    return projects.filter(project => visible.has(project.id) || project.id === projectId);
  }, [items, projects, projectId]);
  const selected = items.find(item => item.id === selectedId);
  const counts = [feedback.length, feedback.length - communityIdeas.length, communityIdeas.length];

  function changeView(nextView: FeedbackView, nextProjectId = "") {
    setView(nextView);
    setProjectId(nextProjectId);
    setSelectedId("");
    if (feed.current) feed.current.scrollTop = 0;
  }

  function selectFromMap(id: string) {
    setSelectedId(id);
    const card = cards.current.get(id);
    if (card && feed.current) {
      feed.current.scrollTop += card.getBoundingClientRect().top - feed.current.getBoundingClientRect().top;
    }
  }

  return (
    <section className="pp-engagement" aria-labelledby="engagement-title">
      <header className="pp-engagement-header">
        <h1 id="engagement-title">Public engagement</h1>
        <nav aria-label="Feedback views">
          {views.map((label, i) => (
            <button key={label} type="button" aria-pressed={view === label} onClick={() => changeView(label)}>
              {label} <span>{counts[i]}</span>
            </button>
          ))}
        </nav>
      </header>
      <div className="pp-engagement-workspace">
        <div className="pp-engagement-map">
          <PortfolioMap
            projects={mapProjects}
            markers={markers}
            selectedMarkerId={selected?.id}
            selectedId={selected?.project?.id || ""}
            onMarkerSelect={selectFromMap}
            onSelect={id => selectFromMap(items.find(item => item.project?.id === id)?.id || "")}
            showProjectPopup={false}
            fitToFeatures
            ariaLabel="Map of public feedback"
          />
          <div className="pp-feedback-key" aria-label="Map legend">
            <span><i style={{ background: commentColor }} />Project comment</span>
            <span><i style={{ background: ideaColor }} />Community idea</span>
          </div>
        </div>
        <aside className="pp-feedback-panel" aria-label="Feedback panel">
          <header>
            <h2>Feedback <span>{items.length}</span></h2>
            {view === "Project comments" && <label>Project
              <select value={projectId} onChange={event => changeView(view, event.target.value)}>
                <option value="">All projects</option>
                {projects.map(project => <option key={project.id} value={project.id}>{project.name}</option>)}
              </select>
            </label>}
          </header>
          <div className="pp-feed" ref={feed}>
            {items.map(({ id, comment, project }) => (
              <article key={id} ref={node => {
                if (node) cards.current.set(id, node);
                else cards.current.delete(id);
              }} className={id === selectedId ? "is-selected" : ""}>
                <button type="button" className="pp-feedback-select" aria-pressed={id === selectedId}
                  aria-label={"Show feedback on map: " + comment.location + ", " + comment.author}
                  onClick={() => setSelectedId(id)}>
                  <span className="pp-feedback-site"><i style={{ background: project ? commentColor : ideaColor }} />{comment.location}</span>
                  <span className="pp-feedback-meta"><b>{comment.author}</b><time dateTime={comment.date}>{dateFormat.format(new Date(comment.date + "T12:00:00"))}</time></span>
                  <span className="pp-feedback-text">{comment.text}</span>
                </button>
                {project
                  ? <button type="button" className="pp-feedback-project" onClick={() => onProject(project.id)}>{project.name} →</button>
                  : <span className="pp-idea-label">Community idea · No linked project</span>}
              </article>
            ))}
            {!items.length && <div className="pp-feedback-empty"><h3>No public comments yet</h3>
              <button className="pp-secondary" onClick={() => changeView("Project comments")}>View all project comments</button>
            </div>}
          </div>
        </aside>
      </div>
    </section>
  );
}
