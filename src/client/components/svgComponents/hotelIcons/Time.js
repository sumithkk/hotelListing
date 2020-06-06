import React from 'react';

function Time(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 100 100" {...props}>
      <g
        stroke="#fff"
        strokeWidth={6}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M49.945 61.901a4.948 4.948 0 004.945-4.95A4.948 4.948 0 0049.945 52 4.948 4.948 0 0045 56.95a4.948 4.948 0 004.945 4.951h0zM68.006 38.486L54.004 52.49M86.922 19.67l-6.294 6.3M90.768 22.12l-6.294-6.301" />
        <path d="M91.139 57c0-22.644-18.337-41-40.955-41-22.62 0-40.955 18.356-40.955 41s18.336 41 40.955 41c22.618 0 40.955-18.356 40.955-41zM49.945 15.905a6.949 6.949 0 006.945-6.952C56.89 5.113 53.78 2 49.945 2A6.949 6.949 0 0043 8.953c0 3.84 3.11 6.952 6.945 6.952h0z" />
      </g>
    </svg>
  );
}

const MemoTime = React.memo(Time);
export default MemoTime;
