import styled from "styled-components";

export const StyledVoteSession = styled.div`
  display: grid;
  width: 100%;
  box-sizing: border-box;
  grid-template-rows: min-content auto;
  grid-template-columns: 1fr min-content 1fr;
  grid-template-areas: "title title title" "left or right";
  gap: 15px;
  align-items: stretch;
`;

export const GridArea = styled.div<{ Area: string }>`
  grid-area: ${(p) => p.Area};
`;

export const StyledOr = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
