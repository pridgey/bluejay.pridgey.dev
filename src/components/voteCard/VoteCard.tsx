import React, { ReactNode } from "react";
import { StyledVoteCard } from "./VoteCard.styles";

type VoteCardProps = {
  children: ReactNode;
  OnClick: () => void;
};

export const VoteCard = ({ children, OnClick }: VoteCardProps) => {
  return <StyledVoteCard onClick={() => OnClick()}>{children}</StyledVoteCard>;
};
