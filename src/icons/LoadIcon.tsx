import { FC, SVGProps } from "react";

interface LoadIconProps extends React.SVGProps<SVGSVGElement> {
  strokeColor?: string;
  strokeWidth?: number;
}

const LoadIcon: FC<LoadIconProps> = ({
  strokeColor = "#263d8c",
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width="16.17"
    height="19.64"
    xmlns="http://www.w3.org/2000/svg"
    id="a"
    viewBox="0 0 19.2 19.21"
    {...props}
  >
    <defs>
      <style>
        {`.f{fill:none;stroke:${strokeColor};stroke-linecap:round;stroke-linejoin:round;stroke-width:${strokeWidth}px}`}
      </style>
    </defs>
    <g id="b">
      <path
        id="c"
        d="M18.2 12.47v3.82c0 1.06-.86 1.91-1.91 1.91H2.91A1.91 1.91 0 0 1 1 16.29h0v-3.82"
        className="f"
      />
      <path id="d" d="M14.38 5.78 9.6 1 4.82 5.78" className="f" />
      <path id="e" d="M9.6 1v11.47" className="f" />
    </g>
  </svg>
);
export default LoadIcon;
