import { idModule, idType, userModule, userType } from "judifiltre-core";
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
    remove: async (id) => {
      const builtId = idModule.lib.buildId(id);
      const result = collection.deleteOne({ _id: builtId });
      if (!result) {
        throw new Error(`No item for this collection`);
      }
      return;
    },
    listAll: async () => {
      const result = collection.find().toArray();
      if (!result) {
        throw new Error(`No item for this collection`);
      }
      return result;
    },
  }),
});
