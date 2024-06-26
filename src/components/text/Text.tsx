import { ReactNode } from "react";
import { StyledText } from "./Text.styles";

type TextProps = {
  children: ReactNode;
  FontFamily?: "Catamaran" | "Montserrat";
  FontSize?: number;
  FontWeight?: 400 | 800;
  FontColor?: string;
  Margin?: string;
};

export const Text = ({
  children,
  FontFamily = "Montserrat",
  FontSize = 18,
  FontWeight = 400,
  FontColor = "#000",
  Margin = "0px",
}: TextProps) => {
  return (
    <StyledText
      $fontFamily={FontFamily}
      $fontSize={FontSize}
      $fontWeight={FontWeight}
      $fontColor={FontColor}
      $margin={Margin}
    >
      {children}
    </StyledText>
  );
};
