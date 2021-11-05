import express from "express";
import { idModule } from "judifiltre-core";
import { publicityInfoService } from "../../modules/publicityInfo";
import { decisionService } from "../../modules/decision";

export { buildRoutes };

function buildRoutes() {
  const router = express.Router();
  router.get("/publicityInfos", async (request, response) => {
    const publicityInfos = await publicityInfoService.findAll();
    response.json(publicityInfos);
  });

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
    response.json(decision);
  });
  return router;
}
