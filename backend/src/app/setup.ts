import { mongo, dbConfigs, buildMongo } from "../lib";

export { setupMongo };

async function setupMongo() {
  console.log(`Setting up Mongo...`);
  await Promise.all(
    dbConfigs.map(async ({ dbName, port }) => {
      console.log(`Loading ${dbName} database...`);
      mongo[dbName] = buildMongo();
      await mongo[dbName].initialize({
        dbName,
        url: `mongodb://localhost:${port}`,
      });

      console.log(`${dbName} ready!`);
    })
  );
  console.log(`MongoDB ready!`);
}
