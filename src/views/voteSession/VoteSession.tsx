import { useEffect, useState } from "react";
import { Logo, Text, VoteCard } from "./../../components";
import { StyledVoteSession, StyledHeader } from "./VoteSession.styles";
import { unescapeQuotes, usePocketBase } from "./../../utilities";
import { SessionResults } from "./../sessionResults";
import { OptionRecord, SessionRecord } from "../../types";

type VoteSessionProps = {
  SessionID: string;
};

type SessionResult = {
  Name: string;
  Score: number;
};

export const VoteSession = ({ SessionID }: VoteSessionProps) => {
  const [sessionTitle, setSessionTitle] = useState("Loading...");
  const [sessionOptions, setSessionOptions] = useState<OptionRecord[]>([]);
  const [voteCombinations, setVoteCombinations] = useState<number[][]>([]);
  const [results, setResults] = useState<SessionResult[]>([]);

  const client = usePocketBase();

  useEffect(() => {
    const getSession = async () => {
      try {
        // Grab the session from the url param
        const sessionRecordPromise = client
          .collection<SessionRecord>("bluejay_sessions")
          .getOne(SessionID);

        // Grab all the options for the session
        const sessionOptionsPromise = client
          .collection<OptionRecord>("bluejay_options")
          .getFullList({
            filter: `SessionID = '${SessionID}'`,
          });

        // Run promises in parallel
        const [sessionRecord, sessionOptions] = await Promise.all([
          sessionRecordPromise,
          sessionOptionsPromise,
        ]);

        // Set the session title
        setSessionTitle(sessionRecord.Name);
        // Set the session options
        setSessionOptions(sessionOptions);

        // generate all possible combinations
        const combinationArray = [];
        for (let i = 0; i < sessionOptions.length; i++) {
          for (let j = i + 1; j < sessionOptions.length; j++) {
            combinationArray.push([i, j]);
          }
        }
        // Sort it randomly
        combinationArray.sort(() => 0.5 - Math.random());

        // An array full of the possible voting combinations
        setVoteCombinations([...combinationArray]);
      } catch (err) {
        console.error("Error fetching session", err);
        setSessionTitle("Error fetching session");
      }
    };

    // Run the call
    getSession();
  }, [client, SessionID]);

  // Update the score of the option and remove the combination from the array
  const updateOptionStat = (optionIndex: number) => {
    // First update the local state score
    const currentOptions = sessionOptions;
    currentOptions[optionIndex].Score += 1;
    setSessionOptions([...currentOptions]);

    // Finally remove that combination from state
    const currentCombos = [...voteCombinations];
    currentCombos.shift();
    setVoteCombinations([...currentCombos]);
  };

  useEffect(() => {
    if (voteCombinations.length === 0) {
      const optionResults = sessionOptions
        .sort((a, b) => b.Score - a.Score)
        .map((opt) => ({
          Name: opt.Value,
          Score: opt.Score,
        }));
      setResults([...optionResults]);
    }
    // eslint-disable-next-line
  }, [voteCombinations]);

  return (
    <StyledVoteSession>
      <StyledHeader>
        <Logo Height="70px" Width="70px" />
        <Text
          FontFamily="Catamaran"
          FontSize={60}
          FontColor="#86a5f5"
          FontWeight={800}
          Margin="0px 15px"
        >
          {sessionTitle}
        </Text>
      </StyledHeader>
      {!!voteCombinations.length && (
        <Text
          Margin="0px 0px 10px 0px"
          FontSize={34}
          FontFamily="Catamaran"
          FontWeight={800}
        >
          You have completed{" "}
          {(sessionOptions.length / 2) * (sessionOptions.length - 1) -
            voteCombinations.length}{" "}
          comparisons and have {voteCombinations.length} more to go!
        </Text>
      )}
      {!!sessionOptions.length && !!voteCombinations.length && (
        <>
          <VoteCard
            ID={voteCombinations[0][0]}
            OnClick={() => {
              updateOptionStat(voteCombinations[0][0]);
            }}
          >
            {unescapeQuotes(sessionOptions[voteCombinations[0][0]].Value)}
          </VoteCard>

          <VoteCard
            ID={voteCombinations[0][1]}
            OnClick={() => updateOptionStat(voteCombinations[0][1])}
          >
            {unescapeQuotes(sessionOptions[voteCombinations[0][1]].Value)}
          </VoteCard>
        </>
      )}
      {!!results.length && <SessionResults Results={results} />}
    </StyledVoteSession>
  );
};
