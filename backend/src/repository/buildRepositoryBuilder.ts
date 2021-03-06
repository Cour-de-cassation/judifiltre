import { idType } from "judifiltre-core";
import { mongo, mongoCollectionType, dbConfigs } from "../lib";
import { repositoryType } from "./repositoryType";

export { buildRepositoryBuilder };

function buildRepositoryBuilder<T extends { _id: any }, U>({
  dbName,
  collectionName,
  buildCustomRepository,
}: {
  dbName: typeof dbConfigs[number]["dbName"];
  collectionName: string;
  buildCustomRepository: (collection: mongoCollectionType<T>) => U;
}): () => repositoryType<T> & U {
  return () => {
    const db = mongo[dbName].getDb();
    const collection = db.collection<T>(collectionName);
    const customRepository = buildCustomRepository(collection);

    return {
      clear,
      findAll,
      findById,
      insert,
      ...customRepository,
    };

    async function clear() {
      await collection.deleteMany({});
      return;
    }

    async function findAll() {
      return collection.find().toArray();
    }

    async function findById(id: idType) {
      const result = await collection.findOne({ _id: id });

      if (!result) {
        throw new Error(
          `No matching ${collectionName} for _id ${id} in ${dbName}`
        );
      }

      return result;
    }

    async function insert(item: T) {
      const result = await collection.insertOne(item as any);
      return result.insertedId;
    }
  };
}
