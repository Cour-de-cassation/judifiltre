import { userType } from "judifiltre-core";

export { customUserRepositoryType };

type customUserRepositoryType = {
  findByEmail: (email: userType["email"]) => Promise<userType>;
  remove: (id: userType["_id"]) => Promise<number>;
  listAll: () => Promise<userType[]>;
};
