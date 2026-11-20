import { fireEvent, render, screen, within } from "@testing-library/react";
import ProgramDevelopment from "./ProgramDevelopment";

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
