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
    const partiallyReleasableDecisions = [];
    const releasableDecisions = [];
    for (const publicityInfo of frozenPublicityInfos) {
      switch (publicityInfo.publicity.assessment?.kind) {
        case "public":
          releasableDecisions.push({
            sourceId: publicityInfo.sourceId,
            sourceDb: publicityInfo.sourceDb,
          });
          break;
        case "partiallyPublic":
          partiallyReleasableDecisions.push({
            sourceId: publicityInfo.sourceId,
            sourceDb: publicityInfo.sourceDb,
            text: publicityInfo.publicity.assessment.publicExtract,
          });
          break;
      }
    }
    return {
      partiallyReleasableDecisions,
      releasableDecisions,
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

    await Promise.all(
      publicityInfosDto.map(async (publicityInfoDto) => {
        const hasBeenDeleted =
          await publicityInfoRepository.deleteBySourceIdAndSourceDb(
            publicityInfoDto
          );
        if (!hasBeenDeleted) {
          console.warn(
            `Could not delete publicityInfo: {sourceId: ${publicityInfoDto.sourceId}, sourceDb: ${publicityInfoDto.sourceDb}}`
          );
        }
      })
    );
    return;
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
