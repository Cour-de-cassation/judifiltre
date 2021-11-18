import { jurinetDecisionType } from "judifiltre-core";
import { buildJurinetDecisionRepository } from "../repository";

export { jurinetDecisionService };

const jurinetDecisionService = {
  async clear() {
    const jurinetDecisionRepository = buildJurinetDecisionRepository();

    return jurinetDecisionRepository.clear();
  },

  async findByDocumentId(documentId: jurinetDecisionType["DOCUMENT_ID"]) {
    const jurinetDecisionRepository = buildJurinetDecisionRepository();

    return jurinetDecisionRepository.findByDocumentId(documentId);
  },

  async insertMany(jurinetDecisions: jurinetDecisionType[]) {
    const jurinetDecisionRepository = buildJurinetDecisionRepository();

    return Promise.all(jurinetDecisions.map(jurinetDecisionRepository.insert));
  },
};
