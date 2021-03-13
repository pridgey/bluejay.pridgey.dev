import { KeyboardEvent, useState, useRef } from "react";
import { StyledNewSession, SessionOptionsContainer } from "./NewSession.styles";
import { Button, Input, Text } from "./../../components";

export const NewSession = () => {
  const [sessionOptions, setSessionOptions] = useState<string[]>([]);
  const [currentError, setCurrentError] = useState<string>("");

  const nameRef = useRef<HTMLInputElement>(document.createElement("input"));

  return (
    <StyledNewSession>
      <Text
        Margin="0px 0px 10px 0px"
        FontSize={34}
        FontFamily="Catamaran"
        FontWeight={800}
      >
        New Voting Session
      </Text>
      <Text Margin="10px 0px 20px 0px">
        Let's set up your new round robin voting session using BlueJay. First
        let's grab a label for the session...
      </Text>
      <Input
        Label="New Session Name"
        Ref={nameRef}
        Placeholder="Which Disney Channel Original Movie is the best?"
      />
      <Text Margin="20px 0px 20px 0px">
        And then all we need are the options the users will be voting on...
      </Text>
      <Input
        Label="Voting Options"
        Placeholder="Enter a new option and hit enter"
        OnKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const modOptions = sessionOptions;
            modOptions.push(e.currentTarget.value.replace(",", ""));
            setSessionOptions([...modOptions]);
            e.currentTarget.value = "";
            e.currentTarget.focus();
          }
        }}
      />
      <SessionOptionsContainer>
        {sessionOptions.map((option: string, index: number) => (
          <Button
            Type="Secondary"
            key={`optionbutton-${index}`}
            OnClick={() => {
              const modOptions = sessionOptions;
              modOptions.splice(index, 1);
              setSessionOptions([...modOptions]);
            }}
            Margin="5px 5px"
          >
            {option}
          </Button>
        ))}
      </SessionOptionsContainer>
      <Button
        OnClick={() => {
          setCurrentError("");
          if (!nameRef?.current?.value) {
            setCurrentError("You can't save a session without a session name");
          } else if (sessionOptions.length === 0) {
            setCurrentError(
              "You must have voting options for people to vote on"
            );
          }
        }}
        Margin="50px 0px"
      >
        Save Session
      </Button>
      <Text>{currentError}</Text>
    </StyledNewSession>
  );
};
