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
  const [sessions, updateSessions] = useState<SessionRecord[]>();

  const getSessions = async () => {
    try {
      const sessionRecords = await client
        .collection<SessionRecord>("bluejay_sessions")
        .getFullList({
          filter: `UserToken = '${UserID}'`,
        });

      updateSessions([...sessionRecords]);
    } catch (err) {
      console.error("Error fetching sessions", err);
    }
  };

  useEffect(() => {
    getSessions();
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
        <SessionButton ID="-1" Name="Make New Session" />
        {sessions?.map((sess, index) => (
          <SessionButton
            ID={sess.id}
            Name={sess.Name}
            key={`session-button-${index}`}
            OnDelete={() => getSessions()}
          />
        ))}
      </StyledSessions>
    </StyledHomeDirectory>
  );
};
