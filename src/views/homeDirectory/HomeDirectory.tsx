import { useState, useEffect } from "react";
import { useAirtable } from "./../../utilities";
import {
  StyledHomeDirectory,
  StyledHeader,
  StyledSessions,
} from "./HomeDirectory.styles";
import { Logo, SessionButton, Text } from "./../../components";

type HomeDirectoryProps = {
  UserID: string;
};

export const HomeDirectory = ({ UserID }: HomeDirectoryProps) => {
  const base = useAirtable();
  const [sessions, updateSessions] = useState<any[]>();

  useEffect(() => {
    if (base) {
      base("Sessions")
        .select({
          fields: ["ID", "UserID", "Name"],
          filterByFormula: `UserID = '${UserID}'`,
        })
        .all()
        .then((results: Airtable.Records<{}>) => {
          const queryResults: any[] = results.map((result) => result.fields);
          updateSessions([...queryResults]);
        });
    }
  }, [base, UserID]);

  return (
    <StyledHomeDirectory>
      <StyledHeader>
        <Logo Height="70px" Width="70px" />
        <Text
          FontFamily="Catamaran"
          FontSize={60}
          FontColor="#86a5f5"
          FontWeight={800}
          Margin="0px 15px"
        >
          BlueJay
        </Text>
      </StyledHeader>
      <StyledSessions>
        <SessionButton ID="-1" Name="Make New Session +" />
        {sessions?.map((sess, index) => (
          <SessionButton
            ID={sess.ID}
            Name={sess.Name}
            key={`session-button-${index}`}
          />
        ))}
      </StyledSessions>
    </StyledHomeDirectory>
  );
};
