import React, { createContext, useReducer } from "react";

const initialState = {
  users: null,
};

const MessageContext = createContext({
  users: null,
  setSelectedUser: (selected) => {},
  setUsers: (users) => {},
  setUserMessages: (username, messages) => {},
  addMessage: (to, content) => {},
});

const MessageReducer = (state, action) => {
  let usersCopy, userIndex;
  const { selectedUsername, message, messages } = action;
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.users,
      };

    case "SET_USER_MESSAGES":
      usersCopy = [...state.users];
      userIndex = usersCopy.findIndex((u) => u.username === selectedUsername);
      usersCopy[userIndex] = { ...usersCopy[userIndex], messages };

      return {
        ...state,
        users: usersCopy,
      };

    case "SET_SELECTED_USER":
      usersCopy = state.users.map((user) => ({
        ...user,
        selectedKey: user.username === action.selectedUser,
      }));

      return {
        ...state,
        users: usersCopy,
      };
    case "ADD_MESSAGE":
      usersCopy = [...state.users];

      userIndex = usersCopy.findIndex((u) => u.username === selectedUsername);

      let userCopy = {
        ...usersCopy[userIndex],
        messages: [message, ...usersCopy[userIndex].messages],
      };

      usersCopy[userIndex] = userCopy;

      return {
        ...state,
        users: usersCopy,
      };

    default:
      return {
        ...state,
      };
  }
};

const MessageProvider = (props) => {
  const [state, dispatch] = useReducer(MessageReducer, initialState);

  const setUsers = (data) => {
    dispatch({ type: "SET_USERS", users: data });
  };

  const setUserMessages = (username, messages) => {
    dispatch({
      type: "SET_USER_MESSAGES",
      selectedUsername: username,
      messages: messages,
    });
  };

  const setSelectedUser = (selected) => {
    dispatch({ type: "SET_SELECTED_USER", selectedUser: selected });
  };

  const addMessage = (to, content) => {
    dispatch({
      type: "ADD_MESSAGE",
      message: content,
      selectedUsername: to,
    });
  };

  return (
    <MessageContext.Provider
      value={{
        users: state.users,
        setSelectedUser,
        setUsers,
        addMessage,
        setUserMessages,
      }}
      {...props}
    />
  );
};

export { MessageContext, MessageProvider };
