import React, { useContext } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Img } from "./Profile";
import { useQuery, gql } from "@apollo/client";
import { MessageContext } from "../../Context/Message";
import moment from "moment";

const ContactsWrapper = styled.div`
  ${tw`
   
    bg-white
    border
    border-gray-200
    rounded-md
    h-full
    shadow-sm

`}
`;

const ContactWrapper = styled.button`
  height: auto;
  ${tw`
    w-full
    flex
    items-center
    p-1
    pl-3
    border-t
    hover:bg-gray-50
    focus:bg-blue-50
`}
`;

const ContactAvatar = styled.div`
  ${tw`
  border-gray-200
border-b
h-14
w-14
bg-white
shadow-sm
rounded-full
`}
`;

const ContactWrapperText = styled.div`
  ${tw`
  flex
  flex-col
  text-gray-500
  text-left
  h-14
  pl-2
  ml-2
  overflow-hidden
  `}
`;

const SearchArea = styled.div`
  ${tw`
    h-14
    border-b
    border-gray-200
    flex
    items-center
    p-2

  `}
`;

const SearchBar = styled.input`
  ${tw`
 bg-gray-100
 rounded-3xl
 bg-blue-100
 w-full

  p-2
focus:outline-none
focus:ring-1
focus:ring-blue-200
h-10
  `}
`;

const Contacts = () => {
  const context = useContext(MessageContext);

  const { data } = useQuery(GET_CONTACTS, {
    onCompleted: (data) => {
      context.setUsers(data?.getUsers);
    },
  });
  const { setSelectedUser } = context;

  let contacts;
  if (data) {
    contacts = data.getUsers;
  }

  return (
    <ContactsWrapper>
      <SearchArea>
        <SearchBar placeholder="search ..." />
      </SearchArea>

      {contacts ? (
        contacts?.map((contact) => (
          <ContactWrapper onClick={() => setSelectedUser(contact.username)}>
            <ContactAvatar>
              <Img
                src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
                alt="profile"
              />
            </ContactAvatar>
            <ContactWrapperText>
              <h3>{contact.username}</h3>
              <p className="text-gray-300">
                {moment(contact.createdAt).fromNow()}
              </p>
            </ContactWrapperText>
          </ContactWrapper>
        ))
      ) : (
        <ContactWrapper>
          <h1>Loading...</h1>
        </ContactWrapper>
      )}
    </ContactsWrapper>
  );
};

const GET_CONTACTS = gql`
  query getUsers {
    getUsers {
      id
      username
    }
  }
`;

export default Contacts;
