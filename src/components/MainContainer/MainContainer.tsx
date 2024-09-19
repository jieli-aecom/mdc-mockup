import React from "react";
import type { PropsWithChildren } from "react";
import "./MainContainer.css";

const MainContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="main-container">{children}</div>;
};

export default MainContainer;
