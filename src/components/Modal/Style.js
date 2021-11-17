import styled from "styled-components";
import tw from "twin.macro";

export const ModalWrapper = styled.div`
  background-color: rgb(12, 12, 12, 0.2);
  z-index: 99;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  ${tw`
   w-full
   h-full
   flex
   items-center
   justify-center
   `}
`;

export const ModalContents = styled.div`
  height: fit-content;

  ${tw`
   w-72
   p-2
   flex
   flex-col
   items-center
   bg-white
   rounded-md
   shadow-sm
   `}
`;

export const ModalUpper = styled.div`
  height: fit-content;

  ${tw`
w-full
 pt-2
 pb-2
 flex
 items-center
 justify-between
   `}
`;

export const ModalCenter = styled.div`
  height: fit-content;
  ${tw`
  w-full
  pb-3

   `}
`;

export const ModalClose = styled.div`
  transition: all ease-in 0.2s;
  ${tw`
  p-2
  hover:bg-gray-100
  hover:shadow-md
  hover:rounded-full
  flex
  items-center
   `}
`;

export const ModalInput = styled.form`
  ${tw`
      flex
      flex-col
      justify-between
      items-center
      relative
   `}
`;

export const ModalButton = styled.button`
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

export const ModalUpload = styled.div`
  ${tw`

   `}
`;

export const FileInput = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;

export const FileLabel = styled.label`
  position: relative;

  background: linear-gradient(to left, #27f041, #6ef762);
  display: flex;
  z-index: 2;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease-out;
  ${tw`
     shadow-sm
  rounded-full
    flex
  items-center
  justify-center
   w-14
   h-14
   hover:w-16
   hover:h-16
  `}
`;

export const ChosenImage = styled.img`
  ${tw`
  pt-1
  pb-1
 w-32
 h-24
`}
`;

export const ModalLoadingButton = styled.button`
  ${tw`
p-2 
w-full
bg-gray-500
text-white
rounded-sm
focus:bg-gray-600
focus:ring-1
`}
`;
