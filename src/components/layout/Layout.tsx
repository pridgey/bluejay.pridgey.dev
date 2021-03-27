import { ReactNode } from "react";
import { LeftFawn, RightFawn } from "./../";
import { StyledBackdrop, StyledContent, StyledLayout } from "./Layout.styles";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <StyledBackdrop>
      <StyledLayout>
        <StyledContent>{children}</StyledContent>
      </StyledLayout>
      <LeftFawn />
      <RightFawn />
    </StyledBackdrop>
  );
};
