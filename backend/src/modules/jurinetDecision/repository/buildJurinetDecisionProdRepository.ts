import { jurinetDecisionType } from "judifiltre-core";
import { buildRepositoryBuilder } from "../../../repository";
import { customJurinetDecisionRepositoryType } from "./customJurinetDecisionRepositoryType";

export { buildJurinetDecisionProdRepository };

const buildJurinetDecisionProdRepository = buildRepositoryBuilder<
  jurinetDecisionType,
  customJurinetDecisionRepositoryType
>({
  dbName: process.env.JURINET_DBNAME || "jurinet",
  collectionName: "rawJurinet",
  buildCustomRepository: (collection) => ({
    findByDocumentId: async (documentId: jurinetDecisionType["_id"]) => {
      const item = await collection.findOne({ _id: documentId as any });

      return item || undefined;
    },
  }),
});
