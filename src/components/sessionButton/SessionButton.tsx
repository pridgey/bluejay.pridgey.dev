import { SessionRecord } from "../../types";
import { usePocketBase } from "../../utilities";
import {
  StyledContainer,
  StyledDeleteButton,
  StyledSessionButton,
  TitleText,
} from "./SessionButton.styles";
import { RiDeleteBinLine } from "react-icons/ri";

type SessionButtonProps = {
  Name: string;
  ID: string;
  OnDelete?: () => void;
};

export const SessionButton = ({ Name, ID, OnDelete }: SessionButtonProps) => {
  const client = usePocketBase();

  return (
    <StyledContainer $newSessionButton={ID === "-1"}>
      <StyledSessionButton
        onClick={() => window.location.assign(`${window.origin}?s=${ID}`)}
      >
        <TitleText>
          {ID === "-1" ? "Create New:" : "Continue Session:"}
        </TitleText>
        {Name}
      </StyledSessionButton>
      {ID !== "-1" && (
        <StyledDeleteButton
          onClick={async () => {
            await client
              .collection<SessionRecord>("bluejay_sessions")
              .delete(ID);

            OnDelete?.();
          }}
        >
          <RiDeleteBinLine />
        </StyledDeleteButton>
      )}
    </StyledContainer>
  );
};
