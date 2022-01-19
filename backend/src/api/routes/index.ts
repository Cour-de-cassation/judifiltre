import express from "express";
import { idModule } from "judifiltre-core";
import { publicityInfoService } from "../../modules/publicityInfo";
import { decisionService } from "../../modules/decision";
import { connected } from "../../app/setup";

import { parsePublicityInfos } from "./lib/parsePublicityInfos";
import {
  publicityInfoDeletionDtoType,
  publicityInfoCreationDtoType,
} from "./types";

export { buildRoutes };

function buildRoutes() {
  const router = express.Router();
  router.get("/publicityInfos", async (request, response) => {
    const publicityInfos = await publicityInfoService.findAll();
    response.json(publicityInfos);
  });

  router.put("/publicityInfos/:publicityInfoId", async (request, response) => {
    const { publicityInfoId } = request.params;
    const { publicityAssessment } = request.body;
    await publicityInfoService.updateAssessmentForPublicityInfo(
      idModule.lib.buildId(publicityInfoId),
      publicityAssessment
    );
    response.sendStatus(200);
  });

  router.get("/decisions-to-release", async (request, response) => {
    const publicityInfos =
      await publicityInfoService.findAllDecisionsToRelease();
    response.json(publicityInfos);
  });

  router.delete<"publicityInfos", any, Array<publicityInfoDeletionDtoType>>(
    "/publicityInfos",
    async (request, response) => {
      const publicityInfosDto = request.body;
      await publicityInfoService.deleteMany(publicityInfosDto);
      response.status(204).send(`publicityInfos deleted`);
    }
  );

  router.post<"publicityInfos", any, Array<publicityInfoCreationDtoType>>(
    "/publicityInfos",
    async (request, response) => {
      const parsedPublicityInfos = parsePublicityInfos(request.body);
      await publicityInfoService.insertMany(parsedPublicityInfos);
      response
        .status(201)
        .send(`${parsedPublicityInfos.length} publicityInfos created`);
    }
  );

  router.get("/decision", async (request, response) => {
    const params = request.query as { publicityInfoId: string };
    if (!params.publicityInfoId) {
      response.sendStatus(400);
      return;
    }
    const publicityInfo = await publicityInfoService.findById(
      idModule.lib.buildId(params.publicityInfoId)
    );
    if (!publicityInfo) {
      response.sendStatus(404);
      return;
    }
    const decision = await decisionService.findOne({
      sourceDb: publicityInfo.sourceDb,
      sourceId: publicityInfo.sourceId,
    });
    if (!decision) {
      response.sendStatus(404);
      return;
    }
    response.json(decision);
  });

  router.get("/health", async (request, response) => {
    return response.status(200).json({
      status: connected ? "disponible" : "indisponible",
    });
  });

  return router;
}
