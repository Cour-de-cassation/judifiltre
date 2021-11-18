import { publicityInfoType } from "judifiltre-core";
import { buildRepositoryBuilder } from "../../../repository";

export { buildPublicityInfoProdRepository };

const buildPublicityInfoProdRepository = buildRepositoryBuilder<
  publicityInfoType,
  {}
>({
  dbName: "judifiltredb",
  collectionName: "publicityInfos",
  buildCustomRepository: () => ({}),
});
