import { MongoClient, Collection } from "mongodb";

export { buildMongo, mongo };

export type { mongoCollectionType };

type mongoCollectionType<T> = Collection<T>;

const mongo = buildMongo();

function buildMongo() {
  let client: MongoClient | undefined;
  let dbName: string | undefined;

  return {
    close,
    initialize,
    getDb,
  };

  async function close() {
    await client?.close();
  }

  async function initialize({
    dbName: newDbName,
    url,
  }: {
    dbName: string;
    url: string;
  }) {
    dbName = newDbName;

    client = await new MongoClient(url).connect();

    return client;
  }

  function getDb() {
    if (!client) {
      throw new Error(
        `Cannot get db because dbName ${dbName} is not initialized`
      );
    }
    return client.db(dbName);
  }
}
