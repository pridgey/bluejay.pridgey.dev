import styled from "styled-components";

export const StyledVoteCard = styled.button`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 100px;
  background-color: #0c0b0b;
  text-transform: uppercase;
  font-size: 60px;
  font-weight: 800;
  font-family: "Catamaran", sans-serif;
  cursor: pointer;
  border: 0px;
  color: #fdfcfe;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);

  &:hover,
  &:focus {
    background-color: #100e0e;
    color: #86a5f5;
    transform: scale(1.02);
    transition: all 0.3s;
    outline: 0px;
  }

  &:active {
    transform: scale(1.01);
    transition: all 0.3s;
  }
`;
