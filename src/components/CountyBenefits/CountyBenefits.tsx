import React from "react";
import StarBorderIcon from "../../icons/StartBorderIcon";
import "./CountyBenefits.css";

const CountyBenefits: React.FC = () => {
  return (
    <>
      <h2 className="county-benefits-title">Benefits of the Platform</h2>
      <ul className="county-benefits-benefit-list">
        <li>
          <div className="county-benefits-icon-box">
            <StarBorderIcon />
          </div>
          Promotes accountability and transparency
        </li>
        <li>
          <div className="county-benefits-icon-box">
            <StarBorderIcon />
          </div>
          Enables data-driven decision-making
        </li>
        <li>
          <div className="county-benefits-icon-box">
            <StarBorderIcon />
          </div>
          Identifies and addresses inefficiencies
        </li>
        <li>
          <div className="county-benefits-icon-box">
            <StarBorderIcon />
          </div>
          Aligns activities with strategic priorities
        </li>{" "}
        <li>
          <div className="county-benefits-icon-box">
            <StarBorderIcon />
          </div>
          Builds public trust
        </li>
      </ul>
    </>
  );
};

export default CountyBenefits;
