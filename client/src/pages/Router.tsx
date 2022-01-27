import React, { FunctionComponent } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import { localStorage } from "../services/localStorage";
import { Assessor } from "./Assessor";
import { Login } from "./Login";
import { routes } from "./routes";

export { Router };

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthenticatedRoute path={routes.ASSESSOR_DOCUMENT.getPath()}>
          <Assessor />
        </AuthenticatedRoute>
        <AuthenticatedRoute path={routes.ASSESSOR_HOME.getPath()}>
          <Assessor />
        </AuthenticatedRoute>
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

const AuthenticatedRoute: FunctionComponent<RouteProps> = ({
  children,
  ...rest
}: RouteProps) => (
  <Route
    {...rest}
    render={({ location }) =>
      isAuthenticated() ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: routes.LOGIN.getPath(),
            state: { from: location },
          }}
        />
      )
    }
  />
);

function isAuthenticated() {
  return !!localStorage.bearerTokenHandler.get();
}
