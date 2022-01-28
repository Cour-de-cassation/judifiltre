import { jurinetDecisionType } from "judifiltre-core";

export { customJurinetDecisionRepositoryType };

type customJurinetDecisionRepositoryType = {
  findByDocumentId: (
    documentId: jurinetDecisionType["_id"]
  ) => Promise<jurinetDecisionType | undefined>;
};
