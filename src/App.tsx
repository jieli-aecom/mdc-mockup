import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MainContainer from "./components/MainContainer/MainContainer";
import Home from "./pages/Home/Home";
import PerformanceTracking from "./pages/PerformanceTracking/PerformanceTracking";
import ProjectPrioritization from "./pages/ProjectPrioritization/ProjectPrioritization";
import ProjectInfo from "./pages/ProjectInfo/ProjectInfo";
import ProgramDevelopment from "./pages/ProgramDevelopment/ProgramDevelopment";
// import CreateProject from "./pages/CreateProject/CreateProject";
// import ProjectAggregation from "./pages/ProjectAggregation/ProjectAggregation";
import ResourcePage from "./pages/ResourcePage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <MainContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/performance-tracking"
            element={<PerformanceTracking />}
          />
          <Route
            path="/project-prioritization"
            element={<ProjectPrioritization />}
          />
          <Route path="/project-info" element={<ProjectInfo />} />
          <Route path="/program-development" element={<ProgramDevelopment />} />
          <Route path="/resources" element={<ResourcePage />} />
          {/* <Route path="create-project" element={<CreateProject />} />
          <Route path="project-aggregation" element={<ProjectAggregation />} />
          <Route path="resources" element={<Resources />} /> */}
        </Routes>
      </MainContainer>
    </Router>
  );
};

export default App;
