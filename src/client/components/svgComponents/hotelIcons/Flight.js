import React from 'react';

function Flight(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 19 20" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M-2-2h24v24H-2z" />
        <path
          d="M19 12.58c0-.36-.19-.69-.49-.89L11 7V1.5C11 .67 10.33 0 9.5 0S8 .67 8 1.5V7L.49 11.69a1.05 1.05 0 00.87 1.89L8 11.5V17l-1.8 1.35a.48.48 0 00-.2.4v.59c0 .33.32.57.64.48L9.5 19l2.86.82c.32.09.64-.15.64-.48v-.59a.48.48 0 00-.2-.4L11 17v-5.5l6.64 2.08c.68.21 1.36-.3 1.36-1z"
          fill="#666"
        />
      </g>
    </svg>
  );
}

const MemoFlight = React.memo(Flight);
export default MemoFlight;
