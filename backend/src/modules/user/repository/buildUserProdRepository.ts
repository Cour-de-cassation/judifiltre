import { userModule, userType } from "judifiltre-core";
import { buildRepositoryBuilder } from "../../../repository";
import { customUserRepositoryType } from "./customUserRepositoryType";

export { buildUserProdRepository };

const buildUserProdRepository = buildRepositoryBuilder<
  userType,
  customUserRepositoryType
>({
  dbName: "judifiltredb",
  collectionName: "users",
  buildCustomRepository: (collection) => ({
    findByEmail: async (email) => {
      const formattedEmail = userModule.lib.formatEmail(email);
      const result = await collection.findOne({ email: formattedEmail });
      if (!result) {
        throw new Error(`No matching user for email ${email}`);
      }
      return result;
    },
  }),
});
