import { publicityInfoType } from "judifiltre-core";
import { buildRepository } from "../repository";

export { publicityInfoService };

const publicityInfoService = {
  async findAll() {
    const publicityInfoRepository = buildRepository();

    return publicityInfoRepository.findAll();
  },

  async findById(_id: publicityInfoType["_id"]) {
    const publicityInfoRepository = buildRepository();

    return publicityInfoRepository.findById(_id);
  },
};
