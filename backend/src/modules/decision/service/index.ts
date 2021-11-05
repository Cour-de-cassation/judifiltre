import { publicityInfoType } from "judifiltre-core";
import { buildRepository } from "../repository";

export { decisionService };

const decisionService = {
  async findOne({
    sourceId,
    sourceDb,
  }: Pick<publicityInfoType, "sourceId" | "sourceDb">) {
    const decisionRepository = buildRepository();

    return decisionRepository.findOne({ sourceId, sourceDb });
  },
};
