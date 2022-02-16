import { juricaDecisionType } from "judifiltre-core";
import { buildRepositoryBuilder } from "../../../repository";
import { customJuricaDecisionRepositoryType } from "./customJuricaDecisionRepositoryType";

export { buildJuricaDecisionProdRepository };

const buildJuricaDecisionProdRepository = buildRepositoryBuilder<
  juricaDecisionType,
  customJuricaDecisionRepositoryType
>({
  dbName: "SDER",
  collectionName: "rawJurica",
  buildCustomRepository: (collection) => ({
    findByDocumentId: async (documentId: juricaDecisionType["_id"]) => {
      const item = await collection.findOne({ _id: documentId as any });

      return item || undefined;
    },
  }),
});
