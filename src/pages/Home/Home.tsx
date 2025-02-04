import React from "react";
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

const Home: React.FC = () => {
  return (
    <div className="home-wrapper">
      <PerformanceDecisionSupport />
      <StrategicVision />

      <HomePageSection image={benefitImage} backgroundColor={DARK_BLUE}>
        <CountyBenefits />
      </HomePageSection>

      <HomePageSection
        image={performanceTrackingImage}
        backgroundColor={WHITE}
        align="left"
        paddingSide="6rem"
        paddingTopDown="2rem"
      >
        <div className="home-sectionEntry-content-leftAlgn">
          <h2 className="home-sectionEntry-title" style={{ color: BLUE_GREEN }}>
            Performance Tracking
          </h2>
          <div className="home-sectionEntry-description">
            Displays performance for key performance indicators
          </div>
          <button className="mdc-homeDark-btn">
            <a
              href="/performance-tracking"
              target="_blank"
              rel="noopener noreferrer"
              title="Project Prioritization"
            >
              Explore
            </a>
          </button>
        </div>
      </HomePageSection>

      <HomePageSection
        image={projectPrioritizationImage}
        backgroundColor={LIGHT_GRAY}
        align="right"
        paddingSide="6rem"
        paddingTopDown="2rem"
      >
        <div className="home-sectionEntry-content-rightAlign">
          <h2
            className="home-sectionEntry-title"
            style={{ color: DARK_ORANGE }}
          >
            Project Prioritization
          </h2>
          <div className="home-sectionEntry-description">
            Assesses individual projects and compare projects to each other
          </div>
          <button className="mdc-homeDark-btn">
            <a
              href="/project-prioritization"
              target="_blank"
              rel="noopener noreferrer"
              title="Project Prioritization"
            >
              Explore
            </a>
          </button>
        </div>
      </HomePageSection>

      <HomePageSection
        image={programDevelopmentImage}
        backgroundColor={WHITE}
        align="left"
        paddingSide="6rem"
        paddingTopDown="2rem"
      >
        <div className="home-sectionEntry-content-leftAlgn">
          <h2 className="home-sectionEntry-title" style={{ color: DARK_GREEN }}>
            Program Development
          </h2>
          <div className="home-sectionEntry-description">
            Evaluates the aggregated impact of mulitple projects to visualize
            alignment in equity and policy
          </div>
          <button className="mdc-homeDark-btn">
            <a
              href="/program-development"
              target="_blank"
              rel="noopener noreferrer"
              title="Project Prioritization"
            >
              Explore
            </a>
          </button>
        </div>
      </HomePageSection>

      <HomePageSection
        image={resourcesImage}
        backgroundColor={LIGHT_GRAY}
        align="right"
        paddingSide="6rem"
        paddingTopDown="2rem"
      >
        <div className="home-sectionEntry-content-rightAlign">
          <h2
            className="home-sectionEntry-title"
            style={{ color: BRIGHT_RED }}
          >
            Resources
          </h2>
          <div className="home-sectionEntry-description">
          Provides access to relevant datasets and technical documents
          </div>
          <button className="mdc-homeDark-btn">
            <a
              href="/resources"
              target="_blank"
              rel="noopener noreferrer"
              title="Project Prioritization"
            >
              Explore
            </a>
          </button>
        </div>
      </HomePageSection>
      <Footer />
    </div>
  );
};

export default Home;
