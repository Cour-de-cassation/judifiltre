import { juricaDecisionType } from "judifiltre-core";
import { buildRepositoryBuilder } from "../../../repository";
import { customJuricaDecisionRepositoryType } from "./customJuricaDecisionRepositoryType";

export { buildJuricaDecisionProdRepository };

const buildJuricaDecisionProdRepository = buildRepositoryBuilder<
  juricaDecisionType,
  customJuricaDecisionRepositoryType
>({
  dbName: "jurica",
  collectionName: "DOCUMENT",
  buildCustomRepository: (collection) => ({
    findByDocumentId: async (documentId: juricaDecisionType["_id"]) => {
      const item = await collection.findOne({ _id: documentId as any });

      return item || undefined;
    },
  }),
});
