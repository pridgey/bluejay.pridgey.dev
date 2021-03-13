import Styled from "styled-components";

export const StyledText = Styled.p<{
  FontFamily: string;
  FontSize: number;
  FontWeight: number;
  FontColor: string;
  Margin: string;
}>`
    font-family: "${(p) => p.FontFamily}", sans-serif;
    font-size: ${(p) => p.FontSize}px;
    font-weight: ${(p) => p.FontWeight};
    color: ${(p) => p.FontColor};
    margin: ${(p) => p.Margin};
`;
