import { mongo, dbConfigs } from "../../lib";
import { setupMongo } from "../setup";

export { runScript };

async function runScript(script: () => Promise<void>) {
  await setupMongo();

  await script();

  await Promise.all(dbConfigs.map(({ dbName }) => mongo[dbName].close()));

  process.exit(0);
}
