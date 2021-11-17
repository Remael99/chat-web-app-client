import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Contacts from "./Contacts";
import ChatSection from "./ChatSection";
import Profile from "./Profile";
import { AuthContext } from "../../Context/Auth";
import { MessageContext } from "../../Context/Message";
import { useSubscription, gql } from "@apollo/client";
import Main from "../Modal/Main";

const ChatWrapper = styled.div`
  ${tw`
    w-5/6
    m-auto
    h-full
    grid 
 
    pt-2
        
  `}
`;

const ChatBoard = styled.div`
  height: 450px;
  ${tw`
  col-span-2

  flex
  mt-2
  mb-6
   `};
`;

const ProfileBoard = styled.div`
  ${tw`
  col-span-2

  h-1/5

`}
`;

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const context = useContext(MessageContext);
  const [open, setOpen] = useState(false);
  console.log(open);

  const { data } = useSubscription(NEW_MESSAGE, {
    variables: {
      username: user?.username,
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const { addMessage } = context;
  useEffect(() => {
    if (data) {
      const message = data.messageCreated;

      const otherUser =
        user?.username === message?.to ? message.from : message.to;

      addMessage(otherUser, message);
    }
  }, [data, user]);

  return (
    <ChatWrapper>
      <ProfileBoard>
        <Profile open={open} setOpen={setOpen} />
      </ProfileBoard>
      <ChatBoard>
        <Contacts />
        <ChatSection />
      </ChatBoard>
      <Main open={open} setOpen={setOpen} />
    </ChatWrapper>
  );
};

const NEW_MESSAGE = gql`
  subscription messageCreated($username: String!) {
    messageCreated(username: $username) {
      id
      content
      to
      from
      createdAt
    }
  }
`;

export default ChatPage;
