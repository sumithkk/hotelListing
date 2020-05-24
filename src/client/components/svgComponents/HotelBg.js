import React, { useRef } from 'react';

const HotelBg = ({ theme }) => {
  const hotelRef = useRef(null);
  const onHover = (e) => {
    console.log(e);
    hotelRef.current.classList.add('hovered');
    // e.target.classList.add('hovered');
  };
  const onLeave = (e) => {
    console.log(e);
    hotelRef.current.classList.remove('hovered');
    // e.target.classList.remove('hovered');
  };

  return (
    <div
      className="hotelImageBg hvr-float-shadow"
      ref={hotelRef}
      onMouseEnter={(e) => onHover(e)}
      onMouseLeave={(e) => onLeave(e)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 732.41 549.55"
        height="100%"
        width="100%"
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="497.64"
            y1="-84.46"
            x2="497.64"
            y2="379.57"
            gradientTransform="matrix(1, 0, 0, -1, -158.34, 379.51)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="gray" stopOpacity="0.25" />
            <stop offset="0.54" stopColor="gray" stopOpacity="0.12" />
            <stop offset="1" stopColor="gray" stopOpacity="0.1" />
          </linearGradient>
          <clipPath id="clip-path">
            <path
              className="cls-1"
              style={{ fill: 'none' }}
              d="M719.59,171V478.75a13.84,13.84,0,0,1-13.83,13.82H580.83A13.82,13.82,0,0,1,567,478.79V171a13.83,13.83,0,0,1,13.83-13.83h18.7v2.4A11.39,11.39,0,0,0,610.91,171h63.54a11.38,11.38,0,0,0,11.38-11.39v-2.4h19.93A13.84,13.84,0,0,1,719.59,171Z"
            />
          </clipPath>
        </defs>
        <g id="Layer_2" data-name="Layer 2">
          <g id="e4476520-1cdd-4de1-b4a4-c2e57e044eb7">
            <polygon
              className="cls-2"
              // style={
              //   theme === "light"
              //     ? { fill: "url(#linear-gradient)" }
              //     : { fill: "" }
              // }
              style={{ fill: '#00000069' }}
              points="0.25 0.27 0.24 28.45 0 463.98 678.37 463.71 678.61 28.18 678.63 0 0.25 0.27"
            />
            <rect
              className="cls-3"
              style={{ fill: '#f5f5f5' }}
              x="11.67"
              y="7.76"
              width="656.26"
              height="26.69"
            />
            <rect
              className="cls-4"
              style={{ fill: '#fff' }}
              x="11.55"
              y="34.46"
              width="656.27"
              height="412.61"
            />
            <ellipse
              className="cls-5"
              style={{ fill: '#ff5252' }}
              cx="26.92"
              cy="20.85"
              rx="7.63"
              ry="7.62"
              transform="translate(-4.28 34.49) rotate(-61.37)"
            />
            <ellipse
              className="cls-6"
              style={{ fill: '#ff0' }}
              cx="48.26"
              cy="20.84"
              rx="7.63"
              ry="7.62"
              transform="translate(6.84 53.21) rotate(-61.36)"
            />
            <ellipse
              className="cls-7"
              style={{ fill: '#69f0ae' }}
              cx="69.6"
              cy="20.83"
              rx="7.63"
              ry="7.62"
              transform="translate(17.97 71.95) rotate(-61.37)"
            />
            {/* Image here */}
            <g className="phone">
              <path
                className="cls-8"
                style={{ fill: '#00000069' }}
                d="M732.41,229.64v40.09a1.4,1.4,0,0,1-1.39,1.4h-1V480a21.8,21.8,0,0,1-21.79,21.79H577.72A21.8,21.8,0,0,1,555.93,480h0V278.46h-.72a1,1,0,0,1-1-1V254.65a1,1,0,0,1,1-1h.72v-8.59h-.72a1,1,0,0,1-1-1V221.52a1,1,0,0,1,1-1h.72V208.76h-.73a.92.92,0,0,1-.92-.91h0V195.56a.92.92,0,0,1,.92-.92h.73V169.77A21.8,21.8,0,0,1,577.72,148H708.23A21.8,21.8,0,0,1,730,169.77v58.47h1A1.4,1.4,0,0,1,732.41,229.64Z"
              />
              <rect
                className="cls-9"
                style={{ fill: '#e6e8ec' }}
                x="631.14"
                y="322.42"
                width="24.31"
                height="4.94"
                rx="1.55"
              />
              <circle className="cls-9" cx="643.3" cy="324.89" r="2.8" />
              <g className="cls-10" style={{ clipPath: 'url(#clip-path)' }}>
                {/* img here */}
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
export default HotelBg;
