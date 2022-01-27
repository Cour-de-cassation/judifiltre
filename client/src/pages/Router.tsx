import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { localStorage } from "../services/localStorage";
import { Assessor } from "./Assessor";
import { Login } from "./Login";
import { routes } from "./routes";

export { Router };

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.ASSESSOR_DOCUMENT.getPath()}>
          <Assessor />
        </Route>
        <Route path={routes.ASSESSOR_HOME.getPath()}>
          <Assessor />
        </Route>
        <Route path={routes.LOGIN.getPath()}>
          <Login />
        </Route>
        <Route
          path={routes.DEFAULT.getPath()}
          render={({ location }) => (
            <Redirect
              to={{
                pathname: isAuthenticated()
                  ? routes.ASSESSOR_HOME.getPath()
                  : routes.LOGIN.getPath(),
                state: { from: location },
              }}
            />
          )}
        />
        <Redirect path="/" to={{ pathname: routes.DEFAULT.getPath() }} />
      </Switch>
    </BrowserRouter>
  );
}
function isAuthenticated() {
  return !!localStorage.bearerTokenHandler.get();
}
