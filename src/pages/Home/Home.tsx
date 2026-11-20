import React from "react";
import { Link } from "react-router-dom";
import PerformanceDecisionSupport from "../../components/PerformanceDecisionSupport/PerformanceDecisionSupport";
import StrategicVision from "../../components/StrategicVision/StrategicVision";
import CountyBenefits from "../../components/CountyBenefits/CountyBenefits";
import Footer from "../../components/Footer/Footer";
import HomePageSection from "../../components/HomePageSection/HomePageSection";
import benefitImage from "../../assets/0_Home/image_benefit.png";
import projectPrioritizationImage from "../../assets/0_Home/project_prioritization.png";
import performanceTrackingImage from "../../assets/0_Home/performance-tracking.png";
import programDevelopmentImage from "../../assets/0_Home/program-development.png";
import resourcesImage from "../../assets/0_Home/resources.png";
import "./Home.css";
import {
  BLUE_GREEN,
  BRIGHT_RED,
  DARK_BLUE,
  DARK_GREEN,
  DARK_ORANGE,
  LIGHT_GRAY,
  WHITE,
} from "../../consts/colors";

const modules = [
  { title: "Project Prioritization", image: projectPrioritizationImage, color: DARK_ORANGE, link: "/project-prioritization",
    description: "Compare project scores, funding opportunities and public feedback." },
  { title: "Program Development", image: programDevelopmentImage, color: DARK_GREEN, link: "/program-development",
    description: "Bundle projects and evaluate their combined contribution to county goals." },
  { title: "Performance Tracking", image: performanceTrackingImage, color: BLUE_GREEN, link: "/performance-tracking",
    description: "Track the performance of projects and programs across the four strategic goals." },
  { title: "Resources", image: resourcesImage, color: BRIGHT_RED, link: "/resources",
    description: "Access relevant datasets and technical documents." },
];

const Home: React.FC = () => {
  return (
    <div className="home-wrapper">
      <PerformanceDecisionSupport />
      <StrategicVision />

      <HomePageSection image={benefitImage} backgroundColor={DARK_BLUE}>
        <CountyBenefits />
      </HomePageSection>

      {modules.map(({ title, image, color, description, link }, index) => {
        const left = index % 2 === 0;
        return (
          <HomePageSection key={link} image={image} backgroundColor={left ? WHITE : LIGHT_GRAY}
            align={left ? "left" : "right"} paddingSide="6rem" paddingTopDown="2rem">
            <div className={left ? "home-sectionEntry-content-leftAlgn" : "home-sectionEntry-content-rightAlign"}>
              <h2 className="home-sectionEntry-title" style={{color}}>{title}</h2>
              <div className="home-sectionEntry-description">{description}</div>
              <Link className="mdc-homeDark-btn home-explore" to={link} aria-label={"Explore " + title}>Explore</Link>
            </div>
          </HomePageSection>
        );
      })}
      <Footer />
    </div>
  );
};

export default Home;
