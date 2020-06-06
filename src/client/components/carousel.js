import React from 'react';
import styled, { css } from 'styled-components';
import Arrow from './svgComponents/hotelIcons/Arrow';

const CarouselWrapper = styled.div`
  position: relative;
  .leftArrow,
  .rightArrow {
    cursor: pointer;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100px;
    border: none;
    outline: none;
    background: transparent;
    color: #fff;
    top: 0;
    z-index: 10;
    svg {
      font-size: 1.5rem;
    }
  }
  .leftArrow {
    left: 0;
  }
  .rightArrow {
    right: 0;
  }
`;

const SCarouselWrapper = styled.div`
  display: flex;
  width: 100%;
`;
const SCarouselSlide = styled.div`
  flex: 0 0 auto;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: all 0.5s ease;
  width: 100%;
  max-height: 700px;
  display: flex;
`;

const SCarouselSlides = styled.div`
  display: flex;
  ${(props) =>
    props.currentSlide &&
    css`
      transform: translateX(-${props.currentSlide * 100}%);
    `};
  transition: all 0.5s ease;
`;

const MyCarousel = ({ children }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const activeSlide = children.map((slide, index) => (
    <SCarouselSlide active={currentSlide === index} key={index}>
      {slide}
    </SCarouselSlide>
  ));

  return (
    <CarouselWrapper>
      <button
        className="leftArrow"
        type="button"
        onClick={() => {
          setCurrentSlide((currentSlide - 1 + activeSlide.length) % activeSlide.length);
        }}
      >
        <Arrow />
      </button>
      <SCarouselWrapper>
        <SCarouselSlides currentSlide={currentSlide}>{activeSlide}</SCarouselSlides>
      </SCarouselWrapper>
      <button
        className="rightArrow"
        type="button"
        onClick={() => {
          setCurrentSlide((currentSlide + 1) % activeSlide.length);
        }}
      >
        <Arrow style={{ transform: 'rotate(180deg)' }} />
      </button>
    </CarouselWrapper>
  );
};

export default MyCarousel;
