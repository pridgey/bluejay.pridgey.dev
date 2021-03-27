import styled from "styled-components";

export const StyledVoteCard = styled.button<{ Background: string }>`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-transform: uppercase;
  font-size: 60px;
  line-height: 1em;
  font-weight: 800;
  font-family: "Catamaran", sans-serif;
  cursor: pointer;
  border: 0px;
  color: #fdfcfe;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)) 0% 0% /
      cover,
    url("${(p) => p.Background}") center center;

  &:hover,
  &:focus {
    color: #86a5f5;
    transform: scale(1.02);
    transition: all 0.3s;
    outline: 0px;
  }

  @media (max-width: 1000px) {
    font-size: 40px;

    &:hover,
    &:focus {
      color: #fdfcfe;
      transform: scale(1);
      transition: all 0.3s;
      outline: 0px;
    }
  }
`;
