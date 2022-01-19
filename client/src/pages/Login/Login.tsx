import React, { FunctionComponent } from "react";
import { LoginForm } from "pelta-design-system";
import { useHistory } from "react-router-dom";
import { routes } from "../routes";

export { Login };

const Login: FunctionComponent = () => {
  const history = useHistory();
  const styles = buildStyles();

  return (
    <div style={styles.mainContainer}>
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );

  async function handleSubmit() {
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
