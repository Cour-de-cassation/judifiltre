import { Express } from "express";
import { mongo } from "../lib";

import { buildRoutes } from "./routes";

export { buildApi };

async function buildApi(app: Express) {
  const routes = buildRoutes();

  app.use("/judifiltre/api", routes);

  await setupMongo();
}

async function setupMongo() {
  console.log(`Loading the Mongo database...`);
  await mongo.initialize({
    dbName: "judifiltreDb",
    url: "mongodb://localhost:27017",
  });
  console.log(`MongoDB ready!`);
}
