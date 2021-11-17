import { range } from "lodash";
import { publicityInfoModule } from "judifiltre-core";
import { publicityInfoService } from "../../modules/publicityInfo";
import { runScript } from "./runScript";

const PUBLICITY_INFOS_COUNT = 20;

async function initDbDev() {
  await publicityInfoService.clear();
  const publicityInfos = range(PUBLICITY_INFOS_COUNT).map(() =>
    publicityInfoModule.lib.generatePublicityInfo({})
  );
  await publicityInfoService.insertMany(publicityInfos);

  return;
}

runScript(initDbDev);
