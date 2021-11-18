import { mongo, DB_NAMES, buildMongo } from "../lib";

export { setupMongo };

async function setupMongo() {
  console.log(`Setting up Mongo...`);
  await Promise.all(
    DB_NAMES.map(async (dbName) => {
      console.log(`Loading ${dbName} database...`);
      mongo[dbName] = buildMongo();
      await mongo[dbName].initialize({
        dbName,
        url: "mongodb://localhost:27017",
      });

      console.log(`${dbName} ready!`);
    })
  );
  console.log(`MongoDB ready!`);
}
