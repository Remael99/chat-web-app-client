import React, { useContext } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { AuthContext } from "../../Context/Auth";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const ProfileTop = styled.div`
  ${tw`

  border
  border-gray-200
  bg-white
  rounded-md
  h-20 
  w-full
  p-1
  flex
  items-center
  pr-3
  
`}
`;

const ProfileWrapper = styled.div`
  ${tw`
   flex-1
    h-full
    w-1/2
    p-1
    flex
    items-center


  `}
`;

const Avatar = styled.div`
  ${tw`
border-gray-200
 border-b
 h-16 
 w-16
 bg-white
 rounded-full
`}
`;

export const Img = styled.img`
  ${tw`
 object-cover
 w-full
 h-full
 rounded-full
`}
`;

const ProfileText = styled.div`
  cursor: pointer;
  ${tw`
    flex
    flex-col
    p-2
    text-gray-500
    text-left
    h-full
    pl-2
   pt-2
    ml-2
`}
`;

const LogOut = styled.button`
  ${tw`
       w-24
       h-10
       ml-auto
       p-2 
       bg-red-400 
       text-white
       rounded-sm
       focus:bg-gray-600
       focus:ring-1
`}
`;

const Profile = ({ open, setOpen }) => {
  const context = useContext(AuthContext);
  const history = useHistory();
  const { user } = context;

  const { logout } = context;

  const handleLogOut = () => {
    logout();
    history.push("/");
  };

  const { data } = useQuery(GET_PROFILE, {
    variables: {
      id: user.id,
    },
    onError({ graphQLErrors }) {
      if (graphQLErrors) {
        console.log(graphQLErrors);
      }
    },
  });

  let profile;
  if (data) {
    profile = data.getProfile.profile;
  }
  return (
    <ProfileTop>
      <ProfileWrapper>
        <Avatar>
          <Img
            src={
              profile
                ? profile?.profilePic
                : "https://react.semantic-ui.com/images/avatar/large/matthew.png"
            }
            alt="profile"
          />
        </Avatar>

        <ProfileText onClick={() => setOpen(!open)}>
          <h3>My profile</h3>
          <p className="text-gray-300">
            {" "}
            {profile ? profile?.status : "Hello world"}{" "}
          </p>
        </ProfileText>
      </ProfileWrapper>
      <LogOut onClick={handleLogOut}>Logout</LogOut>
    </ProfileTop>
  );
};

const GET_PROFILE = gql`
  query getProfile($id: Int!) {
    getProfile(id: $id) {
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

export default Profile;
