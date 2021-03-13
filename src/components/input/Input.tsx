import { RefObject, KeyboardEvent } from "react";
import { StyledInput, StyledLabel } from "./Input.styles";

type InputProps = {
  Ref?: RefObject<HTMLInputElement>;
  DefaultValue?: string;
  Placeholder?: string;
  Label: string;
  OnBlur?: () => void;
  OnKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export const Input = ({
  Ref,
  DefaultValue = "",
  Placeholder = "",
  Label,
  OnBlur,
  OnKeyUp,
}: InputProps) => {
  return (
    <StyledLabel>
      {Label}
      <StyledInput
        defaultValue={DefaultValue}
        ref={Ref}
        placeholder={Placeholder}
        onBlur={() => OnBlur && OnBlur()}
        onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => OnKeyUp && OnKeyUp(e)}
      />
    </StyledLabel>
  );
};
