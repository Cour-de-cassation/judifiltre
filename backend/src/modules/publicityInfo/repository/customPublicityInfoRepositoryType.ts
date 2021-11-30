import { publicityInfoType } from "judifiltre-core";

export { customPublicityInfoRepositoryType };

type customPublicityInfoRepositoryType = {
  findAllFrozen: () => Promise<publicityInfoType[]>;
  updateAssessmentForOne: (
    _id: publicityInfoType["_id"],
    assessment: publicityInfoType["publicity"]["assessment"]
  ) => Promise<void>;
};
