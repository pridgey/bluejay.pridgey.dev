import styled from "styled-components";

export const StyledHomeDirectory = styled.div`
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

export const StyledSessions = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;
  padding-bottom: 150px;
  overflow: auto;
  max-height: 100%;
`;
