import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Register from "./Register";

const RegisterContainer = styled.div`
  ${tw`
     flex
     items-center
     justify-center
    
 `}
`;

const RegisterPage = () => {
  return (
    <RegisterContainer>
      <Register />
    </RegisterContainer>
  );
};

export default RegisterPage;
