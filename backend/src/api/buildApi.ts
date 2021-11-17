import { Express } from "express";
import { setupMongo } from "../app/setup";

import { buildRoutes } from "./routes";

export { buildApi };

async function buildApi(app: Express) {
  const routes = buildRoutes();

  app.use("/judifiltre/api", routes);

  await setupMongo();
}
