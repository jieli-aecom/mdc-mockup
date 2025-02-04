import "./HomePageSection.css";

export interface HomePageSectionProps {
  image: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  align?: "left" | "right";
  paddingSide?: string;
  paddingTopDown?: string;
}

const HomePageSection: React.FC<HomePageSectionProps> = ({
  align = "left",
  image,
  backgroundColor,
  paddingSide = "0",
  paddingTopDown = "0",
  children,
}) => {
  const imageContainer = (
    <img src={image} alt="Icon" className="homepage-section-image" />
  );
  return (
    <section
      className="homepage-section-container"
      style={{
        backgroundColor: backgroundColor,
        paddingLeft: paddingSide,
        paddingRight: paddingSide,
        paddingTop: paddingTopDown,
        paddingBottom: paddingTopDown,
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      {align === "left" && imageContainer}
      <div className="homepage-section-benefits-content" style={{}}>
        {children}
      </div>
      {align === "right" && imageContainer}
    </section>
  );
};

export default HomePageSection;
