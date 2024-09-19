import React from "react";

interface ExportIconProps extends React.SVGProps<SVGSVGElement> {
  strokeColor?: string;
  strokeWidth?: number;
}

const ExportIcon: React.FC<ExportIconProps> = ({
  strokeColor = "#263d8c",
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width="16.17"
    height="19.64"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15.38 19.21"
    aria-labelledby="custom-arrow-icon"
    {...props}
  >
    <path
      d="M14.38 18.21H1"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.91 7.69l4.78 4.78 4.78-4.78"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.69 12.47V1"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ExportIcon;
