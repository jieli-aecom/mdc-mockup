import React from "react";
import StarBorderIcon from "../../icons/StartBorderIcon";
import "./CountyBenefits.css";

const CountyBenefits: React.FC = () => {
  return (
    <section className="county-benefits-container">
      <div className="county-benefits-icon-container">
        <img
          src="benefit-icon.png"
          alt="Icon"
          className="county-benefits-icon"
        />
      </div>
      <div className="county-benefits-benefits-content">
        <h2 className="county-benefits-title">County-Wide Benefits</h2>
        <ul className="county-benefits-benefit-list">
          <li>
            <div className="county-benefits-icon-box">
              <StarBorderIcon />
            </div>
            Benefit 1
          </li>
          <li>
            <div className="county-benefits-icon-box">
              <StarBorderIcon />
            </div>
            Benefit 2
          </li>
          <li>
            <div className="county-benefits-icon-box">
              <StarBorderIcon />
            </div>
            Benefit 3
          </li>
          <li>
            <div className="county-benefits-icon-box">
              <StarBorderIcon />
            </div>
            Benefit 4
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CountyBenefits;
