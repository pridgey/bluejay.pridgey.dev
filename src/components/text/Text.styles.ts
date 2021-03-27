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
    line-height: 1em;

    @media (max-width: 1000px) {
      font-size: ${(p) => Math.round(p.FontSize / 1.4)}px;
    }
`;
