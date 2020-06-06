import React from 'react';

function Vip(props) {
  return (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
      <path
        fill="#880E4F"
        d="M38 43H10c-2.2 0-4-1.8-4-4V11c0-2.2 1.8-4 4-4h28c2.2 0 4 1.8 4 4v28c0 2.2-1.8 4-4 4z"
      />
      <g fill="#FFD54F">
        <path d="M15.9 28l2.1-9.1h2.8l-3.6 12.6h-2.6L11 18.9h2.8l2.1 9.1zM25.6 31.5h-2.5V18.9h2.5v12.6zM31.2 27.1v4.4h-2.5V18.9H33c3.7 0 4.1 3.4 4.1 4.2 0 1.2-.5 4-4.1 4h-1.8zm0-2.2h1.7c1.3 0 1.5-1.1 1.5-1.9 0-1.6-.9-2.1-1.5-2.1h-1.7v4z" />
      </g>
    </svg>
  );
}

const MemoVip = React.memo(Vip);
export default MemoVip;
