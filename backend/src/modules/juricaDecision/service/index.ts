import { juricaDecisionType } from "judifiltre-core";
import { buildJuricaDecisionRepository } from "../repository";

export { juricaDecisionService };

const juricaDecisionService = {
  async clear() {
    const juricaDecisionRepository = buildJuricaDecisionRepository();

    return juricaDecisionRepository.clear();
  },

  async findByDocumentId(documentId: juricaDecisionType["_id"]) {
    const juricaDecisionRepository = buildJuricaDecisionRepository();

    return juricaDecisionRepository.findByDocumentId(documentId);
  },

  async insertMany(juricaDecisions: juricaDecisionType[]) {
    const juricaDecisionRepository = buildJuricaDecisionRepository();

    return Promise.all(juricaDecisions.map(juricaDecisionRepository.insert));
  },
};
