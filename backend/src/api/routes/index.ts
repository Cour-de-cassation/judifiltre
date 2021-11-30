import express from "express";
import { idModule } from "judifiltre-core";
import { publicityInfoService } from "../../modules/publicityInfo";
import { decisionService } from "../../modules/decision";
import {
  parsePublicityInfos,
  publicityInfoCreationDtoType,
} from "./lib/parsePublicityInfos";

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
  });

  router.get("/decisions-to-release", async (request, response) => {
    const publicityInfos =
      await publicityInfoService.findAllDecisionsToRelease();
    response.json(publicityInfos);
  });

  router.post<"publicityInfos", any, Array<publicityInfoCreationDtoType>>(
    "/publicityInfos",
    async (request, response) => {
      const parsedPublicityInfos = parsePublicityInfos(request.body);
      await publicityInfoService.insertMany(parsedPublicityInfos);
      response.sendStatus(201);
      response.send(`${parsedPublicityInfos.length} publicityInfos created`);
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
  return router;
}
