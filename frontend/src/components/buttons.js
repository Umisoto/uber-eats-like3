import styled from "styled-components";

export const StandardButton = styled.button`
  cursor: pointer;
  font-size: 1.6vw;
  line-height: 3vw;
  border: none;
  &:hover {
    opacity: 0.7;
  }
  &:focus {
    outline: 0;
  }
`;

export const ConfirmButton = styled(StandardButton)`
  height: 3vw;
  width: 40vw;
  background-color: black;
  color: white;
  margin: 0 auto;
`;

export const RoundButton = styled(StandardButton)`
  width: 3vw;
  height: 3vw;
  border-radius: 1.5vw;
`;
