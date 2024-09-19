import React from "react";

const ImagePlaceholderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="48"
    height="48"
    fill="currentColor"
    {...props}
  >
    <rect width="100%" height="100%" fill="#e0e0e0" />
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="#bdbdbd" />
    <path d="M8 12l4-4 4 4" stroke="#9e9e9e" strokeWidth="1.5" fill="none" />
    <circle cx="9" cy="9" r="1" fill="#9e9e9e" />
  </svg>
);

export default ImagePlaceholderIcon;
