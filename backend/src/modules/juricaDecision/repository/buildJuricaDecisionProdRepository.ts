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
    findByDocumentId: async (documentId: juricaDecisionType["DOCUMENT_ID"]) => {
      const item = await collection.findOne({ DOCUMENT_ID: documentId });

      return item || undefined;
    },
  }),
});
