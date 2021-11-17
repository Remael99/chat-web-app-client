import React, { createContext, useReducer } from "react";

const initialState = {
  users: null,
};

const ProfileContext = createContext({
  users: null,
  setUserProfile: (username, id) => {},
  createProfile: (email, status, profilePic) => {},
});

const ProfileReducer = (state, action) => {
  let usersCopy, userIndex;
  const { selectedUsername, message, messages } = action;
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};

const ProfileProvider = (props) => {
  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  const createProfile = (email, status, profilePic) => {
    dispatch({
      type: "CREATE_PROFILE",
      user,
    });
  };

  const setUserProfile = (email, status, profilePic) => {
    dispatch({
      type: "CREATE_PROFILE",
      user,
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        users: state.user,
        createProfile,
        setUserProfile,
      }}
      {...props}
    />
  );
};

export { ProfileContext, ProfileProvider };
