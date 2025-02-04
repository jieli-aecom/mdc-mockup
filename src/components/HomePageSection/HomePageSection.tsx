import "./HomePageSection.css";
import benefitImage from "../../assets/0_Home/image_benefit.png";
import StarBorderIcon from "../../icons/StartBorderIcon";
import StartBorderIcon from "../../icons/StartBorderIcon";

export interface HomePageSectionProps {
  image: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

const HomePageSection: React.FC<HomePageSectionProps> = ({
  image,
  backgroundColor,
  children,
}) => {
  return (
    <section className="homepage-section-container">
      <img src={image} alt="Icon" className="homepage-section-image" />
      <div
        className="homepage-section-benefits-content"
        style={{ backgroundColor: backgroundColor }}
      >
        {children}
      </div>
    </section>
  );
};

export default HomePageSection;
