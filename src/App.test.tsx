import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";

test("opens the project portfolio from Home and shows the modules in recording order", () => {
  render(<App />);
  const nav = within(screen.getByRole("navigation"));
  expect(nav.getAllByRole("link").map(link => link.textContent)).toEqual([
    "HOME", "PROJECT PRIORITIZATION", "PROGRAM DEVELOPMENT", "PERFORMANCE TRACKING", "RESOURCES",
  ]);
  expect(screen.getByRole("heading", {name:"Our Strategic Vision"})).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", {name:"Get Started"}));
  expect(screen.getByRole("heading", {name:"Summary"})).toBeInTheDocument();
});
