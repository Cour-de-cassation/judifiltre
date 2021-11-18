import { publicityInfoType } from "judifiltre-core";
import { juricaDecisionService } from "../../juricaDecision";
import { jurinetDecisionService } from "../../jurinetDecision";

export { decisionService };

const decisionService = {
  async findOne({
    sourceId,
    sourceDb,
  }: Pick<publicityInfoType, "sourceId" | "sourceDb">) {
    switch (sourceDb) {
      case "jurica":
        return juricaDecisionService.findByDocumentId(sourceId);
      case "jurinet":
        return jurinetDecisionService.findByDocumentId(sourceId);
    }
  },
};
