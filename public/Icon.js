import * as React from "react";
const SvgIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <g fill="red">
      <path d="M10.4 18.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0m3.5 2.1a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2" />
      <path d="M18.573 18.85a.343.343 0 0 0 .43-.533zm-.656-1.101a.343.343 0 0 0-.533.43zm-1.268-1.532a.343.343 0 0 0-.533.43zm-1.233-1.67a.343.343 0 0 0 .533-.43zm-.7-1.4a.343.343 0 0 0 .533-.43zm-.7-1.4a.343.343 0 0 0 .533-.43zm4.987 6.57-1.086-.568-.533.43 1.19.671zm-2.887-1.67-.7-2.1-.7-1.4-.7-1.4.533-.43.7 1.4.7 1.4.7 2.1z" />
    </g>
    <text
      y={10}
      fill="red"
      fontFamily="Arial Black"
      fontSize={10}
      fontWeight="bold"
      transform="translate(14 12)"
    >
      {"PPB"}
    </text>
  </svg>
);
export default SvgIcon;
