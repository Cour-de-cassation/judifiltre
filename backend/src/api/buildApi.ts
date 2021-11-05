import { Express } from "express";
import { MongoClient } from "mongodb";

import { buildRoutes } from "./routes";

export { buildApi };

async function buildApi(app: Express) {
  const routes = buildRoutes();

  app.use("/judifiltre/api", routes);

  await setupMongo();
}

async function setupMongo() {
  console.log(`Loading the Mongo database...`);
  const client = new MongoClient(`mongodb://localhost:27017`);
  await client.connect();
  console.log(`MongoDB ready!`);
}
