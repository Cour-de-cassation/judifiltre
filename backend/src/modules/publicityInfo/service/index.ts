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

  async findAllDecisionsToRelease() {
    const publicityInfoRepository = buildPublicityInfoRepository();

    const frozenPublicityInfos = await publicityInfoRepository.findAll();
    const releasableDecisions = [];
    for (const publicityInfo of frozenPublicityInfos) {
      if (publicityInfo.publicity.assessment === "public") {
        releasableDecisions.push({
          sourceId: publicityInfo.sourceId,
          sourceDb: publicityInfo.sourceDb,
        });
      }
    }
    return {
      releasableDecisions,
    };
  },

  async findAllDecisionsNotPublic() {
    const publicityInfoRepository = buildPublicityInfoRepository();

    const frozenPublicityInfos = await publicityInfoRepository.findAll();
    const notPublicDecisions = [];
    for (const publicityInfo of frozenPublicityInfos) {
      if (publicityInfo.publicity.assessment === "notPublic") {
        notPublicDecisions.push({
          sourceId: publicityInfo.sourceId,
          sourceDb: publicityInfo.sourceDb,
        });
      }
    }
    return {
      notPublicDecisions,
    };
  },

  async findById(_id: publicityInfoType["_id"]) {
    const publicityInfoRepository = buildPublicityInfoRepository();

    return publicityInfoRepository.findById(_id);
  },

  async deleteMany(
    publicityInfosDto: Array<{
      sourceDb: publicityInfoType["sourceDb"];
      sourceId: publicityInfoType["sourceId"];
    }>
  ) {
    const publicityInfoRepository = buildPublicityInfoRepository();

    let deletedCount = 0;
    let deletedErrors: string[] = [];

    await Promise.all(
      publicityInfosDto.map(async (publicityInfoDto) => {
        const hasBeenDeleted =
          await publicityInfoRepository.deleteBySourceIdAndSourceDb(
            publicityInfoDto
          );
        if (hasBeenDeleted) {
          deletedCount++;
        } else {
          const error = `Could not delete publicityInfo: {sourceId: ${publicityInfoDto.sourceId}, sourceDb: ${publicityInfoDto.sourceDb}}`;
          deletedErrors.push(error);
          console.warn(error);
        }
      })
    );
    return { deletedCount, deletedErrors };
  },

  async updateAssessmentForPublicityInfo(
    publicityInfoId: publicityInfoType["_id"],
    publicityAssessment: publicityInfoType["publicity"]["assessment"]
  ) {
    const publicityInfoRepository = buildPublicityInfoRepository();

    await publicityInfoRepository.updateAssessmentForOne(
      publicityInfoId,
      publicityAssessment
    );
  },

  async insertMany(publicityInfos: publicityInfoType[]) {
    const publicityInfoRepository = buildPublicityInfoRepository();

    return Promise.all(publicityInfos.map(publicityInfoRepository.insert));
  },
};
