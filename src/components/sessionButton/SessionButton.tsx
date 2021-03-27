import { StyledSessionButton, TitleText } from "./SessionButton.styles";

type SessionButtonProps = {
  Name: string;
  ID: string;
};

export const SessionButton = ({ Name, ID }: SessionButtonProps) => (
  <StyledSessionButton
    onClick={() => window.location.assign(`${window.origin}?s=${ID}`)}
    NewSessionButton={ID === "-1"}
  >
    <TitleText>{ID === "-1" ? "Create New:" : "Continue Session:"}</TitleText>
    {Name}
  </StyledSessionButton>
);
