import React from "react";
import styled from "react-emotion";
import { useApolloClient } from "@apollo/react-hooks";

import { menuItemClassName } from "../components/menu-item";
import { ReactComponent as ExitIcon } from "../assets/icons/exit.svg";

const LogoutButton: React.FC<any> = () => {
  const client = useApolloClient();

  return (
    <StyledButton
      onClick={() => {
        client.writeData({ data: { isLoggedIn: false } });
        localStorage.clear();
      }}
    >
      <ExitIcon />
      Logout
    </StyledButton>
  );
};

export default LogoutButton;

const StyledButton = styled("button")(menuItemClassName, {
  background: "none",
  border: "none",
  padding: 0
});
