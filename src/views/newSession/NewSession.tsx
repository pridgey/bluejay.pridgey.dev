import { KeyboardEvent, useState, useRef, useEffect } from "react";
import {
  StyledNewSession,
  StyledHeader,
  SessionOptionsContainer,
} from "./NewSession.styles";
import { Button, Input, Text, Logo, Loader } from "./../../components";
import { useAirtable } from "./../../utilities";
import { v4 } from "uuid";

type NewSessionProps = {
  UserID: string;
};

export const NewSession = ({ UserID }: NewSessionProps) => {
  const [sessionOptions, setSessionOptions] = useState<string[]>([]);
  const [currentError, setCurrentError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [manyOptionWarning, setmanyOptionWarning] = useState("");

  const nameRef = useRef<HTMLInputElement>(document.createElement("input"));

  const base = useAirtable();

  useEffect(() => {
    if (sessionOptions.length >= 10) {
      const numOfComparisons =
        (sessionOptions.length / 2) * (sessionOptions.length - 1);
      setmanyOptionWarning(
        `Warning: ${sessionOptions.length} options means users will have to vote on ${numOfComparisons} one-on-one comparisons before getting their results.`
      );
    } else {
      setmanyOptionWarning("");
    }
  }, [sessionOptions]);

  return (
    <StyledNewSession>
      <StyledHeader>
        <Logo Height="70px" Width="70px" />
        <Text
          FontFamily="Catamaran"
          FontSize={60}
          FontColor="#86a5f5"
          FontWeight={800}
          Margin="0px 15px"
        >
          New Session
        </Text>
      </StyledHeader>
      <Text
        Margin="0px 0px 10px 0px"
        FontSize={34}
        FontFamily="Catamaran"
        FontWeight={800}
      >
        Gathering the requirements
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
          if (
            (e.key === "Enter" || e.key === ",") &&
            !!e.currentTarget.value.length
          ) {
            e.preventDefault();
            const modOptions = sessionOptions;
            modOptions.push(e.currentTarget.value.replace(",", ""));
            setSessionOptions([...modOptions]);
            e.currentTarget.value = "";
            e.currentTarget.focus();
          }
        }}
      />
      {!!manyOptionWarning.length && (
        <Text FontColor="#9a031e" FontSize={14} Margin="5px 0px">
          {manyOptionWarning}
        </Text>
      )}
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
        Disabled={!nameRef?.current?.value || sessionOptions.length === 0}
        OnClick={() => {
          setCurrentError("");
          if (!nameRef?.current?.value) {
            setCurrentError("You can't save a session without a session name");
          } else if (sessionOptions.length === 0) {
            setCurrentError(
              "You must have voting options for people to vote on"
            );
          } else {
            // Do the thing
            if (base) {
              setLoading(true);
              const newSessionID = v4();
              base("Sessions")
                .create([
                  {
                    fields: {
                      ID: newSessionID,
                      Name: nameRef.current.value,
                      UserID: UserID,
                    },
                  },
                ])
                .then(() => {
                  // Create an array of promises
                  const promiseArray: Promise<any>[] = [];

                  for (let i = 0; i < sessionOptions.length; i += 10) {
                    // Go in chunks of ten
                    const arrayChunk = sessionOptions.slice(i, i + 10);
                    promiseArray.push(
                      base("Options")
                        .create(
                          arrayChunk.map((option) => ({
                            fields: {
                              ID: v4(),
                              Name: option
                                .replace(/'/g, "\\'")
                                .replace(/"/g, '\\"'),
                              SessionID: newSessionID,
                              Score: 0,
                            },
                          }))
                        )
                        .catch((err) => console.error(err))
                    );
                  }

                  Promise.allSettled(promiseArray)
                    .then(() => {
                      // Jump to the session!
                      window.location.assign(
                        `${window.location.origin}?s=${newSessionID}`
                      );
                    })
                    .catch((err) => console.error(err));
                })
                .catch((err) => console.error(err));
            }
          }
        }}
        Margin="50px 0px"
      >
        Save Session
      </Button>
      <Text>{currentError}</Text>
      {loading && <Loader />}
    </StyledNewSession>
  );
};
