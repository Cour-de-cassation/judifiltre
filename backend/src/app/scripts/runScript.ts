import { mongo } from "../../lib";
import { setupMongo } from "../setup";

export { runScript };

async function runScript(script: () => Promise<void>) {
  await setupMongo();

  await script();

  await mongo.close();

  process.exit(0);
}
