import styled from "styled-components";

export const StyledContainer = styled.div<{ $newSessionButton: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 3px solid ${(p) => (p.$newSessionButton ? "#86a5f5" : "#dad7cd")};
  box-sizing: border-box;
  color: #000;
  font-size: 20px;
  border-radius: 18px;
  padding: 0px;
`;

export const StyledDeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  height: 100%;
  font-size: 20px;
  padding: 15px 25px;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  background-color: transparent;
  border: 0px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  cursor: pointer;
  font-weight: 600;
  text-align: left @media (max-width: 1000px) {
    width: 100%;
  }

  &:hover {
    background-color: #dad7cd;
    transition: all 0.1s;
  }
`;

export const StyledSessionButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #000;
  font-size: 20px;
  padding: 15px 25px;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  background-color: transparent;
  border: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  cursor: pointer;
  font-weight: 600;
  text-align: left @media (max-width: 1000px) {
    width: 100%;
  }

  &:hover {
    background-color: #dad7cd;
    transition: all 0.1s;
  }
`;

export const TitleText = styled.div`
  text-transform: uppercase;
  font-size: 18px;
`;
