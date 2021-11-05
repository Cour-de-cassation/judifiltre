import { publicityInfoType } from "judifiltre-core";
import { buildRepositoryBuilder } from "../../../repository";

export { buildPublicityInfoProdRepository };

const buildPublicityInfoProdRepository = buildRepositoryBuilder<
  publicityInfoType,
  {}
>({
  collectionName: "publicityInfos",
  buildCustomRepository: () => ({}),
});
