import { useEffect, useState } from "react";
import { Logo, Text, VoteCard } from "./../../components";
import { StyledVoteSession, StyledHeader } from "./VoteSession.styles";
import { unescapeQuotes } from "./../../utilities";
import { SessionResults } from "./../sessionResults";

type VoteSessionProps = {
  SessionID: string;
};

type SessionOptionFields = {
  SessionID: string;
  Name: string;
  Score: number;
};

type SessionResult = {
  Name: string;
  Score: number;
};

type SessionOption = {
  AirtableID: string;
  Fields: SessionOptionFields;
};

export const VoteSession = ({ SessionID }: VoteSessionProps) => {
  const [sessionTitle, setSessionTitle] = useState("Loading...");
  const [sessionOptions, setSessionOptions] = useState<SessionOption[]>([]);
  const [voteCombinations, setVoteCombinations] = useState<number[][]>([]);
  const [results, setResults] = useState<SessionResult[]>([]);

  // useEffect(() => {
  //   if (base) {
  //     base("Sessions")
  //       .select({
  //         fields: ["ID", "UserID", "Name"],
  //         filterByFormula: `ID = '${SessionID}'`,
  //       })
  //       .all()
  //       .then((results: Airtable.Records<{}>) => {
  //         // Parse results into workable array
  //         const queryResults: any[] = results.map((result) => result.fields);
  //         setSessionTitle(queryResults[0].Name);
  //       })
  //       .then(() => {
  //         base("Options")
  //           .select({
  //             fields: ["SessionID", "Name", "Score"],
  //             filterByFormula: `SessionID = '${SessionID}'`,
  //           })
  //           .all()
  //           .then((results: Airtable.Records<{}>) => {
  //             // Parse results into workable array
  //             const queryResults: any[] = results.map((result) => ({
  //               AirtableID: result.id,
  //               Fields: result.fields,
  //             }));

  //             // Set Option state
  //             setSessionOptions([...queryResults]);

  //             // generate all possible combinations
  //             const combinationArray = [];
  //             for (let i = 0; i < queryResults.length; i++) {
  //               for (let j = i + 1; j < queryResults.length; j++) {
  //                 combinationArray.push([i, j]);
  //               }
  //             }
  //             // Sort it randomly
  //             combinationArray.sort(() => 0.5 - Math.random());

  //             // An array full of the possible voting combinations
  //             setVoteCombinations([...combinationArray]);
  //           });
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [base, SessionID]);

  const updateOptionStat = (optionIndex: number) => {
    // First update the local state score
    const currentOptions = sessionOptions;
    currentOptions[optionIndex].Fields.Score += 1;
    setSessionOptions([...currentOptions]);

    // Finally remove that combination from state
    const currentCombos = [...voteCombinations];
    currentCombos.shift();
    setVoteCombinations([...currentCombos]);
  };

  useEffect(() => {
    if (voteCombinations.length === 0) {
      const optionResults = sessionOptions
        .sort((a, b) => b.Fields.Score - a.Fields.Score)
        .map((opt) => ({
          Name: opt.Fields.Name,
          Score: opt.Fields.Score,
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
            {unescapeQuotes(sessionOptions[voteCombinations[0][0]].Fields.Name)}
          </VoteCard>

          <VoteCard
            ID={voteCombinations[0][1]}
            OnClick={() => updateOptionStat(voteCombinations[0][1])}
          >
            {unescapeQuotes(sessionOptions[voteCombinations[0][1]].Fields.Name)}
          </VoteCard>
        </>
      )}
      {!!results.length && <SessionResults Results={results} />}
    </StyledVoteSession>
  );
};
