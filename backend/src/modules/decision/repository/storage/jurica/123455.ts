import { juricaDecisionType, juricaDecisionModule } from "judifiltre-core";

export { decision_123455 };

const decision_123455: juricaDecisionType =
  juricaDecisionModule.lib.generateJuricaDecision({
    _id: 123455,
    JDEC_HTML_SOURCE: "<html>LE HTML DE LA DECISION 123455</html>",
  });
