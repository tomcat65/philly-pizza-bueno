import * as React from "react";
const SvgIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      stroke="red"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M4 28 16 4l12 24z"
    />
    <path
      fill="#8B0000"
      d="M12 23c.5.5 1.5.2 1.8-.2.4-.6.2-1.6-.3-2-.5-.3-1.5 0-1.8.4-.4.6-.2 1.6.3 1.8M16 21c.5.5 1.5.2 1.8-.2.4-.6.2-1.6-.3-2-.5-.3-1.5 0-1.8.4-.4.6-.2 1.6.3 1.8M20 23c.5.5 1.5.2 1.8-.2.4-.6.2-1.6-.3-2-.5-.3-1.5 0-1.8.4-.4.6-.2 1.6.3 1.8"
    />
    <path
      stroke="#8B0000"
      strokeWidth={2}
      d="M10 17s1.5-2 1.5-3-1.5-1-1.5 0v5s1.5-2 2.5-2 1 1 0 2-2.5 0-2.5 0M14 17s1.5-2 1.5-3-1.5-1-1.5 0v5s1.5-2 2.5-2 1 1 0 2-2.5 0-2.5 0"
    />
    <path stroke="#8B0000" strokeWidth={2} d="M18 14s2 0 3 1 0 4-3 4h-1" />
  </svg>
);
export default SvgIcon;
