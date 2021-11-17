import { idModule, publicityInfoType } from "judifiltre-core";

export { publicityInfo_123456 };

const publicityInfo_123456: publicityInfoType = {
  _id: idModule.lib.buildId(),
  sourceId: 123456,
  sourceDb: "jurica",
  releasabilityStatus: "undetermined",
  jurisdiction: "CA",
  codeField: "45B",
};
