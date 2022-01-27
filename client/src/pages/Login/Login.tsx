import React, { FunctionComponent } from "react";
import { LoginForm } from "pelta-design-system";
import { useHistory } from "react-router-dom";
import { userType } from "judifiltre-core";
import { routes } from "../routes";
import { apiCaller } from "../../services/api";
import { localStorage } from "../../services/localStorage";

export { Login };

const Login: FunctionComponent = () => {
  const history = useHistory();
  const styles = buildStyles();

  return (
    <div style={styles.mainContainer}>
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );

  async function handleSubmit({
    email,
    password,
  }: {
    email: userType["email"];
    password: string;
  }) {
    const response = await apiCaller.get("login", {
      email,
      password,
    });

    const { token } = response.data as { token: string };

    localStorage.bearerTokenHandler.set(token);

    history.push(routes.DEFAULT.getPath());
  }

  function buildStyles() {
    return {
      mainContainer: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      },
    } as const;
  }
};
