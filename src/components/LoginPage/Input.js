import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const InputComp = styled.input`
  width: ${(props) => props.InputWidth};
  ${tw`
bg-blue-50
p-2
mt-2
rounded-sm
mb-2
focus:outline-none
focus:ring-1
focus:border-black 

`};
`;

const Input = ({ type, value, onChange, name, placeholder, InputWidth }) => {
  return (
    <InputComp
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      InputWidth={InputWidth}
    />
  );
};

export default Input;
