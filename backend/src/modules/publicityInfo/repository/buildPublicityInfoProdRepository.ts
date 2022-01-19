import { publicityInfoType } from "judifiltre-core";
import { buildRepositoryBuilder } from "../../../repository";
import { customPublicityInfoRepositoryType } from "./customPublicityInfoRepositoryType";

export { buildPublicityInfoProdRepository };

const buildPublicityInfoProdRepository = buildRepositoryBuilder<
  publicityInfoType,
  customPublicityInfoRepositoryType
>({
  dbName: "judifiltredb",
  collectionName: "publicityInfos",
  buildCustomRepository: (collection) => ({
    findAllFrozen: async () => {
      return collection.find({ "publicity.isFrozen": true }).toArray();
    },
    deleteBySourceIdAndSourceDb: async ({ sourceId, sourceDb }) => {
      const result = await collection.deleteOne({ sourceDb, sourceId });
      return result.deletedCount === 1;
    },
    updateAssessmentForOne: async (_id, assessment) => {
      await collection.updateOne(
        { _id },
        { $set: { "publicity.assessment": assessment } }
      );
    },
  }),
});
