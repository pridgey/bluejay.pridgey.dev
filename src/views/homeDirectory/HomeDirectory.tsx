import { useState, useEffect } from "react";
import { usePocketBase } from "./../../utilities";
import {
  StyledHomeDirectory,
  StyledHeader,
  StyledSessions,
} from "./HomeDirectory.styles";
import { Logo, SessionButton, Text } from "./../../components";
import { SessionRecord } from "../../types";

type HomeDirectoryProps = {
  UserID: string;
};

export const HomeDirectory = ({ UserID }: HomeDirectoryProps) => {
  const client = usePocketBase();
  const [sessions, updateSessions] = useState<any[]>();

  useEffect(() => {
    const getSessions = async () => {
      const sessionRecords = await client
        .collection<SessionRecord>("bluejay_sessions")
        .getFullList({
          filter: `UserToken = '${UserID}'`,
        });

      console.log("User Sessions", sessionRecords);
    };

    getSessions();

    // if (base) {
    //   base("Sessions")
    //     .select({
    //       fields: ["ID", "UserID", "Name"],
    //       filterByFormula: `UserID = '${UserID}'`,
    //     })
    //     .all()
    //     .then((results: Airtable.Records<{}>) => {
    //       const queryResults: any[] = results.map((result) => result.fields);
    //       updateSessions([...queryResults]);
    //     });
    // }
  }, [client, UserID]);

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
