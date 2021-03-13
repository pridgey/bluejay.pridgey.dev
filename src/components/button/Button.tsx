import React, { MouseEvent, ReactNode } from "react";
import { StyledButton } from "./Button.styles";

type ButtonProps = {
  Type?: "Primary" | "Secondary";
  children: ReactNode;
  Margin?: string;
  OnClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({
  children,
  Type = "Primary",
  Margin = "0px",
  OnClick,
}: ButtonProps) => {
  return (
    <StyledButton
      Type={Type}
      Margin={Margin}
      onClick={(e: MouseEvent<HTMLButtonElement>) => OnClick(e)}
    >
      {children}
    </StyledButton>
  );
};
