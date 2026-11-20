import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import PortfolioMap from "./PortfolioMap";

test("wheel zoom stays anchored to the pointer and consumes scrolling over the map", () => {
  render(<PortfolioMap projects={[]} />);
  const surface = screen.getByRole("group", { name: "Map of Miami-Dade projects" });
  jest.spyOn(surface, "getBoundingClientRect").mockReturnValue({
    x: 100, y: 50, left: 100, top: 50, right: 520, bottom: 550,
    width: 420, height: 500, toJSON: () => ({}),
  });
  const viewBox = () => surface.getAttribute("viewBox")!.split(" ").map(Number);
  const [x, y, width, height] = viewBox();
  // The pointer is three quarters across the map and one quarter down.
  const wheel = {clientX: 415, clientY: 175, cancelable: true};
  const zoomIn = createEvent.wheel(surface, {...wheel, deltaY: -3, deltaMode: 1});
  fireEvent(surface, zoomIn);

  const [newX, newY, newWidth, newHeight] = viewBox();
  expect(zoomIn.defaultPrevented).toBe(true);
  expect(newWidth).toBeLessThan(width);
  expect(newX + 0.75 * newWidth).toBeCloseTo(x + 0.75 * width);
  expect(newY + 0.25 * newHeight).toBeCloseTo(y + 0.25 * height);
  fireEvent.wheel(surface, {...wheel, deltaY: 48, deltaMode: 0});
  expect(viewBox()[2]).toBeCloseTo(width);
  expect(viewBox()[0]).toBeCloseTo(x);
});
