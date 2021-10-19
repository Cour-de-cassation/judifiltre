import { buildRepository } from "../repository";

export { publicityInfoService };

const publicityInfoService = {
  async findAll() {
    const publicityInfoRepository = buildRepository();

    return publicityInfoRepository.findAll();
  },
};
