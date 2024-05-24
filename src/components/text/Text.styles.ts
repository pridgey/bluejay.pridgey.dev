import Styled from "styled-components";

export const StyledText = Styled.p<{
  $fontFamily: string;
  $fontSize: number;
  $fontWeight: number;
  $fontColor: string;
  $margin: string;
}>`
    font-family: "${(p) => p.$fontFamily}", sans-serif;
    font-size: ${(p) => p.$fontSize}px;
    font-weight: ${(p) => p.$fontWeight};
    color: ${(p) => p.$fontColor};
    margin: ${(p) => p.$margin};
    line-height: 1em;

    @media (max-width: 1000px) {
      font-size: ${(p) => Math.round(p.$fontSize / 1.4)}px;
    }
`;
