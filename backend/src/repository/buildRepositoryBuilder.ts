import { idType } from "judifiltre-core";
import { mongo, mongoCollectionType } from "../lib";
import { repositoryType } from "./repositoryType";

export { buildRepositoryBuilder };

function buildRepositoryBuilder<T extends { _id: idType }, U>({
  collectionName,
  buildCustomRepository,
}: {
  collectionName: string;
  buildCustomRepository: (collection: mongoCollectionType<T>) => U;
}): () => repositoryType<T> & U {
  return () => {
    const db = mongo.getDb();
    const collection = db.collection<T>(collectionName);
    const customRepository = buildCustomRepository(collection);

    return {
      findAll,
      findById,
      insert,
      ...customRepository,
    };

    async function findAll() {
      return collection.find().toArray();
    }

    async function findById(id: idType) {
      const result = await collection.findOne({ _id: id });

      if (!result) {
        throw new Error(`No matching ${collectionName} for _id ${id}`);
      }

      return result;
    }

    async function insert(item: T) {
      const result = await collection.insertOne(item as any);
      return result.insertedId;
    }
  };
}
