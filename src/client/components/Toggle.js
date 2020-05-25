import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';

import MoonIcon from '../components/svgComponents/MoonIcon';
import SunIcon from '../components/svgComponents/SunIcon';

const ToggleContainer = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  color: ${({ theme }) => theme.text};
  height: 3.5rem;
  border: none;
  font-size: 1.1rem;
  padding: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  width: 132px;
  padding: 10px;
  font-family: 'rm';
  padding-left: 40px;
  @media (max-width: 576px) {
    width: auto !important;
    padding-left: 22px;
    height: 3rem;
  }
  // &:hover {
  //   background: ${({ theme }) => theme.body};
  // }

  svg {
    width: 1.5rem;
    height: auto;
    transition: all 0.3s linear;
    position: absolute;
    left: 8px;
    @media (max-width: 576px) {
      left: 4px;
    }

    &:first-child {
      transform: ${(props) => (props.lightTheme ? 'translateY(0px)' : 'translateY(100px)')};
    }

    &:nth-child(2) {
      transform: ${(props) => (props.lightTheme ? 'translateY(-100px)' : 'translateY(0px)')};
    }
  }
`;

const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';
  return (
    <ToggleContainer lightTheme={isLight} onClick={toggleTheme}>
      <SunIcon width="15px" height="15px" />
      <MoonIcon width="15px" height="15px" />
      <div className="themeTxt">{theme === 'light' ? 'Dark mode' : 'Light mode'} </div>
    </ToggleContainer>
  );
};

// Toggle.propTypes = {
//   toggleTheme: func.isRequired,
//   theme: string.isRequired,
// };

export default Toggle;
