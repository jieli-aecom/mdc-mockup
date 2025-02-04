import React from "react";
import StarBorderIcon from "../../icons/StartBorderIcon";
import benefitImage from "../../assets/0_Home/image_benefit.png";
import "./CountyBenefits.css";

const CountyBenefits: React.FC = () => {
  return (
    <section className="county-benefits-container">
      <img src={benefitImage} alt="Icon" className="county-benefits-image" />
      <div className="county-benefits-benefits-content">
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
      </div>
    </section>
  );
};

export default CountyBenefits;
