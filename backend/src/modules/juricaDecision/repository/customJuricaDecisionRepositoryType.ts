import { juricaDecisionType } from "judifiltre-core";

export { customJuricaDecisionRepositoryType };

type customJuricaDecisionRepositoryType = {
  findByDocumentId: (
    documentId: juricaDecisionType["DOCUMENT_ID"]
  ) => Promise<juricaDecisionType | undefined>;
};
