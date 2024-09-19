import React, { useState } from "react";
import "./CreateProjectMain.css";

const CreateProjectMain: React.FC = () => {
  const buttonTypes = ["A", "B", "C"];
  const [selectedButton, setSelectedButton] = useState("");

  return (
    <div className="create-project-main-container">
      <h2>Create Project</h2>
      <p className="create-project-main-text">
        Select a geometry type and draw your project.
      </p>
      <div className="create-project-main-buttons">
        {buttonTypes.map((buttonType) => (
          <div
            key={`buttonType-${buttonType}`}
            className={`create-project-main-button${
              buttonType === selectedButton
                ? " create-project-main-selected-button"
                : ""
            }`}
            onClick={() => setSelectedButton(buttonType)}
          >
            {buttonType}
          </div>
        ))}
      </div>
      <div className="create-project-main-map"></div>
    </div>
  );
};

export default CreateProjectMain;
