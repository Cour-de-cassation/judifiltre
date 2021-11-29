import React from "react";
import { ThemeProvider } from "pelta-design-system";
import { Router } from "./pages/Router";

export { App };

const App = () => (
  <ThemeProvider>
    <Router />
  </ThemeProvider>
);
