import styled from "styled-components";

export const StyledLayout = styled.main`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: #0a0808;
  color: #fdfcfe;
  padding: 40px;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-columns: min-content 1fr min-content;
  grid-template-areas: "logo title new" "content content content";
  align-items: center;
`;

export const GridArea = styled.div<{
  Area: string;
  Width?: string;
  Height?: string;
}>`
  grid-area: ${(p) => p.Area};
  width: ${(p) => p.Width};
  height: ${(p) => p.Height};
`;
