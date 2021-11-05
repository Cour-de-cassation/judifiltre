import { jurinetDecisionModule, jurinetDecisionType } from "judifiltre-core";

export { decision_123454 };

const decision_123454: jurinetDecisionType =
  jurinetDecisionModule.lib.generateJurinetDecision({
    _id: 123454,
    XML: "<TEXTE_ARRET>LE XML DE LA DECISION 123454</TEXTE_ARRET",
  });
