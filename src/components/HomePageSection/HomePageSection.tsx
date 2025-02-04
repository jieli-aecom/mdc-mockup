import "./HomePageSection.css";

export interface HomePageSectionProps {
  image: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  align?: "left" | "right";
}

const HomePageSection: React.FC<HomePageSectionProps> = ({
  align = "left",
  image,
  backgroundColor,
  children,
}) => {
  return (
    <section className="homepage-section-container">
      {align === "left" && <img src={image} alt="Icon" className="homepage-section-image" />}
      <div
        className="homepage-section-benefits-content"
        style={{ backgroundColor: backgroundColor }}
      >
        {children}
      </div>
      {align === "right" && <img src={image} alt="Icon" className="homepage-section-image" />}
    </section>
  );
};

export default HomePageSection;
