import { publicityInfoType } from "judifiltre-core";

export { customPublicityInfoRepositoryType };

type customPublicityInfoRepositoryType = {
  findAllFrozen: () => Promise<publicityInfoType[]>;
};
