import styled from "styled-components";
import tw from "twin.macro";

export const ChatWrapper = styled.div`
  height: 100%;
  ${tw`
 
 w-4/5
 border
 border-gray-200
 shadow-sm
 ml-2
 rounded-md
 relative
`};
`;

export const TextSpace = styled.form`
  height: 15%;
  ${tw`
w-full

bg-black 

mb-0
bottom-0
bg-white
border-t
border-gray-200
shadow-sm
flex
p-2
pl-2
items-center
z-10
`}
`;

export const TextInput = styled.input`
  ${tw`
  rounded-2xl
  bg-blue-100
  flex-1
  h-10
  p-2
  focus:outline-none
  focus:ring-1
  focus:ring-blue-100
  mr-2
`}
`;

export const SendButton = styled.button`
  ${tw`
  w-10
  h-10
  rounded-full
  focus:outline-none
focus:text-gray-700
  text-gray-500
  text-center
  text-3xl
`}
`;

export const ChatSpace = styled.div`
  position: relative;
  height: 85%;
  ${tw`
  w-full
  p-2
  flex
  flex-col-reverse
  relative
  overflow-y-auto
  overflow-x-hidden
  `}
`;

export const TextMessageLeft = styled.div`
  height: fit-content;
  width: fit-content;
  ${tw`
  
  h-10
  rounded-md
  rounded-tr-3xl
  rounded-bl-3xl
  bg-blue-700
  flex
  p-3
  text-left
  items-center
  text-white
 mt-2
 mb-2


`}
`;

export const TextMessageRight = styled.div`
  height: fit-content;
  margin-left: auto;
  width: fit-content;
  ${tw`
  rounded-md
  rounded-tr-3xl
  rounded-bl-3xl
  bg-blue-500
  flex
  p-3
items-center
text-white
text-left
mt-2
mb-2
`};
`;

export const Text = styled.h5`
  ${tw`
  
`}
`;
