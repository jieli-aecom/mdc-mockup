import React from "react";
import "./StrategicVision.css";

const StrategicVision: React.FC = () => {
  return (
    <section className="strategic-container">
      <h2 className="strategic-title">Our Strategic Vision</h2>
      <div className="strategic-vision-items">
        <div className="strategic-vision-item">
          <div className="strategic-icon strategic-safe-icon"></div>
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
        <div className="strategic-vision-item">
          <div className="strategic-icon strategic-clean-icon"></div>
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
        <div className="strategic-vision-item">
          <div className="strategic-icon strategic-efficient-icon"></div>
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
        <div className="strategic-vision-item">
          <div className="strategic-icon strategic-connected-icon"></div>
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
