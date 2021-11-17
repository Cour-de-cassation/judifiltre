import { mongo } from "../lib";

export { setupMongo };

async function setupMongo() {
  console.log(`Loading the Mongo database...`);
  await mongo.initialize({
    dbName: "judifiltreDb",
    url: "mongodb://localhost:27017",
  });
  console.log(`MongoDB ready!`);
}
