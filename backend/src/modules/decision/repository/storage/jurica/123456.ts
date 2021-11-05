import { juricaDecisionType, juricaDecisionModule } from "judifiltre-core";

export { decision_123456 };

const decision_123456: juricaDecisionType =
  juricaDecisionModule.lib.generateJuricaDecision({
    _id: 123456,
    JDEC_HTML_SOURCE: "<html>LE HTML DE LA DECISION 123456</html>",
  });
