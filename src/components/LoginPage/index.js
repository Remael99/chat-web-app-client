import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Login from "./Login";

const LoginContainer = styled.div`
  ${tw`
       flex
       items-center
       justify-center
      
   `}
`;

const Index = () => {
  return (
    <LoginContainer>
      <Login />
    </LoginContainer>
  );
};

export default Index;
