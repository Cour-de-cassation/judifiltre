import { publicityInfoType } from "judifiltre-core";
import { buildPublicityInfoRepository } from "../repository";

export { publicityInfoService };

const publicityInfoService = {
  async clear() {
    const publicityInfoRepository = buildPublicityInfoRepository();

    return publicityInfoRepository.clear();
  },

  async findAll() {
    const publicityInfoRepository = buildPublicityInfoRepository();

    return publicityInfoRepository.findAll();
  },

  async findById(_id: publicityInfoType["_id"]) {
    const publicityInfoRepository = buildPublicityInfoRepository();

    return publicityInfoRepository.findById(_id);
  },

  async insertMany(publicityInfos: publicityInfoType[]) {
    const publicityInfoRepository = buildPublicityInfoRepository();

    return Promise.all(publicityInfos.map(publicityInfoRepository.insert));
  },
};
