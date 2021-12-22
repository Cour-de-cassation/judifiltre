import { mongo, dbConfigs, buildMongo } from "../lib";

export { setupMongo };

async function setupMongo() {
  console.log(`Setting up Mongo...`);
  await Promise.all(
    dbConfigs.map(async ({ dbName, url }) => {
      console.log(`Loading ${dbName} database for url ${url}...`);
      mongo[dbName] = buildMongo();
      await mongo[dbName].initialize({ dbName, url});

      console.log(`${dbName} ready!`);
    })
  );
  console.log(`MongoDB ready!`);
}
