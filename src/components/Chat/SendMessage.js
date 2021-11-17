import React, { useContext, useState } from "react";
import { TextSpace, TextInput, SendButton } from "./Style";
import { FiSend } from "react-icons/fi";
import { gql, useMutation } from "@apollo/client";
import { MessageContext } from "../../Context/Message";

const SendMessage = () => {
  const messageContext = useContext(MessageContext);

  const [content, setContent] = useState("");

  let selectedUser = messageContext?.users?.filter(
    (u) => u.selectedKey === true
  );

  let username;
  if (selectedUser && selectedUser.length > 0) {
    username = selectedUser[0].username;
  }

  const [sendMessage] = useMutation(CREATE_MESSAGE, {
    variables: {
      to: username,
      content,
    },
    update() {
      setContent("");
    },
    onError({ graphQLErrors }) {
      if (graphQLErrors) {
        console.log(graphQLErrors);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <TextSpace onSubmit={handleSubmit}>
      <TextInput
        placeholder={
          selectedUser && selectedUser.length > 0
            ? "write messages"
            : "select contact to write message"
        }
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <SendButton type="submit">
        <FiSend />
      </SendButton>
    </TextSpace>
  );
};

const CREATE_MESSAGE = gql`
  mutation createMessage($content: String!, $to: String!) {
    createMessage(content: $content, to: $to) {
      message {
        id
        content
        to
        from
        createdAt
      }
      errors {
        message
      }
    }
  }
`;

export default SendMessage;
