import { juricaDecisionType } from "judifiltre-core";

export { customJuricaDecisionRepositoryType };

type customJuricaDecisionRepositoryType = {
  findByDocumentId: (
    documentId: juricaDecisionType["_id"]
  ) => Promise<juricaDecisionType | undefined>;
};
