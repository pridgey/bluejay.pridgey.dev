import { ReactNode } from "react";
import { Button, Logo, Text } from "./../";
import { StyledLayout, GridArea } from "./Layout.styles";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <StyledLayout>
      <GridArea Area="logo">
        <Logo Height="70px" Width="70px" />
      </GridArea>
      <GridArea Area="title">
        <Text
          FontFamily="Catamaran"
          FontWeight={800}
          FontSize={50}
          Margin="0px 0px 0px 15px"
        >
          BlueJay
        </Text>
      </GridArea>
      <GridArea Area="new">
        <Button
          OnClick={(e) =>
            window.location.assign(`${window.location.origin}?s=-1`)
          }
        >
          New Round
        </Button>
      </GridArea>
      <GridArea Area="content" Width="100%" Height="100%">
        {children}
      </GridArea>
    </StyledLayout>
  );
};
