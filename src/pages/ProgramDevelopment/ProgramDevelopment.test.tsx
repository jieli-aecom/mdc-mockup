import { fireEvent, render, screen, within } from "@testing-library/react";
import { useShowcase } from "../../mockData/showcase";
import ProgramDevelopment from "./ProgramDevelopment";

const initialPortfolio = useShowcase.getState();

afterEach(() => {
  useShowcase.setState({ programs: initialPortfolio.programs, projects: initialPortfolio.projects });
});

test("the catalog maps filtered programs and identifies the programs containing a mapped project", () => {
  render(<ProgramDevelopment />);
  const map = within(screen.getByRole("complementary", { name: "Program map" }));
  fireEvent.change(screen.getByLabelText("Review status"), { target: { value: "Completed" } });
  expect(map.getAllByRole("button", { name: /^Show / })).toHaveLength(2);
  fireEvent.click(map.getByRole("button", { name: "Show Hialeah safer school crossings" }));
  expect(screen.getByText("Includes Hialeah safer school crossings")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Walking and cycling connections" }));
  const members = within(screen.getByRole("complementary", { name: "Member project locations" }));
  fireEvent.click(members.getByRole("button", { name: "Show Miami Beach protected bikeway" }));
  expect(screen.getByRole("button", { name: "Miami Beach protected bikeway" })).toHaveAttribute("aria-expanded", "true");
});

test("inspecting projects on the map preserves the chosen bundle and review maps its members", () => {
  render(<ProgramDevelopment />);
  fireEvent.click(within(screen.getByRole("main")).getByRole("button", { name: "Create New Program" }));
  const map = within(screen.getByRole("complementary", { name: "Project locations" }));
  fireEvent.click(screen.getByRole("checkbox", { name: "Select Biscayne Boulevard bus priority" }));
  fireEvent.click(map.getByRole("button", { name: "Show Bus operator safety workshops" }));
  expect(screen.getByRole("button", { name: "Bus operator safety workshops" })).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("checkbox", { name: "Select Bus operator safety workshops" })).not.toBeChecked();
  fireEvent.click(screen.getByRole("button", { name: "Review bundle" }));
  const members = within(screen.getByRole("complementary", { name: "Member project locations" }));
  expect(members.getAllByRole("button", { name: /^Show / })).toHaveLength(1);
  expect(members.getByRole("button", { name: "Show Biscayne Boulevard bus priority" })).toBeInTheDocument();
});

test("editing a bundle updates its existing record, catalog and member map", () => {
  render(<ProgramDevelopment />);
  fireEvent.click(screen.getByRole("button", { name: "Transit access and reliability" }));
  fireEvent.click(screen.getByRole("button", { name: "Edit bundle" }));
  const remove = screen.getByRole("checkbox", { name: "Select South Dade electric bus facilities" });
  const add = screen.getByRole("checkbox", { name: "Select Miami Beach protected bikeway" });
  expect(remove).toBeChecked();
  expect(add).not.toBeChecked();
  fireEvent.click(remove);
  fireEvent.click(add);
  fireEvent.click(screen.getByRole("button", { name: "Review bundle" }));
  const name = screen.getByRole("textbox", { name: "Program name" });
  expect(name).toHaveValue("Transit access and reliability");
  fireEvent.change(name, { target: { value: "Transit and bikeway access" } });
  fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

  expect(screen.getByRole("heading", { name: "Transit and bikeway access" })).toBeInTheDocument();
  const map = within(screen.getByRole("complementary", { name: "Member project locations" }));
  expect(map.getByRole("button", { name: "Show Miami Beach protected bikeway" })).toBeInTheDocument();
  expect(map.queryByRole("button", { name: "Show South Dade electric bus facilities" })).not.toBeInTheDocument();
  const programs = useShowcase.getState().programs;
  expect(programs).toHaveLength(initialPortfolio.programs.length);
  const edited = programs.find(program => program.id === "transit-access")!;
  expect(edited).toMatchObject({ name: "Transit and bikeway access", status: "Approved" });
  expect([...edited.projectIds].sort()).toEqual(["beach", "flagler", "training"]);
  expect(edited.tags).toEqual(expect.arrayContaining(["Accessibility", "Bike"]));
  fireEvent.click(screen.getByRole("button", { name: "Back to programs" }));
  expect(screen.getByRole("button", { name: edited.name })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Transit access and reliability" })).not.toBeInTheDocument();
});

test("canceling bundle edits discards both membership and name changes", () => {
  render(<ProgramDevelopment />);
  fireEvent.click(screen.getByRole("button", { name: "Neighborhood safe routes" }));
  fireEvent.click(screen.getByRole("button", { name: "Edit bundle" }));
  fireEvent.click(screen.getByRole("checkbox", { name: "Select Miami Beach protected bikeway" }));
  fireEvent.click(screen.getByRole("button", { name: "Review bundle" }));
  fireEvent.change(screen.getByRole("textbox", { name: "Program name" }), { target: { value: "Unsaved name" } });
  fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

  expect(screen.getByRole("heading", { name: "Neighborhood safe routes" })).toBeInTheDocument();
  const map = within(screen.getByRole("complementary", { name: "Member project locations" }));
  expect(map.getByRole("button", { name: "Show Miami Beach protected bikeway" })).toBeInTheDocument();
  expect(useShowcase.getState().programs).toEqual(initialPortfolio.programs);
});

test("deleting a bundle requires confirmation and preserves its projects and other bundles", () => {
  // jsdom has the dialog element but does not implement its native modal methods.
  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function () { this.open = true; };
    HTMLDialogElement.prototype.close = function () {
      this.open = false;
      this.dispatchEvent(new Event("close"));
    };
  }
  render(<ProgramDevelopment />);
  const bundleName = "Walking and cycling connections";
  fireEvent.click(screen.getByRole("button", { name: bundleName }));
  const trigger = screen.getByRole("button", { name: "Delete bundle" });
  fireEvent.click(trigger);
  let confirmation = screen.getByRole("alertdialog", { name: "Delete bundle?" });
  expect(confirmation).toHaveTextContent(bundleName);
  fireEvent.click(within(confirmation).getByRole("button", { name: "Cancel" }));
  expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: bundleName })).toBeInTheDocument();
  expect(useShowcase.getState().programs).toEqual(initialPortfolio.programs);
  fireEvent.click(trigger);
  confirmation = screen.getByRole("alertdialog", { name: "Delete bundle?" });
  fireEvent.click(within(confirmation).getByRole("button", { name: "Delete bundle" }));

  expect(screen.getByRole("heading", { name: "Programs" })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: bundleName })).not.toBeInTheDocument();
  const portfolio = useShowcase.getState();
  expect(portfolio.projects).toEqual(initialPortfolio.projects);
  expect(portfolio.programs).toEqual(initialPortfolio.programs.filter(program => program.id !== "walking-cycling"));
  fireEvent.click(screen.getByRole("button", { name: "Neighborhood safe routes" }));
  const shared = within(screen.getByRole("complementary", { name: "Member project locations" }));
  expect(shared.getByRole("button", { name: "Show Miami Beach protected bikeway" })).toBeInTheDocument();
});
