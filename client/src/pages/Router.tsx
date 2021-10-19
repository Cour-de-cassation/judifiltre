import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Assessor } from "./Assessor";
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
        <Route
          path={routes.DEFAULT.getPath()}
          render={({ location }) => (
            <Redirect
              to={{
                pathname: routes.ASSESSOR_HOME.getPath(),
                state: { from: location },
              }}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}
