import React from "react";
import { useHistory } from "react-router-dom";
import { ButtonWithIcon } from "pelta-design-system";
import { localStorage } from "../services/localStorage";
import { wordings } from "../wordings";
import { routes } from "../pages/routes";

export { LogoutButton };

function LogoutButton() {
  const history = useHistory();
  return (
    <ButtonWithIcon
      onClick={logout}
      text={wordings.shared.logout}
      iconName="logout"
    />
  );

  function logout() {
    localStorage.bearerTokenHandler.remove();

    history.push(routes.DEFAULT.getPath());
  }
}
