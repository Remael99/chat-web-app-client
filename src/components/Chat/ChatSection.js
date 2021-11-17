import React, { useContext } from "react";
import { MessageContext } from "../../Context/Message";
import { AuthContext } from "../../Context/Auth";
import { useQuery, gql } from "@apollo/client";
import {
  ChatWrapper,
  Text,
  TextMessageLeft,
  TextMessageRight,
  ChatSpace,
} from "./Style";
import SendMessage from "./SendMessage";

const ChatSection = () => {
  const messageContext = useContext(MessageContext);
  const { user } = useContext(AuthContext);

  let selectedUser = messageContext?.users?.filter(
    (u) => u.selectedKey === true
  );

  let username;
  let messages;
  if (selectedUser && selectedUser.length > 0) {
    username = selectedUser[0].username;
    messages = selectedUser[0].messages;
  }

  let chatMarkup;

  const { setUserMessages } = messageContext;

  const { loading } = useQuery(GET_MESSAGES, {
    variables: {
      usernameFrom: username,
    },

    onCompleted: (data) => {
      setUserMessages(username, data?.getUserMessages);
    },

    onError: (error) => {
      console.log(error);
    },
  });

  if (!messages && !loading) {
    chatMarkup = (
      <ChatSpace>
        <div className="w-full h-full text-gray-700 ">
          <h1>Select contact to start talking </h1>
        </div>
      </ChatSpace>
    );
  } else if (loading) {
    chatMarkup = (
      <ChatSpace>
        <div className="w-full h-full text-gray-700  ">
          <h1>Loading...</h1>
        </div>
      </ChatSpace>
    );
  } else if (messages && messages.length > 0) {
    chatMarkup = (
      <ChatSpace>
        {messages &&
          messages.map((message) => (
            <>
              {user.username === message.from ? (
                <TextMessageRight>
                  <Text> {message.content} </Text>
                </TextMessageRight>
              ) : (
                <TextMessageLeft>
                  <Text> {message.content} </Text>
                </TextMessageLeft>
              )}
            </>
          ))}
      </ChatSpace>
    );
  } else if (messages.length === 0) {
    chatMarkup = (
      <ChatSpace>
        <div className="w-full h-full ">
          <h1>start messaging</h1>
        </div>
      </ChatSpace>
    );
  }

  return (
    <ChatWrapper>
      {chatMarkup}
      <SendMessage />
    </ChatWrapper>
  );
};

const GET_MESSAGES = gql`
  query getUserMessages($usernameFrom: String!) {
    getUserMessages(usernameFrom: $usernameFrom) {
      id
      content
      to
      from
      createdAt
    }
  }
`;

export default ChatSection;
