import { publicityInfoService } from "../../modules/publicityInfo";
import { jurinetDecisionService } from "../../modules/jurinetDecision";
import { juricaDecisionService } from "../../modules/juricaDecision";
import { runScript } from "./runScript";

async function initDb() {
  // shouldn't be runed after first run, as clears all
  await publicityInfoService.clear();
}

runScript(initDb, {});
