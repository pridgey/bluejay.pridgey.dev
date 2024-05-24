import { useState, useEffect, ReactNode, MouseEvent } from "react";
import { StyledVoteCard } from "./VoteCard.styles";

type VoteCardProps = {
  ID: number;
  children: ReactNode;
  OnClick: () => void;
};

export const VoteCard = ({ ID, children, OnClick }: VoteCardProps) => {
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    setBgImage(
      `https://source.unsplash.com/1600x900/?${children?.toString()},pattern`
    );
  }, [children]);

  return (
    <StyledVoteCard
      $background={bgImage}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        OnClick();
        event.currentTarget.blur();
      }}
    >
      {children}
    </StyledVoteCard>
  );
};
