import { range } from "lodash";
import {
  publicityInfoModule,
  juricaDecisionModule,
  jurinetDecisionModule,
} from "judifiltre-core";
import { publicityInfoService } from "../../modules/publicityInfo";
import { jurinetDecisionService } from "../../modules/jurinetDecision";
import { juricaDecisionService } from "../../modules/juricaDecision";
import { userService } from "../../modules/user";
import { runScript } from "./runScript";

const PUBLICITY_INFOS_COUNT = 20;

async function initDbDev() {
  await userService.clear();
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
        _id: publicityInfo.sourceId as any,
      })
    );
  const jurinetDecisions = publicityInfos
    .filter((publicityInfo) => publicityInfo.sourceDb === "jurinet")
    .map((publicityInfo) =>
      jurinetDecisionModule.lib.generateJurinetDecision({
        _id: publicityInfo.sourceId as any,
      })
    );

  await publicityInfoService.insertMany(publicityInfos);
  await jurinetDecisionService.insertMany(jurinetDecisions);
  await juricaDecisionService.insertMany(juricaDecisions);
  await userService.signUp({
    email: "auditeur@justice.fr",
    name: "Auditeur",
    password: "Cassation01..3",
  });
}

runScript(initDbDev);
