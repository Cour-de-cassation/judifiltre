import { publicityInfoType } from "judifiltre-core";
import { decision_123454 } from "./storage/jurinet/123454";
import { decision_123455 } from "./storage/jurica/123455";
import { decision_123456 } from "./storage/jurica/123456";

export { buildDecisionTestRepository };

function buildDecisionTestRepository() {
  const jurinetDecisions = [decision_123454];
  const juricaDecisions = [decision_123455, decision_123456];

  return {
    findOne,
  };

  async function findOne({
    sourceId,
    sourceDb,
  }: Pick<publicityInfoType, "sourceId" | "sourceDb">) {
    let decisionText: string | undefined;
    switch (sourceDb) {
      case "jurica":
        const juricaDecision = juricaDecisions.find(
          (decision) => decision._id === sourceId
        );
        if (juricaDecision) {
          decisionText = juricaDecision.JDEC_HTML_SOURCE;
        }
        break;
      case "jurinet":
        const jurinetDecision = jurinetDecisions.find(
          (decision) => decision._id === sourceId
        );
        if (jurinetDecision) {
          decisionText = jurinetDecision.XML;
        }
        break;
    }
    return decisionText;
  }
}
