import { publicityInfoType } from "judifiltre-core";

export type { publicityInfoCreationDtoType, publicityInfoDeletionDtoType };

type publicityInfoCreationDtoType = {
  sourceId: publicityInfoType["sourceId"];
  sourceDb: publicityInfoType["sourceDb"];
  decisionDate: string;
  jurisdictionName: string;
  fieldCode: string;
  publicityClerkRequest: publicityInfoType["publicity"]["clerkRequest"];
};

type publicityInfoDeletionDtoType = {
  sourceId: publicityInfoType["sourceId"];
  sourceDb: publicityInfoType["sourceDb"];
};
