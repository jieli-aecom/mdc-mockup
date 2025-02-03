import React from "react";

interface FilterIconProps extends React.SVGProps<SVGSVGElement> {
  strokeColor?: string;
  strokeWidth?: number;
}

const FilterIcon: React.FC<FilterIconProps> = ({
  strokeColor = "#263d8c",
  strokeWidth = 1.5,
  ...props
}) => (
  <svg
    width="19.47"
    height="17.52"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.47 19.52"
    aria-labelledby="filter-svg-icon"
    {...props}
  >
    <path
      d="M20.47 1H1l7.79 9.21v6.37l3.89 1.95v-8.31L20.47 1Z"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default FilterIcon;
