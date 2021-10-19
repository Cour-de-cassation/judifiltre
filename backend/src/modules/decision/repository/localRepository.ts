import { decisionType, publicityInfoType } from "@judifiltre-core";
import { decision_123454 } from "./storage/jurinet/123454";
import { decision_123455 } from "./storage/jurica/123455";
import { decision_123456 } from "./storage/jurica/123456";

export { buildRepository };

function buildRepository() {
  const jurinetDecisions = [decision_123454];
  const juricaDecisions = [decision_123455, decision_123456];

  return {
    findOne,
  };

  async function findOne({
    _id,
    sourceDb,
  }: Pick<publicityInfoType, "_id" | "sourceDb">) {
    let decision: decisionType | undefined;
    switch (sourceDb) {
      case "jurica":
        const juricaDecision = juricaDecisions.find(
          (decision) => decision._id === _id
        );
        if (juricaDecision) {
          decision = {
            _id: juricaDecision._id,
            text: juricaDecision.JDEC_HTML_SOURCE,
          };
        }
        break;
      case "jurinet":
        const jurinetDecision = jurinetDecisions.find(
          (decision) => decision._id === _id
        );
        if (jurinetDecision) {
          decision = { _id: jurinetDecision._id, text: jurinetDecision.XML };
        }
        break;
    }
    return decision;
  }
}
