import React from "react";

const Logo = ({ theme, style }) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 39.5 57.1"
      height="25px"
      width="25px"
      style={style}
    >
      <path
        className={theme === "light" ? "logoDark" : "logoLight"}
        d="M-89.6,70.4"
      />
      <g>
        <path
          className={theme === "light" ? "logoDark" : "logoLight"}
          d="M34.4,56H5.1c-2.2,0-3.9-1.8-3.9-3.9V5
		c0-2.2,1.8-3.9,3.9-3.9h29.3c2.2,0,3.9,1.8,3.9,3.9v47C38.3,54.2,36.6,56,34.4,56z"
        />
        <g>
          <path
            className={theme === "light" ? "light" : "dark"}
            d="M19.2,30.1L19.2,30.1c-0.9-0.6-1.2-1.7-0.7-2.5l10-15.8C29,11,31,6.8,32,7.2c0,0,0.1,0.1,0.1,0.1l0,3.8
			c0,4.6,0.3,2-0.2,2.8l-10,15.8C21.3,30.5,20.1,30.7,19.2,30.1z"
          />
        </g>
        <path
          className={theme === "light" ? "light" : "dark"}
          d="M30.5,49.8c-0.8,0.5-1.8,0.7-3,0.7H11.8c-1.3,0-2.4-0.3-3.2-0.9c-0.8-0.6-1.3-1.3-1.3-2.2v-11l5,3.3l0,4.8
		c0,0.8,0.7,1.5,1.5,1.5L26,46c0.1,0,0.2,0,0.2,0L30.5,49.8z"
        />
        <path
          className={theme === "light" ? "light" : "dark"}
          d="M31.8,48.1c-0.2,0.4,0.2-0.2,0.2-0.7v-10c0-1.2-0.2-2.6-1.4-3.6L12.9,19.1l0-8.5c4.6,0,10,0.1,11.9,0c0.2,0,0.7,0,1.3-0.3
		c0.7-0.3,1.1-0.8,1.3-1.1c0,0,0.1-0.1,0.1-0.1l1.5-2c-8.6,0-15,0.1-17.2,0.1c-0.1,0-1.9,0-3.2,0.9c-0.8,0.6-1.3,1.3-1.3,2.2V19
		c0,1.2,0.6,2.3,1.8,3.3l18.1,15l0,6.8"
        />
      </g>
    </svg>
  );
};

export default Logo;
