import React from "react";

const SortUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    id="a"
    viewBox="0 0 16 10"
    width="28px"
    height="8px"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <style>{".f{fill:none;}.f,.g{stroke-width:0px;}.g{fill:#263d8c;}"}</style>
    </defs>
    <g id="b">
      <g id="c">
        <g id="d">
          <path className="f" d="m8,1l7,8H1L8,1Z" />
          <path
            className="g"
            d="m8,1L1,9h14L8,1m0-1c.29,0,.56.12.75.34l7,8c.26.3.32.71.16,1.07-.16.36-.52.59-.91.59H1c-.39,0-.75-.23-.91-.59-.16-.36-.1-.78.16-1.07L7.25.34c.19-.22.46-.34.75-.34Z"
          />
        </g>
        <g id="e">
          <path className="f" d="m8,22L1,14h14l-7,8Z" />
          <path
            className="g"
            d="m8,22l7-8H1l7,8m0,1c-.29,0-.56-.12-.75-.34L.25,14.66c-.26-.3-.32-.71-.16-1.07.16-.36.52-.59.91-.59h14c.39,0,.75.23.91.59.16.36.1.78-.16,1.07l-7,8c-.19.22-.46.34-.75.34Z"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default SortUpIcon;
