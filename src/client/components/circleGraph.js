import React from 'react';
import styled from 'styled-components';

const Chart = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  &:last-child {
    margin: 0;
  }
  h3 {
    font-size: 1rem;
    margin: 0;
    margin-bottom: 10px;
  }
  p {
    font-size: 0.9rem;
    font-style: italic;
    margin: 0;
    color: #808080;
  }
  .circle-chart {
    overflow: visible;
    margin-right: 15px;
  }

  .circle-chart-circle {
    animation: circle-chart-fill 1.35s reverse;
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);
    transform-origin: center;
  }

  .circle-chart-two {
    left: 6%;
    max-width: 88%;
    position: absolute;
    top: 6%;
  }

  .circle-chart-percentage {
    -webkit-animation: fade-in-text 2.2s 0.1s forwards;
    -moz-animation: fade-in-text 2.2s 0.1s forwards;
    animation: fade-in-text 2.2s 0.1s forwards;
    font-size: 22px;
    font-weight: 700;
    position: absolute;
  }

  .circle-chart-one-percentage {
    color: #5292ac;
    left: 65px;
    top: 60px;
  }

  .circle-chart-two-percentage {
    color: #64b2d1;
    left: 40px;
    top: 90px;
  }

  @keyframes circle-chart-fill {
    to {
      strokedasharray: 0 100;
    }
  }
`;

const CircleGraph = ({ box, title, subtitle, percentage = '10' }) => {
  return (
    <Chart className="circle-chart-container">
      <svg
        className="circle-chart"
        viewBox="0 0 33.83098862 33.83098862"
        xmlns="http://www.w3.org/2000/svg"
        width={box}
        height={box}
      >
        <circle
          stroke="#ecb3b6"
          strokeWidth=".5"
          fill="none"
          cx="16.91549431"
          cy="16.91549431"
          r="15.91549431"
        />
        <circle
          className="circle-chart-circle"
          stroke="#64b2d1"
          strokeWidth="3"
          strokeDasharray={percentage}
          fill="none"
          cx="16.91549431"
          cy="16.91549431"
          r="15.91549431"
        />
      </svg>
      <div>
        <h3>{title}</h3>
        <p>- {subtitle}</p>
      </div>
    </Chart>
  );
};

export default CircleGraph;
