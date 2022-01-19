import express from "express";
import { idModule, publicityInfoType } from "judifiltre-core";
import { publicityInfoService } from "../../modules/publicityInfo";
import { decisionService } from "../../modules/decision";
import { connected } from "../../app/setup";

import { parsePublicityInfos } from "./lib/parsePublicityInfos";
import { buildController } from "./lib/buildController";
import {
  publicityInfoDeletionDtoType,
  publicityInfoCreationDtoType,
} from "./types";

export { buildRoutes };

function buildRoutes() {
  const router = express.Router();

  router.get(
    "/publicityInfos",
    buildController(async () => {
      const publicityInfos = await publicityInfoService.findAll();
      return {
        kind: "success",
        response: publicityInfos,
      };
    })
  );

  router.put<
    "publicityInfos",
    any,
    { publicityAssessment: publicityInfoType["publicity"]["assessment"] }
  >(
    "/publicityInfos/:publicityInfoId",
    buildController(
      async (params: {
        publicityInfoId: string;
        publicityAssessment: publicityInfoType["publicity"]["assessment"];
      }) => {
        await publicityInfoService.updateAssessmentForPublicityInfo(
          idModule.lib.buildId(params.publicityInfoId),
          params.publicityAssessment
        );
        return { kind: "success" };
      },
      (request) => ({
        publicityInfoId: request.params.publicityInfoId,
        publicityAssessment: request.body.publicityInfoAssessment,
      })
    )
  );

  router.get(
    "/decisions-to-release",
    buildController(async () => {
      const publicityInfos =
        await publicityInfoService.findAllDecisionsToRelease();
      return { kind: "success", response: publicityInfos };
    })
  );

  router.delete<"publicityInfos", any, Array<publicityInfoDeletionDtoType>>(
    "/publicityInfos",
    buildController(
      async (params: {
        publicityInfosDto: Array<publicityInfoDeletionDtoType>;
      }) => {
        await publicityInfoService.deleteMany(params.publicityInfosDto);
        return {
          kind: "success",
          response: "publicityInfos deleted",
          statusCode: 204,
        };
      },
      (request) => ({
        publicityInfosDto: request.body,
      })
    )
  );

  router.post<"publicityInfos", any, Array<publicityInfoCreationDtoType>>(
    "/publicityInfos",
    buildController(
      async (params: {
        parsedPublicityInfos: Array<publicityInfoCreationDtoType>;
      }) => {
        const parsedPublicityInfos = parsePublicityInfos(
          params.parsedPublicityInfos
        );
        await publicityInfoService.insertMany(parsedPublicityInfos);
        return {
          kind: "success",
          statusCode: 201,
          response: `${parsedPublicityInfos.length} publicityInfos created`,
        };
      },
      (request) => ({
        parsedPublicityInfos: request.body,
      })
    )
  );

  router.get(
    "/decision/",
    buildController(
      async (params: { publicityInfoId: string }) => {
        if (!params.publicityInfoId) {
          return {
            kind: "error",
            statusCode: 400,
            message: `Missing publicityInfoId argument`,
          };
        }
        const publicityInfo = await publicityInfoService.findById(
          idModule.lib.buildId(params.publicityInfoId)
        );
        if (!publicityInfo) {
          return {
            kind: "error",
            statusCode: 404,
            message: `publicityInfo not found for id ${params.publicityInfoId}`,
          };
        }
        const decision = await decisionService.findOne({
          sourceDb: publicityInfo.sourceDb,
          sourceId: publicityInfo.sourceId,
        });
        if (!decision) {
          return {
            kind: "error",
            statusCode: 404,
            message: `decision not found for sourceId ${publicityInfo.sourceId} - sourceDb ${publicityInfo.sourceDb}`,
          };
        }
        return { kind: "success", response: decision };
      },
      (request) => ({
        publicityInfoId: request.query.publicityInfoId as string,
      })
    )
  );

  router.get(
    "/health",
    buildController(async () => {
      return {
        kind: "success",
        response: {
          status: connected ? "disponible" : "indisponible",
        },
      };
    })
  );

  return router;
}
