import styled from "styled-components";

export const StyledHomeDirectory = styled.div`
  padding: 50px;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 1000px) {
    padding: 10px;
  }
`;

export const HomeBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  align-items: center;
  justify-items: center;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;
