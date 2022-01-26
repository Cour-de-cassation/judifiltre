import { userType } from "judifiltre-core";

export { customUserRepositoryType };

type customUserRepositoryType = {
  findByEmail: (email: userType["email"]) => Promise<userType>;
};
