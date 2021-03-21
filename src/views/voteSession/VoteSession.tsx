import { useEffect, useState } from "react";
import { Text, VoteCard } from "./../../components";
import { GridArea, StyledOr, StyledVoteSession } from "./VoteSession.styles";
import { useAirtable, unescapeQuotes } from "./../../utilities";
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
  const base = useAirtable();

  const [sessionTitle, setSessionTitle] = useState("Loading...");
  const [sessionOptions, setSessionOptions] = useState<SessionOption[]>([]);
  const [voteCombinations, setVoteCombinations] = useState<number[][]>([]);
  const [results, setResults] = useState<SessionResult[]>([]);

  useEffect(() => {
    if (base) {
      base("Sessions")
        .select({
          fields: ["ID", "UserID", "Name"],
          filterByFormula: `ID = '${SessionID}'`,
        })
        .all()
        .then((results: Airtable.Records<{}>) => {
          // Parse results into workable array
          const queryResults: any[] = results.map((result) => result.fields);
          setSessionTitle(queryResults[0].Name);
        })
        .then(() => {
          base("Options")
            .select({
              fields: ["SessionID", "Name", "Score"],
              filterByFormula: `SessionID = '${SessionID}'`,
            })
            .all()
            .then((results: Airtable.Records<{}>) => {
              // Parse results into workable array
              const queryResults: any[] = results.map((result) => ({
                AirtableID: result.id,
                Fields: result.fields,
              }));

              // Set Option state
              setSessionOptions([...queryResults]);

              // generate all possible combinations
              const combinationArray = [];
              for (let i = 0; i < queryResults.length; i++) {
                for (let j = i + 1; j < queryResults.length; j++) {
                  combinationArray.push([i, j]);
                }
              }
              // Sort it randomly
              combinationArray.sort(() => 0.5 - Math.random());

              // An array full of the possible voting combinations
              setVoteCombinations([...combinationArray]);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [base, SessionID]);

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
  }, [voteCombinations]);

  return (
    <StyledVoteSession>
      <GridArea Area="title">
        <Text
          Margin="10px 0px"
          FontSize={34}
          FontFamily="Catamaran"
          FontWeight={800}
        >
          {sessionTitle}
        </Text>
      </GridArea>
      {!!sessionOptions.length && !!voteCombinations.length && (
        <>
          <GridArea Area="left">
            <VoteCard OnClick={() => updateOptionStat(voteCombinations[0][0])}>
              {unescapeQuotes(
                sessionOptions[voteCombinations[0][0]].Fields.Name
              )}
            </VoteCard>
          </GridArea>
          <GridArea Area="or">
            <StyledOr>
              <Text
                FontSize={34}
                FontFamily="Catamaran"
                FontWeight={800}
                Margin="0px 10px"
              >
                OR
              </Text>
            </StyledOr>
          </GridArea>
          <GridArea Area="right">
            <VoteCard OnClick={() => updateOptionStat(voteCombinations[0][1])}>
              {unescapeQuotes(
                sessionOptions[voteCombinations[0][1]].Fields.Name
              )}
            </VoteCard>
          </GridArea>
        </>
      )}
      {!!results.length && <SessionResults Results={results} />}
    </StyledVoteSession>
  );
};

/*
The scores are grabbed at the very beginning, making it hard to update as they go. 
So I can either:

1. on vote, re-grab the option, get it's score, then update it
  +: bit easier to grab and go  -: user never finishes the session, scores might be tainted

2. let the user go through all options, keep the score in state and regrab the options at the end then update all of them
  +: scores only updated when voting is completed  -: more complicated to grab, regrab and update all

3. Don't keep score in the database at all. Simply let the user know their own results via state
  +: no complicated api issues  -: non-aggregative scores

*/
