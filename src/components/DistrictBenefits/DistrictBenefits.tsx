import React from "react";
import StarBorderIcon from "../../icons/StartBorderIcon";
import "./DistrictBenefits.css";

const DistrictBenefits: React.FC = () => {
  return (
    <section className="district-benefits-container">
      <div className="district-benefits-content">
        <h2 className="district-benefits-title">District Benefits</h2>
        <ul className="district-benefit-list">
          <li>
            <div className="district-benefits-star-icon">
              <StarBorderIcon />
            </div>
            Benefit 1
          </li>
          <li>
            <div className="district-benefits-star-icon">
              <StarBorderIcon />
            </div>
            Benefit 2
          </li>
          <li>
            <div className="district-benefits-star-icon">
              <StarBorderIcon />
            </div>
            Benefit 3
          </li>
          <li>
            <div className="district-benefits-star-icon">
              <StarBorderIcon />
            </div>
            Benefit 4
          </li>
        </ul>
      </div>
      <div className="district-benefits-icon-container">
        <img
          src="benefit-icon.png"
          alt="Icon"
          className="district-benefits-icon"
        />
      </div>
    </section>
  );
};

export default DistrictBenefits;
