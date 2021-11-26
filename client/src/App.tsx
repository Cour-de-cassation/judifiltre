import React from "react";
import { ThemeProvider } from "pelta-design-system";
import { Router } from "./pages/Router";

export { App };

function App() {
  return (
    <ThemeProvider>
      <Router />;
    </ThemeProvider>
  );
}
