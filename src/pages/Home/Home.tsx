import React from "react";
import PerformanceDecisionSupport from "../../components/PerformanceDecisionSupport/PerformanceDecisionSupport";
import StrategicVision from "../../components/StrategicVision/StrategicVision";
import CountyBenefits from "../../components/CountyBenefits/CountyBenefits";
import DistrictBenefits from "../../components/DistrictBenefits/DistrictBenefits";
import Tabs from "../../components/Tabs/Tabs";
import Footer from "../../components/Footer/Footer";
import StarBorderIcon from "../../icons/StartBorderIcon";
import HomePageSection from "../../components/HomePageSection/HomePageSection";
import benefitImage from "../../assets/0_Home/image_benefit.png";

import "./Home.css";
import { DARK_BLUE, LIGHT_BRAY as LIGHT_GRAY } from "../../consts/colors";

const Home: React.FC = () => {
  return (
    <div className="home-wrapper">
      <PerformanceDecisionSupport />
      <StrategicVision />

      <HomePageSection image={benefitImage} backgroundColor={DARK_BLUE}>
        <CountyBenefits />
      </HomePageSection>

      <HomePageSection image={benefitImage} backgroundColor={LIGHT_GRAY} align="right">
        <CountyBenefits />
      </HomePageSection>

      <DistrictBenefits />
      <Tabs />
      <Footer />
    </div>
  );
};

export default Home;
