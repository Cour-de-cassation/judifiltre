import { idModule, publicityInfoType } from "judifiltre-core";

export type { publicityInfoCreationDtoType };

export { parsePublicityInfos };

type publicityInfoCreationDtoType = {
  sourceId: publicityInfoType["sourceId"];
  sourceDb: publicityInfoType["sourceDb"];
  decisionDate: string;
  jurisdictionName: string;
  fieldCode: string;
  publicityClerkRequest: publicityInfoType["publicity"]["clerkRequest"];
};

function parsePublicityInfos(
  publicityInfosDto: Array<publicityInfoCreationDtoType>
): Array<publicityInfoType> {
  return publicityInfosDto.map((publicityInfoDto) => {
    const decisionDate = getValidDate(publicityInfoDto.decisionDate);
    if (!publicityInfoDto.sourceId) {
      throw new Error(
        `No sourceId provided for dto ${JSON.stringify(publicityInfoDto)}`
      );
    }

    if (
      !publicityInfoDto.sourceDb ||
      !["jurica", "jurinet"].includes(publicityInfoDto.sourceDb)
    ) {
      throw new Error(
        `Invalid sourceDb provided for dto ${JSON.stringify(publicityInfoDto)}`
      );
    }
    if (!publicityInfoDto.jurisdictionName) {
      throw new Error(
        `No jurisdictionName provided for dto ${JSON.stringify(
          publicityInfoDto
        )}`
      );
    }

    if (
      publicityInfoDto.publicityClerkRequest &&
      !["notPublic", "public", "unspecified"].includes(
        publicityInfoDto.publicityClerkRequest
      )
    ) {
    }
    return {
      _id: idModule.lib.buildId(),
      decisionDate: decisionDate?.getTime(),
      sourceDb: publicityInfoDto.sourceDb,
      sourceId: publicityInfoDto.sourceId,
      jurisdiction: publicityInfoDto.jurisdictionName,
      publicity: {
        clerkRequest: publicityInfoDto.publicityClerkRequest,
        assessment: undefined,
        isFrozen: false,
      },
      fieldCode: publicityInfoDto.fieldCode || "",
    };
  });
}

function getValidDate(date: string | undefined) {
  if (!date) {
    return undefined;
  }
  const convertedDate = new Date(date);
  if (isNaN(convertedDate.valueOf())) {
    return undefined;
  }
  return convertedDate;
}
