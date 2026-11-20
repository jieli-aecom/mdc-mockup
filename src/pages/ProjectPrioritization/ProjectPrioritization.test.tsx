import React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProjectPrioritization from "./ProjectPrioritization";
import { emptyInputs, evaluateProject, resolveTechnicalIntake, useShowcase } from "../../mockData/showcase";

const seedProjects = useShowcase.getState().projects;

afterEach(() => {
  useShowcase.setState({ projects: seedProjects });
  jest.useRealTimers();
});

function renderPortfolio() {
  return render(<MemoryRouter><ProjectPrioritization /></MemoryRouter>);
}

test("a new transit footprint and questionnaire produce one scored submission in the portfolio", () => {
  jest.useFakeTimers();
  renderPortfolio();
  fireEvent.click(screen.getByRole("button", { name: "Create Project" }));
  fireEvent.change(screen.getByLabelText("Project name"), { target: { value: "North corridor transit access" } });
  const map = screen.getByRole("group", { name: "Draw project footprint" });
  fireEvent.keyDown(map, { key: "Enter" });
  fireEvent.keyDown(map, { key: "ArrowUp" });
  fireEvent.keyDown(map, { key: "Enter" });
  const sections = screen.getByRole("combobox", { name: "Jump to section" });
  expect(within(sections).getAllByRole("option").length).toBeGreaterThanOrEqual(6);
  fireEvent.change(screen.getByLabelText(/Current running time \(min\)/), { target: { value: "36" } });
  fireEvent.change(screen.getByLabelText(/Projected running time \(min\)/), { target: { value: "30" } });
  fireEvent.change(screen.getByLabelText(/Estimated daily users/), { target: { value: "1850" } });
  fireEvent.change(screen.getByLabelText(/Crossings to upgrade/), { target: { value: "4" } });
  fireEvent.click(screen.getByLabelText(/Zero-emission service/));
  fireEvent.click(screen.getByRole("button", { name: "Submit project" }));

  expect(screen.getByRole("heading", { name: "Evaluating project" })).toBeInTheDocument();
  for (let stage = 0; stage < 4; stage++) act(() => { jest.advanceTimersByTime(750); });
  expect(screen.getByRole("heading", { name: "Project evaluation" })).toBeInTheDocument();
  expect(screen.getByText(/4 crossing upgrades/)).toBeInTheDocument();
  expect(screen.getByText("Clean fleet transition fund")).toBeInTheDocument();
  expect(screen.getByText("Count Metrobus Routes")).toBeInTheDocument();
  const project = useShowcase.getState().projects.find((p) => p.name === "North corridor transit access")!;
  expect(project.reviewStatus).toBe("Submitted");
  expect(project.geometry).toHaveLength(2);
  expect(project.technical).toMatchObject({ currentTravelMinutes: 36, plannedTravelMinutes: 30 });
  expect(project.benefit).toBeGreaterThan(0);

  fireEvent.click(screen.getByRole("button", { name: "Return to summary" }));
  expect(screen.getByRole("button", { name: "Edit North corridor transit access" })).toBeInTheDocument();
  expect(within(screen.getByRole("complementary", { name: "Selected project" })).getByText("Potential funding")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Edit North corridor transit access" }));
  expect(screen.getByLabelText("Project name")).toHaveValue("North corridor transit access");
  expect(screen.getByLabelText(/Current running time \(min\)/)).toHaveValue(36);
  expect(screen.getByLabelText(/Projected running time \(min\)/)).toHaveValue(30);
  expect(screen.getByText("2 vertices")).toBeInTheDocument();
});

test("a forecast improves efficiency only when the project has a comparable running time pair", () => {
  const corridor = {
    ...seedProjects.find((project) => project.id === "biscayne")!,
    id: "custom-corridor",
    inputs: { ...emptyInputs, routes: 1 },
    technical: undefined,
  };
  const unmeasured = evaluateProject(corridor);
  for (const [currentTravelMinutes, plannedTravelMinutes] of [[40, null], [null, 30], [0, 30]]) {
    const partial = evaluateProject({ ...corridor, technical: { currentTravelMinutes, plannedTravelMinutes } });
    expect(partial.goals.Efficient).toBe(unmeasured.goals.Efficient);
    expect(partial.benefit).toBe(unmeasured.benefit);
  }

  const technical = { currentTravelMinutes: 40, plannedTravelMinutes: 30 };
  const measured = evaluateProject({ ...corridor, technical });
  expect(measured.goals.Efficient).toBeGreaterThan(unmeasured.goals.Efficient);
  expect(measured.benefit).toBeGreaterThan(unmeasured.benefit);
  expect(measured.location).toBe(unmeasured.location);

  const training = { ...corridor, subtype: "Operator training" };
  expect(evaluateProject({ ...training, technical }).goals.Efficient).toBe(evaluateProject(training).goals.Efficient);
});

test("an existing portfolio receives the example forecasts without adding estimates to a user project", async () => {
  const example = seedProjects.find((project) => project.id === "biscayne")!;
  const legacy = { ...example, technical: undefined };
  const custom = { ...legacy, id: "custom-corridor", name: "Community access corridor" };
  localStorage.setItem("mdc-planning-portfolio", JSON.stringify({
    version: 1,
    state: { projects: [legacy, custom], programs: useShowcase.getState().programs },
  }));
  await useShowcase.persist.rehydrate();
  const [restoredExample, restoredCustom] = useShowcase.getState().projects;
  expect(resolveTechnicalIntake(restoredExample).currentTravelMinutes).toBeGreaterThan(0);
  expect(resolveTechnicalIntake(restoredCustom).currentTravelMinutes).toBeNull();
  expect(restoredCustom.benefit).toBe(custom.benefit);
});

test("opens project-specific feedback and distinguishes community ideas without a project", () => {
  renderPortfolio();
  const project = seedProjects.find((p) => p.reviewStatus === "Submitted" && p.comments.length)!;
  fireEvent.click(screen.getByRole("button", { name: `View ${project.comments.length} comments on ${project.name}` }));
  expect(screen.getByText(project.comments[0].text)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /Community ideas/ }));
  expect(screen.queryByText(project.comments[0].text)).toBeNull();
  expect(screen.getAllByText("Community idea · No linked project").length).toBeGreaterThan(0);
  const map = within(screen.getByRole("group", { name: "Map of public feedback" }));
  const list = within(screen.getByRole("complementary", { name: "Feedback panel" }));
  fireEvent.click(map.getByRole("button", { name: /Westchester/ }));
  expect(list.getByRole("button", { name: /Show feedback on map: Westchester/ })).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(list.getByRole("button", { name: /Show feedback on map: Little River/ }));
  expect(map.getByRole("button", { name: /Little River/ })).toHaveAttribute("aria-pressed", "true");
  expect(list.getByRole("button", { name: /Show feedback on map: Westchester/ })).toHaveAttribute("aria-pressed", "false");
  expect(map.queryByRole("button", { name: /Upper Eastside/ })).not.toBeInTheDocument();
});
