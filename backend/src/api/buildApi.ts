import { Express } from "express";
import { buildRoutes } from "./routes";

export { buildApi };

function buildApi(app: Express) {
  const routes = buildRoutes();

  app.use("/api", routes);
}
