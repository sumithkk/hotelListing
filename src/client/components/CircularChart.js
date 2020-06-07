import React from 'react';
import styled from 'styled-components';

const SingleChart = styled.div`
  width: 33%;
  justify-content: space-around;
  .circular-chart {
    display: block;
    margin: 10px auto;
    max-width: 80%;
    max-height: 250px;
  }
  .circle-bg {
    fill: none;
    stroke: #eee;
    stroke-width: 3.8;
  }
  .circle {
    fill: none;
    stroke: ${({ color }) => color};
    stroke-width: 2.8;
    stroke-linecap: round;
    animation: progress 1s ease-out forwards;
  }
  .percentage {
    fill: #666;
    font-family: sans-serif;
    font-size: 0.5rem;
    text-anchor: middle;
  }
  @keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
  }
`;

function CircularChart(props) {
  return (
    <SingleChart color={props.color}>
      <svg viewBox="0 0 36 36" className="circular-chart" width="1em" height="1em" {...props}>
        <path
          className="circle-bg"
          d="M18 2.084a15.915 15.915 0 010 31.831 15.915 15.915 0 010-31.83"
        />
        <path
          className="circle"
          strokeDasharray={`${props.percentage}, 100`}
          d="M18 2.084a15.915 15.915 0 010 31.831 15.915 15.915 0 010-31.83"
        />
        <text x={18} y={20.35} className="percentage">
          {props.percentage}
          {`%`}
        </text>
      </svg>
    </SingleChart>
  );
}

export default CircularChart;
