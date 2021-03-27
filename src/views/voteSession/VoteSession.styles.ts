import styled from "styled-components";

export const StyledVoteSession = styled.div`
  padding: 50px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    padding: 10px;
  }
`;

export const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`;
