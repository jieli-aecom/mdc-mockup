import React from "react";

interface BackIconProps extends React.SVGProps<SVGSVGElement> {
  strokeColor?: string;
  strokeWidth?: number;
}

const BackIcon: React.FC<BackIconProps> = ({
  color = "#263d8c",
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
      d="m12.718 4.707-1.413-1.415L2.585 12l8.72 8.707 1.413-1.415L6.417 13H20v-2H6.416l6.302-6.293z"
      fill={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BackIcon;
