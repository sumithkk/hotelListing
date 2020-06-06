import React from 'react';

function Wifi(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      style={{ fill: 'none !important' }}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h0" />
    </svg>
  );
}

const MemoWifi = React.memo(Wifi);
export default MemoWifi;
