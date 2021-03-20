import { useState, useEffect } from "react";
import { useAirtable } from "./../../utilities";
import { StyledHomeDirectory, HomeBody } from "./HomeDirectory.styles";
import { Text, TropheySVG } from "./../../components";

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
      <Text FontFamily="Catamaran" FontSize={50} FontWeight={800}>
        Welcome to BlueJay
      </Text>
      <HomeBody>
        <Text FontFamily="Montserrat" FontSize={22} FontWeight={400}>
          With BlueJay you can figure out the best song in the world by
          performing a simple round-robin comparison of many options. Once you
          set up a session, you can send the link out to friends to ensure you
          aren't missing any viewpoint. So why wait? Start a new session and
          prove to everyone that "Toxic" by Brittany Spears is truly the
          greatest song of all time.
        </Text>
        <TropheySVG Width="40vw" Height="unset" />
      </HomeBody>
    </StyledHomeDirectory>
  );
};
