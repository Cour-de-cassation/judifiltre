import yargs from "yargs";
import { mongo, dbConfigs } from "../../lib";
import { setupMongo } from "../setup";

export { runScript };

async function runScript(script: (argv: any) => Promise<void>, params: any) {
  await setupMongo();

  const argv = yargs.options(params).help().alias("help", "h").argv;

  await script(argv);

  await Promise.all(dbConfigs.map(({ dbName }) => mongo[dbName].close()));

  process.exit(0);
}
