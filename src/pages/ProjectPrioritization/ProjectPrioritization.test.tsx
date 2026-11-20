import React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProjectPrioritization from "./ProjectPrioritization";
import { useShowcase } from "../../mockData/showcase";

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
  fireEvent.click(screen.getByRole("button", { name: /Continue/ }));
  fireEvent.change(screen.getByLabelText(/Estimated daily users/), { target: { value: "1850" } });
  fireEvent.change(screen.getByLabelText(/Crossings to upgrade/), { target: { value: "4" } });
  fireEvent.click(screen.getByRole("button", { name: /Continue/ }));
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
  expect(project.benefit).toBeGreaterThan(0);

  fireEvent.click(screen.getByRole("button", { name: "Return to summary" }));
  expect(screen.getByRole("button", { name: "Edit North corridor transit access" })).toBeInTheDocument();
  expect(within(screen.getByRole("complementary", { name: "Selected project" })).getByText("Potential funding")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Edit North corridor transit access" }));
  expect(screen.getByLabelText("Project name")).toHaveValue("North corridor transit access");
  expect(screen.getByText("2 vertices")).toBeInTheDocument();
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
