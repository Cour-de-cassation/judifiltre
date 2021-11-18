import { jurinetDecisionType } from "judifiltre-core";

export { customJurinetDecisionRepositoryType };

type customJurinetDecisionRepositoryType = {
  findByDocumentId: (
    documentId: jurinetDecisionType["DOCUMENT_ID"]
  ) => Promise<jurinetDecisionType | undefined>;
};
