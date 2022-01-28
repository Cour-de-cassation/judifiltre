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
    findByDocumentId: async (documentId: jurinetDecisionType["_id"]) => {
      const item = await collection.findOne({ _id: documentId as any });

      return item || undefined;
    },
  }),
});
