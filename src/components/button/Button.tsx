import { MouseEvent, ReactNode } from "react";
import { StyledButton } from "./Button.styles";

type ButtonProps = {
  Disabled?: boolean;
  Type?: "Primary" | "Secondary";
  children: ReactNode;
  Margin?: string;
  OnClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({
  Disabled = false,
  children,
  Type = "Primary",
  Margin = "0px",
  OnClick,
}: ButtonProps) => {
  return (
    <StyledButton
      $disabled={Disabled}
      $type={Type}
      $margin={Margin}
      onClick={(e: MouseEvent<HTMLButtonElement>) => OnClick(e)}
    >
      {children}
    </StyledButton>
  );
};
