import { Express } from "express";
import { setupMongo } from "../app/setup";

import { buildRoutes } from "./routes";

export { buildApi };

async function buildApi(app: Express) {
  const routes = buildRoutes();

  app.use(process.env.ROOT_PATH ? `/${process.env.ROOT_PATH}` : "/judifiltre/api", routes);

  await setupMongo();
}
