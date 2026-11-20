import { fireEvent, render, screen, within } from "@testing-library/react";
import PerformanceTracking from "./PerformanceTracking";

test("a project included directly and through a program contributes only once", () => {
  render(<PerformanceTracking />);
  fireEvent.click(screen.getByRole("button", { name: "Completed" }));
  const results = screen.getByRole("region", { name: "Safe portfolio indicators" });
  const map = within(screen.getByRole("complementary", { name: "Tracked project map" }));
  expect(results).toHaveTextContent("1 of 4 included projects in view");
  expect(map.getAllByRole("button", { name: /^Show / })).toHaveLength(1);

  // Hialeah is selected directly and is also a member of Neighborhood safe routes.
  fireEvent.click(screen.getByRole("button", { name: "Add Neighborhood safe routes to view" }));
  expect(results).toHaveTextContent("2 of 6 included projects in view");
  expect(map.getAllByRole("button", { name: /^Show / })).toHaveLength(2);
  fireEvent.click(map.getByRole("button", { name: "Show Hialeah safer school crossings" }));
  expect(screen.getByRole("button", { name: "Hialeah safer school crossings" })).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(screen.getByRole("button", { name: "Miami Beach protected bikeway" }));
  expect(map.getByRole("heading", { name: "Miami Beach protected bikeway" })).toBeInTheDocument();
  const crossings = within(results).getAllByRole("article").find(card =>
    within(card).queryByRole("heading", { name: "Crossing improvements" }));
  expect(crossings).toHaveTextContent("12 in completed projects");

  fireEvent.click(screen.getByRole("button", { name: "Remove Hialeah safer school crossings from view" }));
  expect(results).toHaveTextContent("2 of 6 included projects in view");
  fireEvent.click(screen.getByRole("button", { name: "CLEAN" }));
  expect(screen.getByRole("region", { name: "Clean portfolio indicators" })).toHaveTextContent("2 of 6 included projects in view");
});

test("drags a source into the view and back to the library", () => {
  render(<PerformanceTracking />);
  const library = screen.getByRole("region", { name: "Available to add" });
  const included = screen.getByRole("region", { name: "Included in this view" });
  const values = new Map<string, string>();
  const dataTransfer = {
    setData: (format: string, value: string) => values.set(format, value),
    getData: (format: string) => values.get(format),
  };
  const name = "Neighborhood safe routes";
  fireEvent.dragStart(within(library).getByText(name), { dataTransfer });
  fireEvent.dragOver(included, { dataTransfer });
  fireEvent.drop(included, { dataTransfer });
  expect(within(included).getByText(name)).toBeInTheDocument();
  fireEvent.dragStart(within(included).getByText(name), { dataTransfer });
  fireEvent.drop(library, { dataTransfer });
  expect(within(library).getByText(name)).toBeInTheDocument();
});
