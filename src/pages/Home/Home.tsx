import React from "react";
import PerformanceDecisionSupport from "../../components/PerformanceDecisionSupport/PerformanceDecisionSupport";
import StrategicVision from "../../components/StrategicVision/StrategicVision";
import CountyBenefits from "../../components/CountyBenefits/CountyBenefits";
import DistrictBenefits from "../../components/DistrictBenefits/DistrictBenefits";
import Tabs from "../../components/Tabs/Tabs";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div>
      <PerformanceDecisionSupport />
      <StrategicVision />
      <CountyBenefits />
      <DistrictBenefits />
      <Tabs />
      <Footer />
    </div>
  );
};

export default Home;
