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
  }),
});
