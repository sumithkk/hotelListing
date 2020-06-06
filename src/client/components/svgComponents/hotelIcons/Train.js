import React from 'react';

function Train(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 19" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M-4-2h24v24H-4z" />
        <path
          d="M8 0C4 0 0 .5 0 4v9.5C0 15.43 1.57 17 3.5 17l-1.15 1.15a.5.5 0 00.36.85H3.8c.13 0 .26-.05.35-.15L6 17h4l1.85 1.85c.09.09.22.15.35.15h1.09c.45 0 .67-.54.35-.85L12.5 17c1.93 0 3.5-1.57 3.5-3.5V4c0-3.5-4-4-8-4zM3.5 15c-.83 0-1.5-.67-1.5-1.5S2.67 12 3.5 12s1.5.67 1.5 1.5S4.33 15 3.5 15zM7 8H2V4h5v4zm5.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM14 8H9V4h5v4z"
          fill="#666"
        />
      </g>
    </svg>
  );
}

const MemoTrain = React.memo(Train);
export default MemoTrain;
