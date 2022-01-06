import { mongo, dbConfigs, buildMongo } from "../lib";

export { setupMongo, connected };

let connected = false;

async function setupMongo() {
  console.log(`Setting up Mongo...`);
  await Promise.all(
    dbConfigs.map(async ({ dbName, url }) => {
      const secUrl = url.replace(/\/\/(.*):.*@/, '//$1:***@');
      console.log(`Loading ${dbName} database for url ${secUrl}...`);
      mongo[dbName] = buildMongo();
      await mongo[dbName].initialize({ dbName, url});

      console.log(`${dbName} ready!`);
    })
  );
  connected = true;
  console.log(`MongoDB ready!`);
}
