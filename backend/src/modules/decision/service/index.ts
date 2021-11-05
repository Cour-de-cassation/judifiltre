import { publicityInfoType } from "judifiltre-core";
import { buildRepository } from "../repository";

export { decisionService };

const decisionService = {
  async findOne({
    _id,
    sourceDb,
  }: Pick<publicityInfoType, "_id" | "sourceDb">) {
    const decisionRepository = buildRepository();

    return decisionRepository.findOne({ _id, sourceDb });
  },
};
