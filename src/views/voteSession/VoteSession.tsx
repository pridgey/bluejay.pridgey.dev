import { useEffect, useState } from "react";
import { Text, VoteCard } from "./../../components";
import { GridArea, StyledOr, StyledVoteSession } from "./VoteSession.styles";
import { useAirtable } from "./../../utilities";

type VoteSessionProps = {
  SessionID: string;
};

type SessionOptionFields = {
  SessionID: string;
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

              console.log("combos", combinationArray);
              // An array full of the possible voting combinations
              setVoteCombinations([...combinationArray]);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [base, SessionID]);

  const updateOptionStat = (optionIndex: number) => {
    if (base) {
      base("Options")
        .update([
          {
            id: sessionOptions[optionIndex].AirtableID,
            fields: {
              ...sessionOptions[optionIndex].Fields,
              Score: sessionOptions[optionIndex].Fields.Score + 1, // this isn't great because we grab the score from the beginning, so multiple votes won't count
            },
          },
        ])
        .then(() => {
          // Remove last combo
          const currentOptions = [...voteCombinations];
          currentOptions.shift();
          setVoteCombinations([...currentOptions]);
        })
        .catch((err) => console.error(err));
    }
  };

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
              {sessionOptions[voteCombinations[0][0]].Fields.Name.replace(
                /\\'/g,
                "'"
              ).replace(/\\"/g, '"')}
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
              {sessionOptions[voteCombinations[0][1]].Fields.Name.replace(
                /\\'/g,
                "'"
              ).replace(/\\"/g, '"')}
            </VoteCard>
          </GridArea>
        </>
      )}
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
