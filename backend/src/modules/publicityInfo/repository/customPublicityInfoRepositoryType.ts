import { publicityInfoType } from "judifiltre-core";

export { customPublicityInfoRepositoryType };

type customPublicityInfoRepositoryType = {
  findAllFrozen: () => Promise<publicityInfoType[]>;
  deleteBySourceIdAndSourceDb: ({
    sourceId,
    sourceDb,
  }: {
    sourceId: publicityInfoType["sourceId"];
    sourceDb: publicityInfoType["sourceDb"];
  }) => Promise<boolean>;
  updateAssessmentForOne: (
    _id: publicityInfoType["_id"],
    assessment: publicityInfoType["publicity"]["assessment"]
  ) => Promise<void>;
};
