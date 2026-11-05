import { FC, SVGProps } from "react";

interface SaveIconProps extends SVGProps<SVGSVGElement> {
  strokeColor?: string;
  strokeWidth?: number;
}

const SaveIcon: FC<SaveIconProps> = ({
  strokeColor = "#263d8c",
  strokeWidth = 2,
  ...props
}) => (
  <svg
    width="16.17"
    height="19.64"
    xmlns="http://www.w3.org/2000/svg"
    id="a"
    viewBox="0 0 19.29 19.29"
    {...props}
  >
    <defs>
      <style>
        {`.save {fill:none;stroke:${strokeColor};stroke-linecap:round;stroke-linejoin:round;stroke-width:${strokeWidth}px}`}
      </style>
    </defs>
    <g id="b">
      <path
        id="c"
        d="M16.37 18.29H2.92A1.92 1.92 0 0 1 1 16.37h0V2.92C1 1.86 1.86 1 2.92 1h10.57l4.8 4.8v10.57c0 1.06-.86 1.92-1.92 1.92Z"
        className="save"
      />
      <path id="d" d="M14.45 18.29v-7.68H4.84v7.68" className="save" />
      <path id="e" d="M4.84 1v4.8h7.68" className="save" />
    </g>
  </svg>
);
export default SaveIcon;
