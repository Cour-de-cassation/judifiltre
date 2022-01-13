import { publicityInfoService } from "../../modules/publicityInfo";
import { jurinetDecisionService } from "../../modules/jurinetDecision";
import { juricaDecisionService } from "../../modules/juricaDecision";
import { runScript } from "./runScript";

async function initDb() {
  await publicityInfoService.clear();
  await juricaDecisionService.clear();
  await jurinetDecisionService.clear();
}

runScript(initDb);
