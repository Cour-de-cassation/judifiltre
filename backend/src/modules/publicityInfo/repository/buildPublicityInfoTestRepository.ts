import { idModule, idType } from "judifiltre-core";
import { publicityInfo_123454 } from "./storage/123454";
import { publicityInfo_123455 } from "./storage/123455";
import { publicityInfo_123456 } from "./storage/123456";

export { buildPublicityInfoTestRepository };

function buildPublicityInfoTestRepository() {
  const collection = [
    publicityInfo_123454,
    publicityInfo_123455,
    publicityInfo_123456,
  ];
  return {
    findAll,
    findById,
  };

  async function findAll() {
    return collection;
  }

  async function findById(_id: idType) {
    const publicityInfo = collection.find((item) =>
      idModule.lib.equalId(item._id, _id)
    );

    if (!publicityInfo) {
      return undefined;
    }

    return publicityInfo;
  }
}
