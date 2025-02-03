import React from "react";

interface BackIconProps extends React.SVGProps<SVGSVGElement> {
  strokeColor?: string;
  strokeWidth?: number;
}

const MinusIcon: React.FC<BackIconProps> = ({ color = "#263d8c", ...props }) => (
  <svg
    enableBackground="new 0 0 50 50"
    width="100%"
    height="100%"
    id="Layer_1"
    version="1.1"
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="none" height="50" width="50" />
    <line
      fill="none"
      stroke={color}
      strokeMiterlimit="10"
      strokeWidth="4"
      x1="9"
      x2="41"
      y1="25"
      y2="25"
    />
  </svg>
);

export default MinusIcon;
