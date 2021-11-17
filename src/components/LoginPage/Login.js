import { useMutation, gql } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import tw from "twin.macro";
import { useForm } from "../../utils/hooks";
import Input from "./Input";
import { AuthContext } from "../../Context/Auth";
import { Link } from "react-router-dom";

const LoginCard = styled.form`
  ${tw`
    m-auto
    bg-white 
    shadow-2xl
    h-auto
    rounded-md
    w-80
    mt-28
    pt-8
    pb-8
    pl-4
    pr-4
    flex
    flex-col

`}
`;

const InputWrapper = styled.div`
  display: flex;
  ${tw`
     flex-col
  `}
`;

const Button = styled.button`
  ${tw`
   p-2 
   w-full
   bg-gray-800
   text-white
   rounded-sm
   focus:bg-gray-600
   focus:ring-1

`}
`;

const ButtonLoading = styled.button`
  ${tw`
   p-2 
   w-full
   bg-gray-600
   text-white
   rounded-sm
   focus:bg-gray-600
   focus:ring-1
`}
`;

const ButtonWrapper = styled.div`
  ${tw`
  w-full
   mt-2
   
`}
`;

export const ErrorWrapper = styled.div`
  ${tw`
    w-full
    mt-2
    p-2
    bg-red-400
    flex
    flex-col
    rounded-sm
    text-gray-100
    text-left
    pl-3
`}
`;

const Login = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState(null);

  const initialState = {
    username: "",
    password: "",
  };

  const history = useHistory();

  const { handleChange, handleSubmit, value } = useForm(
    loginUser,
    initialState
  );

  const [addUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data }) {
      const { loginUser } = data;

      const { user, errors } = loginUser;

      if (errors.length > 0) {
        setErrors([errors[0]]);
      } else {
        context.login(user);
        history.push("/chat");
      }
    },
    onError({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        console.log(graphQLErrors);
      }

      if (networkError) {
        console.log(networkError);
      }
    },
    variables: value,
  });

  function loginUser() {
    addUser();
  }

  return (
    <LoginCard onSubmit={handleSubmit}>
      <InputWrapper>
        <Input
          type="text"
          name="username"
          value={value.username}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          value={value.password}
          onChange={handleChange}
        />
      </InputWrapper>
      <ButtonWrapper>
        {loading ? (
          <ButtonLoading disabled> Login </ButtonLoading>
        ) : (
          <Button type="submit"> Login </Button>
        )}
      </ButtonWrapper>

      <Link to="/register">
        <div className="mt-2  text-gray-500 w-full text-left hover:text-blue-600">
          <p>not a member? register now</p>
        </div>
      </Link>

      {errors && errors.length > 0 && (
        <ErrorWrapper>
          <ul className="list-none">
            {errors?.map((error) => (
              <li>{error.message}</li>
            ))}
          </ul>
        </ErrorWrapper>
      )}
    </LoginCard>
  );
};

const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      user {
        id
        username
        token
        createdAt
      }
      errors {
        message
      }
    }
  }
`;

export default Login;
