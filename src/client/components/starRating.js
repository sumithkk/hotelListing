import React, { useState } from 'react';
import styled from 'styled-components';

const StarRating = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .star {
    cursor: pointer;
    width: 2em;
    height: 2em;
    background-color: #c5c5c5;
    -webkit-clip-path: polygon(
      50% 0%,
      63% 38%,
      100% 38%,
      69% 59%,
      82% 100%,
      50% 75%,
      18% 100%,
      31% 59%,
      0% 38%,
      37% 38%
    );
    clip-path: polygon(
      50% 0%,
      63% 38%,
      100% 38%,
      69% 59%,
      82% 100%,
      50% 75%,
      18% 100%,
      31% 59%,
      0% 38%,
      37% 38%
    );
  }

  .star.selected {
    background-color: gold;
  }
`;

const Star = ({ selected = false }) => <div className={selected ? 'star selected' : 'star'} />;

const Rating = ({ totalStars, selected }) => {
  //   const [starsSelected, selectStar] = useState(0);
  return (
    <StarRating className="star-rating">
      {[...Array(5)].map((n, i) => (
        <Star key={i} selected={i < selected} />
      ))}
    </StarRating>
  );
};

export default Rating;
