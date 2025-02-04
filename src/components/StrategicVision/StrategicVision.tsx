import React from "react";
import safeIcon from "../../assets/0_Home/Safe.svg";
import cleanIcon from "../../assets/0_Home/Clean.svg";
import efficientIcon from "../../assets/0_Home/Efficient.svg";
import connectedIcon from "../../assets/0_Home/Connected.svg";
import "./StrategicVision.css";

const StrategicVision: React.FC = () => {
  return (
    <section className="strategic-container">
      <h2 className="strategic-title">Our Strategic Vision</h2>
      <div className="strategic-vision-items">

        {/* Safe */}
        <div className="strategic-vision-item">
          <img src={safeIcon} alt="Safe Icon" className="strategic-icon" />
          <h3 className="strategic-vision-title strategic-safe-title">Safe</h3>
          <hr className="strategic-vision-line strategic-safe-line" />
          <p className="strategic-vision-description">
            Promoting a culture of safety and security by making Miami-Dade
            streets, paths and transportation services
            <strong>
              {" "}
              accessible to all and driven by data to ensure the highest quality
              of service.
            </strong>
          </p>
        </div>

        {/* Clean */}
        <div className="strategic-vision-item">
        <img src={cleanIcon} alt="Clean Icon" className="strategic-icon" />
          <h3 className="strategic-vision-title strategic-clean-title">
            Clean
          </h3>
          <hr className="strategic-vision-line strategic-clean-line" />
          <p className="strategic-vision-description">
            Delivering transportation in Miami-Dade that is{" "}
            <strong>
              resilient to climate impacts now and sustainable for future
              generations.
            </strong>
          </p>
        </div>

        {/* Efficient */}
        <div className="strategic-vision-item">
        <img src={efficientIcon} alt="Efficient Icon" className="strategic-icon" />
          <h3 className="strategic-vision-title strategic-efficient-title">
            Efficient
          </h3>
          <hr className="strategic-vision-line strategic-efficient-line" />
          <p className="strategic-vision-description">
            Committed to utilizing Miami-Dade County’s street space, data and
            operations to{" "}
            <strong>
              minimize travel time and cost, and to maximize quality of life.
            </strong>
          </p>
        </div>

        {/* Connected */}
        <div className="strategic-vision-item">
        <img src={connectedIcon} alt="Connected Icon" className="strategic-icon" />
          <h3 className="strategic-vision-title strategic-connected-title">
            Connected
          </h3>
          <hr className="strategic-vision-line strategic-connected-line" />
          <p className="strategic-vision-description">
            Providing Miami-Dade residents, workers and visitors a{" "}
            <strong>
              transportation network that allows them to readily get to the
              places they choose to work, play and learn.
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default StrategicVision;
