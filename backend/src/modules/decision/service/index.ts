import { jurinetUtils, juricaUtils, jurinetLib } from "sder";
import { publicityInfoType } from "judifiltre-core";
import { juricaDecisionService } from "../../juricaDecision";
import { jurinetDecisionService } from "../../jurinetDecision";

export { decisionService };

const decisionService = {
  async findOne({
    sourceId,
    sourceDb,
  }: Pick<publicityInfoType, "sourceId" | "sourceDb">): Promise<
    string | undefined
  > {
    switch (sourceDb) {
      case "jurica":
        const juricaDecision = await juricaDecisionService.findByDocumentId(
          sourceId
        );
        return (
          juricaDecision &&
          juricaUtils.cleanHTML(juricaDecision.JDEC_HTML_SOURCE)
        );
      case "jurinet":
        const jurinetDecision = await jurinetDecisionService.findByDocumentId(
          sourceId
        );
        return (
          jurinetDecision?.XML &&
          jurinetUtils.xmlToJson(jurinetLib.cleanText(jurinetDecision.XML), {})[
            "TEXTE_ARRET"
          ]
        );
    }
  },
};
