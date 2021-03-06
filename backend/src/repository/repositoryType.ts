import { idType } from "judifiltre-core";

export type { repositoryType };

type repositoryType<T extends { _id: any }> = {
  clear: () => Promise<void>;
  findAll: () => Promise<T[]>;
  findById: (id: idType) => Promise<T>;
  insert: (item: T) => Promise<idType>;
};
