import { publicityInfoService } from "../../modules/publicityInfo";
import { runScript } from "./runScript";

async function flushPublicityInfo() {
  await publicityInfoService.clear();
}

runScript(flushPublicityInfo, {});
