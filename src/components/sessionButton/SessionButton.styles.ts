import styled from "styled-components";

export const StyledSessionButton = styled.button<{ NewSessionButton: boolean }>`
  border: 3px solid ${(p) => (p.NewSessionButton ? "#86a5f5" : "#dad7cd")};
  padding: 15px 25px;
  box-sizing: border-box;
  color: #000;
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
  background-color: transparent;
  cursor: pointer;
  border-radius: 18px;
  margin: 10px;
  font-weight: 600;
  text-align: left;

  &:hover {
    background-color: ${(p) => (p.NewSessionButton ? "#86a5f5" : "#dad7cd")};
    transition: all 0.1s;
  }

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const TitleText = styled.div`
  text-transform: uppercase;
  font-size: 18px;
`;
