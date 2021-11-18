import { range } from "lodash";
import {
  publicityInfoModule,
  juricaDecisionModule,
  jurinetDecisionModule,
} from "judifiltre-core";
import { publicityInfoService } from "../../modules/publicityInfo";
import { jurinetDecisionService } from "../../modules/jurinetDecision";
import { juricaDecisionService } from "../../modules/juricaDecision";
import { runScript } from "./runScript";

const PUBLICITY_INFOS_COUNT = 20;

async function initDbDev() {
  await publicityInfoService.clear();
  await juricaDecisionService.clear();
  await jurinetDecisionService.clear();
  const publicityInfos = range(PUBLICITY_INFOS_COUNT).map(() =>
    publicityInfoModule.lib.generatePublicityInfo({})
  );
  const juricaDecisions = publicityInfos
    .filter((publicityInfo) => publicityInfo.sourceDb === "jurica")
    .map((publicityInfo) =>
      juricaDecisionModule.lib.generateJuricaDecision({
        DOCUMENT_ID: publicityInfo.sourceId,
      })
    );
  const jurinetDecisions = publicityInfos
    .filter((publicityInfo) => publicityInfo.sourceDb === "jurinet")
    .map((publicityInfo) =>
      jurinetDecisionModule.lib.generateJurinetDecision({
        DOCUMENT_ID: publicityInfo.sourceId,
      })
    );
  await publicityInfoService.insertMany(publicityInfos);
  await jurinetDecisionService.insertMany(jurinetDecisions);
  await juricaDecisionService.insertMany(juricaDecisions);
}

runScript(initDbDev);
