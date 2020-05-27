import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const InputBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  label {
    position: absolute;
    text-transform: capitalize;
    transition: 0.5s all ease;
    bottom: ${(props) => (props.focused ? '70px' : '31px')};
  }
  input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: ${(props) => (props.error ? '2px solid red' : '2px solid orange')};
    margin: 20px 0;
    padding: 10px 0;
    &:active,
    &:focus {
      border-bottom: 2px solid green;
    }
    &:active label {
      bottom: 40px !important;
    }
  }
`;

const Input = ({ type, name, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log('input mounted ======');
  }, []);

  useEffect(() => {}, [value]);
  return (
    <InputBox error={error} focused={focused || value !== ''}>
      <label>{name}</label>
      <input
        className="inputBox"
        type={type}
        name={name}
        value={value}
        onTouchStart={() => setFocused(true)}
        onChange={onChange}
      />
    </InputBox>
  );
};

export default Input;
