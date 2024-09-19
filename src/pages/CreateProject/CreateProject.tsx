import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import CreateProjectMain from "../../components/CreateProjectMain/CreateProjectMain";
import ProjectInfoInput from "../../components/ProjectInfoInput/ProjectInfoInput";
import "./CreateProject.css";

const CreateProject: React.FC = () => {
  return (
    <div className="main-content-container">
      {/* <SideBar /> */}
      <CreateProjectMain />
      <ProjectInfoInput />
    </div>
  );
};

export default CreateProject;
