import { idModule, publicityInfoType } from "judifiltre-core";
import { publicityInfoCreationDtoType } from "../types";

export { parsePublicityInfos };

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
