import React from "react";

type LogoProps = {
  Width?: string;
  Height?: string;
};

export const Logo = ({ Width = "192", Height = "151" }: LogoProps) => {
  return (
    <svg
      width={Width}
      height={Height}
      viewBox="0 0 192 151"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => window.location.assign(window.location.origin)}
    >
      <path
        d="M36.9998 59.5001C26.5998 87.1001 37.3333 110.667 44 119C38 125.333 25.2 139.4 18 151C3.6 133.4 0 107 0 96C0 42.9807 42.9807 0 96 0C149.019 0 192 42.9807 192 96C191.667 103.333 190.1 119.7 186.5 126.5L136 116C132.4 100 114 93 96.5 90C83.7059 87.8068 75.8 89.5 63 85.5C50.2 81.5 40.3331 66.5001 36.9998 59.5001Z"
        fill="#86A5F5"
      />
    </svg>
  );
};
