import { jurinetDecisionType } from "judifiltre-core";
import { buildRepositoryBuilder } from "../../../repository";
import { customJurinetDecisionRepositoryType } from "./customJurinetDecisionRepositoryType";

export { buildJurinetDecisionProdRepository };

const buildJurinetDecisionProdRepository = buildRepositoryBuilder<
  jurinetDecisionType,
  customJurinetDecisionRepositoryType
>({
  dbName: "jurinet",
  collectionName: "DOCUMENT",
  buildCustomRepository: (collection) => ({
    findByDocumentId: async (
      documentId: jurinetDecisionType["DOCUMENT_ID"]
    ) => {
      const item = await collection.findOne({ DOCUMENT_ID: documentId });

      return item || undefined;
    },
  }),
});
