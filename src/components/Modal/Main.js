import React, { useState } from "react";
import {
  ModalWrapper,
  ModalContents,
  ModalUpper,
  ModalCenter,
  ModalClose,
  ModalUpload,
  ModalButton,
  ModalInput,
  FileInput,
  FileLabel,
  ChosenImage,
  ModalLoadingButton,
} from "./Style";
import { useMutation, gql } from "@apollo/client";
import { GrClose } from "react-icons/gr";
import { BiImageAdd } from "react-icons/bi";
import Input from "../LoginPage/Input";
import { convertToBase64, useForm } from "../../utils/hooks";
import { ErrorWrapper } from "../LoginPage/Login";

const Main = ({ open, setOpen }) => {
  const { handleSubmit, handleChange, value } = useForm(createNewPost, {
    status: "",
    email: "",
  });

  const [profilePic, setProfilePic] = useState("");
  const [errors, setErrors] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    const base64 = await convertToBase64(file);

    setProfilePic(base64.toString());
  };

  const [createProfile, { loading }] = useMutation(CREATE_PROFILE, {
    update(_, { data }) {
      const { createProfile } = data;

      const { errors } = createProfile;

      if (errors || errors.length > 0) {
        setErrors([errors[0]]);
      } else {
        setOpen(false);
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
    variables: {
      profileInput: {
        status: value.status,
        email: value.email,
        profilePic,
      },
    },
  });

  function createNewPost() {
    createProfile();
  }

  return (
    <>
      {open && (
        <ModalWrapper>
          <ModalContents>
            <ModalUpper>
              <h1 className="text-gray-600">profile</h1>
              <ModalClose onClick={() => setOpen(false)}>
                <GrClose />
              </ModalClose>
            </ModalUpper>
            <ModalCenter>
              <ModalInput onSubmit={handleSubmit}>
                <ModalUpload>
                  <FileInput
                    id="file"
                    type="file"
                    name="profilePic"
                    onChange={handleFileUpload}
                  />
                  <FileLabel for="file">
                    <BiImageAdd className="text-3xl pl-1  pt-1" />
                  </FileLabel>
                </ModalUpload>
                {profilePic.length > 0 && (
                  <ChosenImage src={profilePic} alt="uploaded" />
                )}
                <Input
                  type="text"
                  placeholder="add status"
                  name="status"
                  value={value.status}
                  onChange={handleChange}
                  InputWidth="100%"
                />
                <Input
                  type="text"
                  placeholder="add email"
                  name="email"
                  value={value.email}
                  onChange={handleChange}
                  InputWidth="100%"
                />
                {loading ? (
                  <ModalLoadingButton>create Profile </ModalLoadingButton>
                ) : (
                  <ModalButton type="submit">create profile</ModalButton>
                )}
              </ModalInput>
            </ModalCenter>
            {errors && errors.length > 0 && (
              <ErrorWrapper>
                <ul className="list-none">
                  {errors?.map((error) => (
                    <li>{error?.message}</li>
                  ))}
                </ul>
              </ErrorWrapper>
            )}
          </ModalContents>
        </ModalWrapper>
      )}
    </>
  );
};

const CREATE_PROFILE = gql`
  mutation createProfile($profileInput: ProfileInput) {
    createProfile(profileInput: $profileInput) {
      profile {
        id
        email
        status
        profilePic
        createdAt
      }
      errors {
        message
      }
    }
  }
`;

export default Main;
